<?php

namespace ParkHolidays\PageBuilder\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use ParkHolidays\PageBuilder\Models\FieldName;
use ParkHolidays\PageBuilder\Models\Block;
use ParkHolidays\PageBuilder\Models\Template;
use App\Models\Pages\Page;
use App\Models\Media;

class PageBuilderController extends Controller
{	
	private $ph_assets = [];

	/**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
		$assets = [
			'/css/parkholidays/critical.css',
			'/css/parkholidays/non_critical.css',
			'/css/phast/dynamicblocks.css',
		];

		$fn = public_path() . config('pagebuilder.asset_path') .'mix-manifest.json';
		$curl = curl_init($fn);

		if($curl) {
			$mix_manifest = json_decode(file_get_contents($fn));

			foreach($assets as $asset) {
				if(isset($mix_manifest->{$asset})) {
					array_push($this->ph_assets, config('pagebuilder.asset_path') . substr($mix_manifest->{$asset}, 1));
				}
			}
		}
	}

	public function editBlock($id)
	{
		$record = $this->getRecord('block', $id);
		$viewModel = $this->getViewModel((object)['id' => $id, 'name' => ($record ? $record->label : ''), 'type' => 'block']);
		
		return $record ? view('pagebuilder::editor', ['viewModel' => $viewModel]) : abort(404);
	}

	public function editPage($id)
	{		
		$record = $this->getRecord('page', $id);
		$viewModel = $this->getViewModel((object)['id' => $id, 'name' => ($record ? $record->name : ''), 'type' => 'page']);

		return $record ? $record->pagebuilder_disabled ? redirect('/') : view('pagebuilder::editor', ['viewModel' => $viewModel]) : abort(404);
	}


	/*
	*	Ajax 
	*/

	/** LOAD **/
	public function load($type, $id, Request $request) 
	{
		$record = $this->getRecord($type, $id);

		if($record) {
			$data = collect([
				'gjs-assets' => [],
				'gjs-css' => base64_decode($record->css_base64),
				'gjs-html' => preg_replace("/\s+|\n+|\r/", ' ', base64_decode($record->html_base64)),
				'gjs-components' => $record->gjs_components
			]);
		}
				
		return isset($data) ? $data->toJson() : [];
	}

	/** STORE **/
	public function store($type, $id, Request $request) 
	{
		try {
			$record = $this->getRecord($type, $id);
			$html = $request->get('gjs-html');

			if($type == 'block') {				
				$json = json_decode($request->get('gjs-components'), true);
				
				foreach($json as $object) {
					$html = $this->setGrapesAttributes($object, $html);
				}
			} else {
				$html = $this->setHiddenTypeAttributes($html);
			}
			
			$html = preg_replace("/@\n@/","", $this->setInlineStyles($request->get('gjs-css'), $html)); 
			
			$record->html_base64 = $html ? base64_encode($html) : null;
			$record->css_base64 = base64_encode(preg_replace("/([*{](.*?)[}][body{](.*?)[}])/", "", $request->get('gjs-css'))) ?? null;
			$record->gjs_components = $request->get('gjs-components');
			$record->save();

			$message = ucfirst($type) . " '" . $request->get('name') . "' (id" . $id . ") saved successfully.";
			return collect(['status' => 200, 'message' => $message])->toJson();
		}
		catch (exception $ex) {
			return collect(['status' => 100, 'message' => $ex->getMessage()])->toJson();
		}
	}

	/** Get Trait Options **/
	public function getTraitOptions(Request $request) 
	{
		$connection = $request->get('connection');
		$table = $request->get('table');
		$text_field = $request->get('text_field');
		$value_field = $request->get('value_field');

		if($connection) {
			$records = \DB::connection($connection)->table($table);
		} else {
			$records = \DB::table($table);
		}
		
		$records->select($text_field . ' as name', $value_field . ' as value')
				->whereNotNull($value_field)
				->orderBy('name')
				->get();

		$data = collect([]);

		if($records) {
			$records->each(function($item, $key) use($data) { 
				$data->push((object) [
					'name' => $item->name,
					'value' => (string)$item->value
				]);
			});
		}

		return $data->toJson();
	}

	/** Get Field Names **/
	public function getFieldNames(Request $request) 
	{
		$excludeTypes = $request->get('exclude_types');
		$includeTypes = $request->get('include_types');

		$fieldNames = FieldName::select('name', 'label', 'type', 'values', 'copies')->orderBy('name');
		
		if($excludeTypes) { $fieldNames->whereNotIn('type', $excludeTypes); }
		if($includeTypes) { $fieldNames->whereIn('type', $includeTypes); }

		$fieldNames->get();

		$data = collect([]);

		if($fieldNames) {
			$fieldNames->each(function($item, $key) use($data) { 
				$data->push((object) [
					'name' => $item->label,
					'value' => $item->name,
					'type' => $item->type,
					'values' => $item->values,
					'copies' => $item->copies
				]);
			});
		}

		return $data->toJson();
	}

