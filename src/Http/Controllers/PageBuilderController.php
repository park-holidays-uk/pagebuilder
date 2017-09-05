<?php

namespace ParkHolidays\PageBuilder\Http\Controllers;

use App\Http\Controllers\Controller;

class PageBuilderController extends Controller
{
	public function dashboard()
	{
		return view('pagebuilder::dashboard');
	}

	public function pageEditor($id = null)
	{
		$viewModel = new \StdClass;
		
		$viewModel->components = preg_replace("/\s+|\n+|\r/", ' ', base64_decode('PGRpdiBjbGFzcz0iYWR2ZXJ0LXByb21vIG9uZSB0ZXh0LXdoaXRlIg0KICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQWR2ZXJ0IFByb21vIiANCj4NCiAgICA8ZGl2IGNsYXNzPSJpbWFnZSIgc3R5bGU9ImJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL3Bhcmtob2xpZGF5cy5zMy5hbWF6b25hd3MuY29tL3N0YXRpY19hc3NldHMvaG9tZV9wYWdlL2FkX29uZV9ob2xpZGF5cy5wbmcpOyINCiAgICAgICAgIGRhdGEtZ2pzLWN1c3RvbS1uYW1lPSJCYWNrZ3JvdW5kIEltYWdlIg0KICAgICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSINCiAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgIGRhdGEtZ2pzLWRyYWdnYWJsZT0iZmFsc2UiDQogICAgPjwvZGl2Pg0KICAgIDxoMiBjbGFzcz0ic2F0aXNmeS1yZWd1bGFyIHJvdGF0ZSBtYi0wIHctNTAgdGV4dC1jZW50ZXIiDQogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiDQogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICA+RGlwIFlvdXI8L2gyPg0KICAgIDxoMiBjbGFzcz0icmFsZXdheS1ib2xkIGgxIG0tMCBtdC0yIHctNTAgdGV4dC1jZW50ZXIiDQogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiDQogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICA+VG9lPC9oMj4NCiAgICA8aDIgY2xhc3M9InNhdGlzZnktcmVndWxhciByb3RhdGUgbS0wIHctNTAgdGV4dC1jZW50ZXIiDQogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiDQogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICA+aW50bzwvaDI+DQogICAgPGgyIGNsYXNzPSJyYWxld2F5LWJvbGQgaDEgbS0wIHctNTAgdGV4dC1jZW50ZXIiDQogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiDQogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICA+MjAxODwvaDI+DQogICAgPGEgY2xhc3M9Img0IHByLTMiDQogICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtY29weWFibGU9ImZhbHNlIg0KICAgICAgICBkYXRhLWdqcy1kcmFnZ2FibGU9ImZhbHNlIg0KICAgID4yMDE4IE9mZmVyczxpIGNsYXNzPSJpY29uLWNoZXZyb24tcmlnaHQiPjwvaT48L2E+DQo8L2Rpdj4='));

		return view('pagebuilder::editor', ['viewModel' => $viewModel]);
	}

