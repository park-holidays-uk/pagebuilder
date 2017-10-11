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
            /** Core Blocks **/
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-two-columns',
                'label' => '2 Columns',
                'html' => '<div class="grid-2_md-2_sm-1_xs-1" data-gjs-custom-name="Row" data-gjs-droppable=".column" data-gjs-stylable="false">
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                            </div>',
                'attributes' => '{ "class": "gjs-fonts gjs-f-b2" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-three-columns',
                'label' => '3 Columns',
                'html' => '<div class="grid-3_md-2_xs-1" data-gjs-custom-name="Row" data-gjs-droppable=".column" data-gjs-stylable="false">
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                            </div>',
                'attributes' => '{ "class": "gjs-fonts gjs-f-b3" }',
                'is_user_block' => false,              
            ],
        ]);

        \DB::table('pagebuilder_blocks')->truncate();

        $blocks->each(function($item, $key) {
            $block = new Block;
            $block->block_group_id = $item->block_group_id;
            $block->block_id = $item->block_id;
            $block->label = $item->label;
            $block->html_base64 = base64_encode($item->html);
            $block->attributes = $item->attributes;
            $block->save();
        });
    }
}