	/** Get Blocks **/
	public function getBlocks() 
	{
		$blocks = Block::orderBy('block_group_id')->orderBy('sort_order')->get();
		$data = collect([]);

		if($blocks) {
			$blocks->each(function($item, $key) use($data) { 
				if($item->html_base64 && trim($item->html_base64) != '') {
					$html = ($item->is_dynamic) ? preg_replace("/@\n@/","", $this->setPayloadProperties($item)) : base64_decode($item->html_base64);
				
					$data->push((object) [
						'category' => $item->group->name,
						'block_id' => $item->block_id,
						'label' => $item->label,
						'content' => $html,
						'attributes' => json_encode(['class' => $item->icon_class])
					]);
				}
			});
		}

		return $data->toJson();
	}

	/** Get Assets **/
	public function getAssets(Request $request) 
	{
		$perPage = json_decode(config('pagebuilder.items_per_page'));
		$assets = \DB::table('media')->leftJoin('media_lookups', 'media_lookups.media_id', '=', 'media.id')
						->where(function ($query) {
							$query->where('path', 'like', '%.jpg')
								->orWhere('path', 'like', '%.png');
						});

		if($request->types) {
			$assets = $assets->where(function ($query) use($request) {
                $query->whereIn('media_lookup_type', $request->types); 
			});
		} 

		if($request->tags) {
			$assets = $assets->where(function ($query) use($request) {
                $query->whereIn('media_lookup_tag', $request->tags); 
			});
		} 

		if($request->parks) {
			$assets = $assets->where(function ($query) use($request) {
                $query->where('media_lookup_type', 'App\Models\Parks\Park')->whereIn('media_lookup_id', $request->parks); 
			});
		} 
		
		if($request->criteria) { 
			$assets = $assets->where(function ($query) use($request) {
                $query->where('keywords', 'like', '%'.$request->criteria.'%')
					->orWhere('description', 'like', '%'.$request->criteria.'%')
					->orWhere('alternate_text', 'like', '%'.$request->criteria.'%'); 
			});
			
		}
		
		$pageCount = ceil($assets->count()/$perPage);
		$skip = ($request->page-1) * $perPage;
		$assets = $assets->select('path', 'alternate_text')->skip($skip)->take($perPage)->get();

		$assets->map(function($image) {
			$image->path = config('pagebuilder.media_path'). $image->path;
			return $image;
		});

		return collect([
			'types' => $request->types,
			'tags' => $request->tags,
			'parks' => $request->parks,
			'criteria' => $request->criteria, 
			'page_count' => $pageCount, 
			'assets' => $assets
		])->toJson();
	}

	/*
	*	Private Methods
	*/
	
	// Get The View Model
	function getViewModel($record) {
		$viewModel = new \StdClass;
		
		$viewModel->url_store = config('pagebuilder.url_prefix') . '/ajax/store/'. $record->type .'/'. $record->id;
		$viewModel->url_load = config('pagebuilder.url_prefix') . '/ajax/load/'. $record->type .'/'. $record->id;
		$viewModel->record = $record;
		$viewModel->isSuperUser = session('superUser');
		$viewModel->ph_assets = $this->ph_assets;

		return $viewModel;
	}

	// Get The Record
	function getRecord($type, $id) 
	{
		$record = null;
		
		switch($type) {
			case 'block': 
				$record = Block::find((int)$id);
				break;
			case 'page': 
				$record = Page::find((int)$id);
				break;
		}

		return $record;
	}

	// Set properties for Dynamic Blocks 
	function setPayloadProperties($item) {
		$html = base64_decode($item->html_base64);

		$dom = new \DOMDocument();
		@$dom->loadHTML($html, LIBXML_HTML_NODEFDTD);//, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$xpath = new \DOMXPath($dom);

		$element = $xpath->query("//dynablock");

		if($element && $element->item(0)) {
			if(!$item->payload_properties) { $item->payload_properties = '[]'; }
			$element->item(0)->setAttribute('properties', base64_encode($item->payload_properties));
		}

		$html = preg_replace('/\<(\/)?(html|body)>/','', $dom->saveHTML());
		return $html;
	}

	// Set Hidden Input Types
	function setHiddenTypeAttributes($html) {
		$html1 = $html;
		$dom = new \DOMDocument();
		$html = mb_convert_encoding($html, 'HTML-ENTITIES', "UTF-8"); 
		$html2 = $html;
		$dom->loadHTML($html, LIBXML_HTML_NODEFDTD);//, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$xpath = new \DOMXPath($dom);

		$elements = $xpath->query("//input[@data-hidden=\"hidden\"]");

		if($elements->length > 0) 
		foreach($elements as $element) {
			$element->setAttribute('type','hidden');
			$element->removeAttribute('readonly');
			$element->removeAttribute('data-hidden');

			if($element->hasAttribute('data-draggable')) { 
				$draggable = $element->getAttribute('data-draggable');
				$element->setAttribute('data-gjs-draggable', $draggable);
				$element->removeAttribute('data-draggable');
			}
			
			if($element->hasAttribute('data-copyable')) { 
				$copyable = $element->getAttribute('data-copyable');
				$element->setAttribute('data-gjs-copyable', $copyable);
				$element->removeAttribute('data-copyable');
			}

			if($element->hasAttribute('data-removable')) { 
				$removable = $element->getAttribute('data-removable');
				$element->setAttribute('data-gjs-removable', $removable);
				$element->removeAttribute('data-removable');
			}
		}
		$html3 = $html;
		$html4 = $dom;
		$html5 = $dom->saveHTML();
		$html6 = preg_replace('/\<(\/)?(html|body)>/','', $dom->saveHTML());
		dd($html1, $html2, $html3, $html4, $html5, $html6);
		return preg_replace('/\<(\/)?(html|body)>/','', $dom->saveHTML());
	}

