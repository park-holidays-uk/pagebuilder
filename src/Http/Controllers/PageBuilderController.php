<?php

namespace ParkHolidays\PageBuilder\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use ParkHolidays\PageBuilder\Models\Block;
use ParkHolidays\PageBuilder\Models\Template;
use App\Models\Pages\Page;

class PageBuilderController extends Controller
{
	public function editor($type, $id)
	{
		$viewModel = new \StdClass;
		$record = $this->getRecord($type, $id);
		
		$viewModel->url_store = '/ajax/store/'. $type .'/'. $id;
		$viewModel->url_load = '/ajax/load/'. $type .'/'. $id;
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
			
			$record->html_base64 = base64_encode($data['gjs-html']);
			$record->css_base64 = base64_encode($data['gjs-css']);
			$record->gjs_components = $data['gjs-components'];
			$record->save();

			return collect(['status' => 100])->toJson();
		}
		catch (exception $ex) {
			return $ex;
		}
	}

	/** Get Blocks **/
	public function getBlocks($type, $userDefined = true) 
	{
		$blocks = null;

		switch($type) {
			case 'blocks': 
				$blocks = Block::where('is_layout', false)->where('is_user_block', (boolean) $userDefined)->get();
				break;
			case 'layouts': 
				$blocks = Block::where('is_layout', true)->get();
				break;
		}

		$data = collect([]);

		if($blocks) {
			$blocks->each(function($item, $key) use($data) { 
				$data->push((object) [
					'category' => $item->group->name,
					'block_id' => $item->block_id,
					'label' => $item->label,
					'content' => base64_decode($item->html_base64),
					'attributes' => $item->attributes
				]);
			});
		}

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
				$record = Block::where('id', (int) $int)->where('is_layout', false)->where('is_user_block', true)->first();
				break;
			case 'layout': 
				$record = Block::where('id', (int) $int)->where('is_layout', true)->first();
				break;
			case 'page': 
				$record = Page::find((int)$id);
				break;
		}

		return $record;
	}
}
