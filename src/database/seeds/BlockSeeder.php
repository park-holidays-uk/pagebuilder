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
            /** Text **/
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-one',
                'label' => 'Heading 1',
                'html' => '<h1 id="c001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="true" data-gjs-removable="true">Lorem Ipsum</h1>',
                'attributes' => '{ "class": "fa fa-header" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-two',
                'label' => 'Heading 2',
                'html' => '<h2 id="c001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="true" data-gjs-removable="true">Lorem Ipsum</h2>',
                'attributes' => '{ "class": "fa fa-header" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-three',
                'label' => 'Heading 3',
                'html' => '<h3 id="c001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="true" data-gjs-removable="true">Lorem Ipsum</h3>',
                'attributes' => '{ "class": "fa fa-header" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-four',
                'label' => 'Heading 4',
                'html' => '<h4 id="c001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="true" data-gjs-removable="true">Lorem Ipsum</h4>',
                'attributes' => '{ "class": "fa fa-header" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-five',
                'label' => 'Heading 5',
                'html' => '<h5 id="c001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="true" data-gjs-removable="true">Lorem Ipsum</h5>',
                'attributes' => '{ "class": "fa fa-header" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-six',
                'label' => 'Heading 6',
                'html' => '<h6 id="c001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="true" data-gjs-removable="true">Lorem Ipsum</h6>',
                'attributes' => '{ "class": "fa fa-header" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'paragraph',
                'label' => 'Paragraph',
                'html' => '<p id="c001" data-gjs-custom-name="Paragraph" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="true" data-gjs-removable="true"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis purus mi, a lacinia nunc semper auctor. Nullam id dictum lacus. Sed dignissim eu sem in semper. Nullam viverra, est rhoncus lobortis tristique, mi erat fermentum mauris, ac laoreet mi magna sit amet nibh. Vestibulum vulputate nibh urna, eget vestibulum dolor faucibus quis. Quisque consequat risus sed consectetur iaculis. Cras non dapibus lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam vulputate aliquet justo at lacinia. Praesent pharetra varius velit. Nam eleifend consequat elit sit amet condimentum. </p>',
                'attributes' => '{ "class": "fa fa-paragraph" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'text',
                'label' => 'Text',
                'html' => '<span id="c001" data-gjs-custom-name="Text" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem rutrum lacus cursus viverra imperdiet id risus. Nulla massa mauris, venenatis eget hendrerit a.</span>',
                'attributes' => '{ "class": "gjs-fonts gjs-f-text" }',
                'is_user_block' => false,              
            ],
            /** Grid **/
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-two-columns',
                'label' => '2 Columns',
                'html' => '<div class="grid-2_md-2_sm-1_xs-1" id="c003" data-gjs-custom-name="Row" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="true"><div class="col" id="c004" data-gjs-custom-name="Column" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-droppable="true" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="false"></div><div class="col" id="c005" data-gjs-custom-name="Column" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-droppable="true" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="false"></div></div>',
                'attributes' => '{ "class": "gjs-fonts gjs-f-b2" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-three-columns',
                'label' => '3 Columns',
                'html' => '<div class="grid-3_md-2_xs-1" id="c004" data-gjs-custom-name="Row" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="true" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="true"><div class="col" id="c005" data-gjs-custom-name="Column" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-droppable="true" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="false"></div><div class="col" id="c006" data-gjs-custom-name="Column" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-droppable="true" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="false"></div><div class="col" id="c007" data-gjs-custom-name="Column" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-droppable="true" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="false"></div></div>',
                'attributes' => '{ "class": "gjs-fonts gjs-f-b3" }',
                'is_user_block' => false,              
            ],
            
            /** Dynamic **/
            (object) [
                'block_group_id' => 2,
                'block_id' => 'feefo-reviews',
                'label' => 'Feefo Reviews',
                'html' => '<dynablock data-view="feefo-reviews" id="c001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="true"></dynablock>',
                'attributes' => '{ "class": "fa fa-commenting-o" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 2,
                'block_id' => 'park-entertainment',
                'label' => 'Park Entertainment',
                'html' => '<dynablock data-view="park-entertainment" data-json="eyJwYXJrX2lkIjogMX0=" id="c8001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="true"></dynablock>',
                'attributes' => '{ "class": "" }',
                'is_user_block' => false,              
            ],
            (object) [
                'block_group_id' => 2,
                'block_id' => 'late-availability',
                'label' => 'Late Availability',
                'html' => '<dynablock data-view="late-availability" id="c001" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="true"></dynablock>',
                'attributes' => '{ "class": "" }',
                'is_user_block' => false,              
            ],
            /** Form **/
            (object) [
                'block_group_id' => 3,
                'block_id' => 'form',
                'label' => 'Form',
                'html' => '<form id="c001" action="/form/handle" method="POST" data-gjs-stylable="false" data-gjs-draggable="true" data-gjs-droppable="false" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="true">
                                <input type="hidden" name="name" id="c002">
                                <input type="hidden" name="actions" id="c003">
                                <input type="hidden" name="emailto" id="c004">
                                <div class="form-dropzone" id="c005"></div>
                                <button class="btn btn-primary" type="submit" id="c006">Submit</button>
                            </form>',
                'attributes' => '{ "class": "" }',
                'is_user_block' => false,              
            ],
            /** Layouts **/
            (object) [
                'block_group_id' => 4,
                'block_id' => 'full-width',
                'label' => 'Full Width',
                'html' => '<div class="fluid-container" id="c002" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-droppable="true" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="false"></div>',
                'attributes' => '{ "class": "" }',
                'is_user_block' => false, 
                'is_layout' => true             
            ],
            (object) [
                'block_group_id' => 4,
                'block_id' => 'single-column',
                'label' => 'Single Column',
                'html' => '<div class="wrapper" id="c001" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-droppable="true" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="false">
                                <div class="container" id="c002" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-droppable="true" data-gjs-copyable="false" data-gjs-resizable="false" data-gjs-editable="false" data-gjs-removable="false"></div>
                            </div>',
                'attributes' => '{ "class": "" }',
                'is_user_block' => false, 
                'is_layout' => true             
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