	// Convert CSS to inline styles
	function setInlineStyles($css, $html) {
		$dom = new \DOMDocument();
		$html = mb_convert_encoding($html, 'HTML-ENTITIES', "UTF-8"); 
		@$dom->loadHTML($html, LIBXML_HTML_NODEFDTD);//, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$xpath = new \DOMXPath($dom);

		preg_match_all ('/(.(.*?)|#c\d{3,})\s?({(.*?)})/', $css, $styles, PREG_PATTERN_ORDER);

		$prevSelector = null;
		$i = 0;
		
		foreach($styles[1] as $selector) {
			$element = null;
			
			if($selector != $prevSelector) {
				switch($selector[0]) {
					case '#':
						$id = explode('.', substr($selector, 1))[0];
						$element = $xpath->query("//*[@id = '". $id ."']");
						break;
					case '.':
						$classStr = str_replace('.', ' ', substr($selector, 1));
						$element = $xpath->query("//*[contains(@class, '". $classStr ."')]");
						break;
				}

				if($element && $element->item(0)) {
					$element->item(0)->setAttribute('style', $styles[4][$i]);
				}
			}

			$prevSelector = $selector;
			$i++;
		}

		$html = $this->removeGrapesJsId(preg_replace('/\<(\/)?(html|body)>/','', $dom->saveHTML()));
		return $html;
	}

	// Remove GrapesJS Id / Classes
	function removeGrapesJsId($html) {
		$dom = new \DOMDocument();
		$html = mb_convert_encoding($html, 'HTML-ENTITIES', "UTF-8"); 
		@$dom->loadHTML($html, LIBXML_HTML_NODEFDTD);//, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$xpath = new \DOMXPath($dom);

		preg_match_all ('/(c\d{3,})/', $html, $items, PREG_PATTERN_ORDER);

		foreach($items[0] as $item) { 
			$element = $xpath->query("//*[@id = '". $item ."']");
			if($element && $element->item(0)) {
				$element->item(0)->removeAttribute('id');
			}

			$element = $xpath->query("//*[contains(@class, '". $item ."')]");
			if($element && $element->item(0)){
				$class = $element->item(0)->getAttribute('class');
				$class = preg_replace('/(.c\d{2,4})/', '', $class);
				$element->item(0)->setAttribute('class', trim($class));
			}
		}

		$html = preg_replace('/\<(\/)?(html|body)>/','', trim($dom->saveHTML()));
		return $html;
	}

	// Add GJS properties as attributes
	function setGrapesAttributes($json, $html) {
		$dom = new \DOMDocument();
		$html = mb_convert_encoding($html, 'HTML-ENTITIES', "UTF-8"); 
		@$dom->loadHTML($html, LIBXML_HTML_NODEFDTD);//, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$xpath = new \DOMXPath($dom);

		if(isset($json['attributes']['id'])) {
			$element = $xpath->query("//*[@id = '". $json['attributes']['id'] ."']");

			if($element) {
				if(isset($json['custom-name'])) {
					$element->item(0)->setAttribute('data-gjs-custom-name', $json['custom-name']);
				}

				$element->item(0)->setAttribute('data-gjs-stylable', $this->getAttributeValueAsString($json['stylable']));
				$element->item(0)->setAttribute('data-gjs-draggable', $this->getAttributeValueAsString($json['draggable']));
				$element->item(0)->setAttribute('data-gjs-droppable', $this->getAttributeValueAsString($json['droppable']));
				$element->item(0)->setAttribute('data-gjs-copyable', $this->getAttributeValueAsString($json['copyable']));
				$element->item(0)->setAttribute('data-gjs-resizable', $this->getAttributeValueAsString($json['resizable']));
				$element->item(0)->setAttribute('data-gjs-editable', $this->getAttributeValueAsString($json['editable']));
				$element->item(0)->setAttribute('data-gjs-removable', $this->getAttributeValueAsString($json['removable']));
			}
		}
		
		$html = preg_replace('/\<(\/)?(html|body)>/','', $dom->saveHTML());
		foreach($json['components'] as $component) {
			$html = $this->setGrapesAttributes($component, $html);
		}

		return $html;
	}

	function getAttributeValueAsString($value) {
		$isArray = is_array($value);

		if ($isArray) {
			$value = implode(',', $value);
			if(!$value) { $value = 'false'; }
		} elseif ($value == true) {
			$value = 'true';
		} elseif ($value == false) {
			$value = 'false';
		}

		return $value;
	}
}
