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
                'block_id' => 'heading-one',
                'label' => 'Heading 1',
                'html' => '<h1 data-gjs-custom-name="Heading" data-gjs-editable="true">Heading</h1>',
                'attributes' => '{ "class": "gjs-fonts gjs-f-text" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'paragraph',
                'label' => 'Paragraph',
                'html' => '<p data-gjs-custom-name="Paragraph" data-gjs-editable="true">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis purus mi, 
                            a lacinia nunc semper auctor. Nullam id dictum lacus. Sed dignissim eu sem in semper. 
                            Nullam viverra, est rhoncus lobortis tristique, mi erat fermentum mauris, 
                            ac laoreet mi magna sit amet nibh. Vestibulum vulputate nibh urna, 
                            eget vestibulum dolor faucibus quis. Quisque consequat risus sed consectetur iaculis. 
                            Cras non dapibus lorem. Pellentesque habitant morbi tristique senectus et netus et 
                            malesuada fames ac turpis egestas. Nullam vulputate aliquet justo at lacinia. 
                            Praesent pharetra varius velit. Nam eleifend consequat elit sit amet condimentum.
                           </p>',
                'attributes' => '{ "class": "fa fa-paragraph" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'text',
                'label' => 'Text',
                'html' => '<span data-gjs-custom-name="Text" data-gjs-editable="true">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem rutrum 
                                lacus cursus viverra imperdiet id risus. Nulla massa mauris, venenatis eget 
                                hendrerit a.
                            </span>',
                'attributes' => '{ "class": "fa fa-header" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-two-columns',
                'label' => '2 Columns',
                'html' => '<div class="grid-2_md-2_sm-1_xs-1" data-gjs-custom-name="Row" data-gjs-droppable=".column">
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
                'html' => '<div class="grid-3_md-2_xs-1" data-gjs-custom-name="Row" data-gjs-droppable=".column">
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
