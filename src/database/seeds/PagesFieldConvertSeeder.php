<?php

namespace ParkHolidays\PageBuilder\Database\Seeds;

use Illuminate\Database\Seeder;
use App\Models\Pages\Page;

class PagesFieldConvertSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pages = Page::where('html_base64', '!=', null)->get();

        foreach($pages as $page) 
        {
            if(!preg_match('%^[a-zA-Z0-9/+]*={0,2}$%', $page->html_base64)) 
            {
                $page->html_base64 = base64_encode($page->html_base64);
                $page->save();
            }
        }
    }
}
