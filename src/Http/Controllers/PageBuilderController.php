<?php

namespace ParkHolidays\PageBuilder\Http\Controllers;

use App\Http\Controllers\Controller;

class PageBuilderController extends Controller
{
	public function dashboard()
	{
		return view('pagebuilder::dashboard');
	}

	public function editor()
	{
		return view('pagebuilder::editor');
	}
}
