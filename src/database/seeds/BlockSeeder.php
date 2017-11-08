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
            
            /** Grid **/
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-1-columns',
                'label' => '1 Columns',
                'icon_class' => 'gjs-fonts gjs-f-b1',
                'html' => '<div class="grid"><div class="col"></div></div>',
                'is_system_block' => true,
                'sort_order' => 0           
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-two-columns',
                'label' => '2 Columns',
                'icon_class' => 'gjs-fonts gjs-f-b2',
                'html' => '<div class="grid-2_md-2_sm-1_xs-1">
                    <div class="col"></div>
                    <div class="col"></div>
                </div>',
                'is_system_block' => true,
                'sort_order' => 0           
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-three-columns',
                'label' => '3 Columns',
                'icon_class' => 'gjs-fonts gjs-f-b3',
                'html' => '<div class="grid-3_md-2_xs-1">
                    <div class="col"></div>
                    <div class="col"></div>
                    <div class="col"></div>
                </div>',
                'is_system_block' => true,
                'sort_order' => 0
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'grid-four-eight-columns',
                'label' => '2 Columns 4/8',
                'icon_class' => 'gjs-fonts gjs-f-b37',
                'html' => '<div class="grid">
                    <div class="col-4_xs-12"></div>
                    <div class="col-8_xs-12"></div>
                </div>',
                'is_system_block' => true,
                'sort_order' => 0           
            ],

            /** Text **/
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-one',
                'label' => 'Heading 1',
                'icon_class' => 'fa fa-header',
                'html' => '<h1>Lorem Ipsum</h1>',
                'is_system_block' => true,
                'sort_order' => 0            
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-two',
                'label' => 'Heading 2',
                'icon_class' => 'fa fa-header',
                'html' => '<h2>Lorem Ipsum</h2>',
                'is_system_block' => true,
                'sort_order' => 0            
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-three',
                'label' => 'Heading 3',
                'icon_class' => 'fa fa-header',
                'html' => '<h3>Lorem Ipsum</h3>',
                'is_system_block' => true,
                'sort_order' => 0            
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-four',
                'label' => 'Heading 4',
                'icon_class' => 'fa fa-header',
                'html' => '<h4>Lorem Ipsum</h4>',
                'is_system_block' => true,
                'sort_order' => 0            
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-five',
                'label' => 'Heading 5',
                'icon_class' => 'fa fa-header',
                'html' => '<h5>Lorem Ipsum</h5>',
                'is_system_block' => true,
                'sort_order' => 0            
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'heading-six',
                'label' => 'Heading 6',
                'icon_class' => 'fa fa-header',
                'html' => '<h6>Lorem Ipsum</h6>',
                'is_system_block' => true,
                'sort_order' => 0            
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'paragraph',
                'label' => 'Paragraph',
                'icon_class' => 'fa fa-paragraph',
                'html' => '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis purus mi, a lacinia nunc semper auctor. Nullam id dictum lacus. Sed dignissim eu sem in semper. Nullam viverra, est rhoncus lobortis tristique, mi erat fermentum mauris, ac laoreet mi magna sit amet nibh. Vestibulum vulputate nibh urna, eget vestibulum dolor faucibus quis. Quisque consequat risus sed consectetur iaculis. Cras non dapibus lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam vulputate aliquet justo at lacinia. Praesent pharetra varius velit. Nam eleifend consequat elit sit amet condimentum. </p>',
                'is_system_block' => true,
                'sort_order' => 0            
            ],
            (object) [
                'block_group_id' => 1,
                'block_id' => 'text',
                'label' => 'Text',
                'icon_class' => 'gjs-fonts gjs-f-text',
                'html' => '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem rutrum lacus cursus viverra imperdiet id risus. Nulla massa mauris, venenatis eget hendrerit a.</span>',
                'is_system_block' => true,
                'sort_order' => 0            
            ],

            /** Form **/
            (object) [
                'block_group_id' => 3,
                'block_id' => 'form',
                'label' => 'Form',
                'icon_class' => null,
                'html' => '<form action="/form/handle" method="POST">
                    <input type="hidden" name="name">
                    <input type="hidden" name="actions">
                    <input type="hidden" name="emailto">
                    <div class="form-dropzone"></div>
                    <button class="btn btn-primary" type="submit">Submit</button>
                </form>',
                'is_system_block' => true,
                'sort_order' => 0           
            ],

            /** Layouts **/
            (object) [
                'block_group_id' => 4,
                'block_id' => 'fluid-layout',
                'label' => 'Fluid',
                'icon_class' => null,
                'html' => '<div class="wrapper">
                    <div class="fluid-container"></div>
                </div>',
                'is_system_block' => true, 
                'is_layout' => true,
                'sort_order' => 0             
            ],
            (object) [
                'block_group_id' => 4,
                'block_id' => 'non-fluid-layout',
                'label' => 'Non Fluid',
                'icon_class' => null,
                'html' => '<div class="wrapper">
                    <div class="container"></div>
                </div>',
                'is_system_block' => true, 
                'is_layout' => true,
                'sort_order' => 0             
            ],
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
            if(isset($item->is_system_block)) { $block->is_system_block = $item->is_system_block; }
            if(isset($item->is_layout)) { $block->is_layout = $item->is_layout; }

            $block->save();
        });
    }
}
