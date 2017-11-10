<?php

namespace ParkHolidays\PageBuilder\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use ParkHolidays\PageBuilder\Models\Block;
use ParkHolidays\PageBuilder\Models\Template;
use App\Models\Pages\Page;
use App\Models\Media;

class PageBuilderController extends Controller
{
	public function editBlock($type, $id)
	{
		$record = $this->getRecord($type, $id);
		$viewModel = $this->getViewModel((object)['id' => $id, 'name' => ($record ? $record->label : ''), 'type' => $type]);
		
		return $record ? view('pagebuilder::editor', ['viewModel' => $viewModel]) : abort(404);
	}

	public function editPage($id)
	{
		$record = $this->getRecord('page', $id);
		$viewModel = $this->getViewModel((object)['id' => $id, 'name' => ($record ? $record->name : ''), 'type' => 'page']);

		return $record ? view('pagebuilder::editor', ['viewModel' => $viewModel]) : abort(404);
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
				'gjs-css' => null,//base64_decode($record->css_base64),
				'gjs-html' => preg_replace("/\s+|\n+|\r/", ' ', base64_decode($record->html_base64)),
				'gjs-components' => $record->gjs_components
			]);
		}

		return isset($data) ? $data->toArray() : [];
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
					$html = $this->setAttributes($object, $html);
				}
			}

			// $html = preg_replace("@\n@","", $this->setInlineStyles($request->get('gjs-css'), $html)); 
			
			$record->html_base64 = base64_encode($html);
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

	/** Get Blocks **/
	public function getBlocks() 
	{
		$blocks = Block::orderBy('block_group_id')->orderBy('sort_order')->get();;
		$data = collect([]);

		if($blocks) {
			$blocks->each(function($item, $key) use($data) { 
				if($item->html_base64 != null && trim($item->html_base64) != '') {
					$html = ($item->is_dynamic) ? preg_replace("@\n@","", $this->setPayloadProperties($item)) : base64_decode($item->html_base64);
				
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
		@$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$xpath = new \DOMXPath($dom);

		$element = $xpath->query("//dynablock");

		if($element) {
			$element->item(0)->setAttribute('properties', base64_encode($item->payload_properties));
		}

		return $dom->saveHTML();
	}

	// Add GJS properties as attributes
	function setAttributes($json, $html) {
		$dom = new \DOMDocument();
		@$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
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
		
		$html = $dom->saveHTML();
		foreach($json['components'] as $component) {
			$html = $this->setAttributes($component, $html);
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
