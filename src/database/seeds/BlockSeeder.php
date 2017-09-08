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
                'html' => '<div class="grid-2_md-2_sm-1_xs-1" data-gjs-custom-name="Row" data-gjs-droppable=".column" data-gjs-copyable="false" data-gjs-stylable="false">
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                            </div>',
                'attributes' => '{ "class": "" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-three-columns',
                'label' => '3 Columns',
                'html' => '<div class="grid-3_md-2_xs-1" data-gjs-custom-name="Row" data-gjs-droppable=".column" data-gjs-copyable="false" data-gjs-stylable="false">
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                <div class="col" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                            </div>',
                'attributes' => '{ "class": "" }',
                'is_user_block' => false,              
            ],

            /** Layout Blocks **/
            (object) [
                'block_group_id' => 2,
                'block_id' => 'layout-one-column',
                'label' => '1 Column',
                'html' => '<div class="container" data-gjs-custom-name="Container"></div>',
                'attributes' => '{ "class": "" }',   
                'is_layout' => true,        
            ],
            (object) [
                'block_group_id' => 2,
                'block_id' => 'layout-one-fluid-column',
                'label' => '1 Fluid Column',
                'html' => '<div class="container-fluid" data-gjs-custom-name="Fluid Container"></div>',
                'attributes' => '{ "class": "" }',   
                'is_layout' => true,        
            ],
            (object) [
                'block_group_id' => 2,
                'block_id' => 'layout-two-fluid-six-six-columns',
                'label' => '2 Fluid 6/6 Columns',
                'html' => '<div class="container-fluid" data-gjs-custom-name="Fluid Container" data-gjs-droppable=".column" data-gjs-copyable="false" data-gjs-stylable="false">
                                <div class="grid" data-gjs-custom-name="Row" data-gjs-droppable=".column" data-gjs-copyable="false" data-gjs-stylable="false" data-gjs-removable="false">
                                    <div class="col-6_xs-12" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                    <div class="col-6_xs-12" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                </div>
                            </div>',
                'attributes' => '{ "class": "" }',   
                'is_layout' => true,        
            ],
            (object) [
                'block_group_id' => 2,
                'block_id' => 'layout-two-fluid-eight-four-columns',
                'label' => '2 Fluid 8/4 Columns',
                'html' => '<div class="container-fluid" data-gjs-custom-name="Fluid Container" data-gjs-droppable=".column" data-gjs-copyable="false" data-gjs-stylable="false">
                                <div class="grid" data-gjs-custom-name="Row" data-gjs-droppable=".column" data-gjs-copyable="false" data-gjs-stylable="false" data-gjs-removable="false">
                                    <div class="col-8_sm-7_xs-12" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                    <div class="col-4_sm-5_xs-12" data-gjs-custom-name="Column" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-stylable="false"></div>
                                </div>
                            </div>',
                'attributes' => '{ "class": "" }',  
                'is_layout' => true,         
            ]
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
