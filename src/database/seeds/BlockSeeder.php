<?php

namespace ParkHolidays\PageBuilder\Database\Seeds;

use Illuminate\Database\Seeder;
use ParkHolidays\PageBuilder\Models\Block;

class BlockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $blocks = collect([
            
            /** User Blocks **/
            // (object) [
            //     'block_group_id' => 1,
            //     'block_id' => 'grid-1-columns',
            //     'label' => '1 Columns',
            //     'icon_class' => 'gjs-fonts gjs-f-b1',
            //     'html' => '<div class="grid"><div class="col"></div></div>',
            //     'sort_order' => 0           
            // ],
        ]);

        \DB::table('pagebuilder_blocks')->truncate();

        $blocks->each(function($item, $key) {
            $block = new Block;
            $block->block_group_id = $item->block_group_id;
            $block->block_id = $item->block_id;
            $block->label = $item->label;
            $block->icon_class = $item->icon_class;
            $block->html_base64 = base64_encode($item->html);

            if(isset($item->gjs_components)) { $block->gjs_components = $item->gjs_components; }

            $block->save();
        });
    }
}
