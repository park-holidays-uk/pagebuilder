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
	public function editor($type, $id)
	{
		$viewModel = new \StdClass;
		$record = $this->getRecord($type, $id);
		
		$viewModel->url_store = '/ajax/store/'. $type .'/'. $id;
		$viewModel->url_load = '/ajax/load/'. $type .'/'. $id;
		$viewModel->id = $id;
		$viewModel->mode = $type;

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
				'gjs-css' => base64_decode($record->css_base64),
				'gjs-html' => preg_replace("/\s+|\n+|\r/", ' ', base64_decode($record->html_base64)),
				'gjs-components' => $record->gjs_components
			]);
		}

		return isset($data) ? $data->toArray() : [];
	}

	/** STORE **/
	public function store($type, $id, Request $request) 
	{
		parse_str($request->getContent(), $data);

		try {
			$record = $this->getRecord($type, $id);
			$html = $data['gjs-html'];

			if($type != 'page') {				
				$json = json_decode($data['gjs-components'], true);
				
				foreach($json as $object) {
					$html = $this->setAttributes($object, $data['gjs-html']);
				}
			}

			$html = preg_replace("@\n@","", $this->setInlineStyles($data['gjs-css'], $html)); 
			
			$record->html_base64 = base64_encode($html);
			$record->css_base64 = base64_encode(preg_replace("/([*{](.*?)[}][body{](.*?)[}])/", "", $data['gjs-css'])) ?? null;
			$record->gjs_components = $data['gjs-components'];
			$record->save();

			return collect(['status' => 200])->toJson();
		}
		catch (exception $ex) {
			return $ex;
		}
	}

	/** Get Blocks **/
	public function getBlocks($type, $includeUserDefined = true) 
	{
		$blocks = null;

		switch($type) {
			case 'blocks': 
				$blocks = Block::where('is_layout', false);
				if(!filter_var($includeUserDefined, FILTER_VALIDATE_BOOLEAN)) { 
					$blocks->where('is_user_block', false)->orWhere('dynamic', true); 
				}
				$blocks->get();
				break;
			case 'layouts': 
				$blocks = Block::where('is_layout', true)->get();
				break;
		}

		$data = collect([]);

		if($blocks) {
			$blocks->each(function($item, $key) use($data) { 
				$html = ($item->dynamic) ? preg_replace("@\n@","", $this->setProperties($item)) : base64_decode($item->html_base64);

				$data->push((object) [
					'category' => $item->group->name,
					'block_id' => $item->block_id,
					'label' => $item->label,
					'content' => $html,
					'attributes' => $item->attributes					
				]);
			});
		}

		return $data->toJson();
	}

	/** Get Assets **/
	public function getAssets() 
	{
		$data = \DB::table('media')
					->leftJoin('media_lookups', 'media_lookups.media_id', '=', 'media.id')
					->whereIn('media_lookups.media_lookup_type', ['App\Models\Pages\Page'])->get();

		$data->map(function($image) {
			$image->path = config('pagebuilder.asset_path'). $image->path;
			return $image;
		});

		return $data->toJson();
	}

	/*
	*	Private Methods
	*/

	function getRecord($type, $id) 
	{
		$record = null;
		
		switch($type) {
			case 'block': 
				$record = Block::where('id', (int) $id)->where('is_layout', false)->first(); //->where('is_user_block', true)
				break;
			case 'layout': 
				$record = Block::where('id', (int) $id)->where('is_layout', true)->first();
				break;
			case 'page': 
				$record = Page::find((int)$id);
				break;
		}

		return $record;
	}

	function setProperties($item) {
		$html = base64_decode($item->html_base64);

		$dom = new \DOMDocument();
		@$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$xpath = new \DOMXPath($dom);

		$element = $xpath->query("//dynablock");

		if($element) {
			$element->item(0)->setAttribute('properties', base64_encode($item->properties));
		}

		return $dom->saveHTML();
	}

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

	function setInlineStyles($css, $html) {
		$dom = new \DOMDocument();
		@$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
		$xpath = new \DOMXPath($dom);

		preg_match_all ('/(.(.*?)|#c\d{3,})\s?({(.*?)})/', $css, $styles, PREG_PATTERN_ORDER);

		$prevSelector = null;
		$i = 0;

		foreach($styles[1] as $selector) {
			$element = null;
			
			if($selector != $prevSelector) {
				switch($selector[0]) {
					case '#':
						$element = $xpath->query("//*[@id = '". substr($selector, 1) ."']");
						break;
					case '.':
						$element = $xpath->query("//*[contains(@class, '". substr($selector, 1) ."')]");

						if($element && $element->item(0) && preg_match('/^(.c\d{3,4})$/', $selector)){
							$class = $element->item(0)->getAttribute('class');
							$class = str_replace(substr($selector, 1), '', $class);
							$element->item(0)->setAttribute('class', trim($class));
						}
						break;
				}

				if($element && $element->item(0)) {
					$element->item(0)->setAttribute('style', $styles[4][$i]);
				}
			}

			$prevSelector = $selector;
			$i++;
		}

		$html = $dom->saveHTML();
		return $html;
	}
}