	/*
	*	Ajax 
	*/
	public function getTemplates() {
		$templates = collect([
			(object) [
				'category' => 'Layouts',
				'block_id' => 'layout-one',
				'label' => '1 Column',
				'content' => base64_decode('PGRpdiBjbGFzcz0iZ3JpZCIgDQogICAgICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iUm93IiANCiAgICAgICAgIGRhdGEtZ2pzLWRyb3BwYWJsZT0iLmNvbHVtbiINCiAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICA+DQogICAgICAgIDxkaXYgY2xhc3M9ImNvbC0xMiIgDQogICAgICAgICAgICAgZGF0YS1nanMtY3VzdG9tLW5hbWU9IkNvbHVtbiIgDQogICAgICAgICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSINCiAgICAgICAgICAgICBkYXRhLWdqcy1jb3B5YWJsZT0iZmFsc2UiDQogICAgICAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICAgICAgPjwvZGl2Pg0KICAgIDwvZGl2Pg=='),
				'attributes' => (object) [
					'class' => 'gjs-fonts gjs-f-b1'
				]
			],
			(object) [
				'category' => 'Layouts',
				'block_id' => 'layout-two',
				'label' => '2 Column 6/6',
				'content' => base64_decode('PGRpdiBjbGFzcz0iZ3JpZCIgDQogICAgICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iUm93IiANCiAgICAgICAgIGRhdGEtZ2pzLWRyb3BwYWJsZT0iLmNvbHVtbiINCiAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICA+DQogICAgICAgIDxkaXYgY2xhc3M9ImNvbC02IiANCiAgICAgICAgICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQ29sdW1uIiANCiAgICAgICAgICAgICBkYXRhLWdqcy1yZW1vdmFibGU9ImZhbHNlIg0KICAgICAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgICAgICBkYXRhLWdqcy1kcmFnZ2FibGU9ImZhbHNlIg0KICAgICAgICA+PC9kaXY+DQogICAgICAgIDxkaXYgY2xhc3M9ImNvbC02IiANCiAgICAgICAgICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQ29sdW1uIiANCiAgICAgICAgICAgICBkYXRhLWdqcy1yZW1vdmFibGU9ImZhbHNlIg0KICAgICAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgICAgICBkYXRhLWdqcy1kcmFnZ2FibGU9ImZhbHNlIg0KICAgICAgICA+PC9kaXY+DQogICAgPC9kaXY+'),
				'attributes' => (object) [
					'class' => 'gjs-fonts gjs-f-b2'
				]
			],
			(object) [
				'category' => 'Layouts',
				'block_id' => 'layout-three',
				'label' => '2 Column 8/4',
				'content' => base64_decode('PGRpdiBjbGFzcz0iZ3JpZCIgDQogICAgICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iUm93IiANCiAgICAgICAgIGRhdGEtZ2pzLWRyb3BwYWJsZT0iLmNvbHVtbiINCiAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICA+DQogICAgICAgIDxkaXYgY2xhc3M9ImNvbC04IiANCiAgICAgICAgICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQ29sdW1uIiANCiAgICAgICAgICAgICBkYXRhLWdqcy1yZW1vdmFibGU9ImZhbHNlIg0KICAgICAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgICAgICBkYXRhLWdqcy1kcmFnZ2FibGU9ImZhbHNlIg0KICAgICAgICA+PC9kaXY+DQogICAgICAgIDxkaXYgY2xhc3M9ImNvbC00IiANCiAgICAgICAgICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQ29sdW1uIiANCiAgICAgICAgICAgICBkYXRhLWdqcy1yZW1vdmFibGU9ImZhbHNlIg0KICAgICAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgICAgICBkYXRhLWdqcy1kcmFnZ2FibGU9ImZhbHNlIg0KICAgICAgICA+PC9kaXY+DQogICAgPC9kaXY+'),
				'attributes' => (object) [
					'class' => 'gjs-fonts gjs-f-b37'
				]
			],
		]);

		return $templates->toJson();
	}

	public function getBlocks() {
		$blocks = collect([
			// Blocks
			(object) [
				'category' => 'Promotion Blocks',
				'block_id' => 'promo-one',
				'label' => 'Holidays Advert Promo',
				'content' => base64_decode('PGRpdiBjbGFzcz0iYWR2ZXJ0LXByb21vIG9uZSB0ZXh0LXdoaXRlIg0KICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQWR2ZXJ0IFByb21vIiANCj4NCiAgICA8ZGl2IGNsYXNzPSJpbWFnZSIgc3R5bGU9ImJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL3Bhcmtob2xpZGF5cy5zMy5hbWF6b25hd3MuY29tL3N0YXRpY19hc3NldHMvaG9tZV9wYWdlL2FkX29uZV9ob2xpZGF5cy5wbmcpOyINCiAgICAgICAgIGRhdGEtZ2pzLWN1c3RvbS1uYW1lPSJCYWNrZ3JvdW5kIEltYWdlIg0KICAgICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSINCiAgICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgIGRhdGEtZ2pzLWRyYWdnYWJsZT0iZmFsc2UiDQogICAgPjwvZGl2Pg0KICAgIDxoMiBjbGFzcz0ic2F0aXNmeS1yZWd1bGFyIHJvdGF0ZSBtYi0wIHctNTAgdGV4dC1jZW50ZXIiDQogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiDQogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICA+RGlwIFlvdXI8L2gyPg0KICAgIDxoMiBjbGFzcz0icmFsZXdheS1ib2xkIGgxIG0tMCBtdC0yIHctNTAgdGV4dC1jZW50ZXIiDQogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiDQogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICA+VG9lPC9oMj4NCiAgICA8aDIgY2xhc3M9InNhdGlzZnktcmVndWxhciByb3RhdGUgbS0wIHctNTAgdGV4dC1jZW50ZXIiDQogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiDQogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICA+aW50bzwvaDI+DQogICAgPGgyIGNsYXNzPSJyYWxld2F5LWJvbGQgaDEgbS0wIHctNTAgdGV4dC1jZW50ZXIiDQogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiDQogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSINCiAgICA+MjAxODwvaDI+DQogICAgPGEgY2xhc3M9Img0IHByLTMiDQogICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSINCiAgICAgICAgZGF0YS1nanMtY29weWFibGU9ImZhbHNlIg0KICAgICAgICBkYXRhLWdqcy1kcmFnZ2FibGU9ImZhbHNlIg0KICAgID4yMDE4IE9mZmVyczxpIGNsYXNzPSJpY29uLWNoZXZyb24tcmlnaHQiPjwvaT48L2E+DQo8L2Rpdj4='),
				'attributes' => (object) [
					'class' => 'gjs-fonts gjs-f-hero'
				]
			]
		]);

		return $blocks->toJson();
	}
}
