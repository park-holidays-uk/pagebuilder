/*export default*/
export default grapesjs.plugins.add('blocks', (editor, options) => {

    /*
     *   VARIABLES 
     */

    var opt = options || {};

    // Managers
    var commands = editor.Commands;
    var blockManager = editor.BlockManager;


    /*
     *   COMMANDS
     */
    commands.add('category-accordionify', {
        run: function(editor, sender, options) {
            const categories = editor.BlockManager.getCategories();
            categories.each(category => {
                var open = (category.get('id').toLowerCase() == 'basic') ? true : false;
                category.set('open', open).on('change:open', opened => {
                    opened.get('open') && categories.each(category => {
                        category !== opened && category.set('open', false)
                    });
                });
            });
        }
    })

    commands.add('load-blocks', {
        run: function(editor, sender, options) {
            blockManager.getAll().reset();
            /*
             *   BASIC
             */

            // Container
            blockManager.add('container', {
                label: 'Container',
                category: 'Basic',
                content: '<div class="container"></div>',
                attributes: { class: 'gjs-fonts gjs-f-b1' } // NO ICON
            });

            // Grid
            blockManager.add('grid-empty', {
                label: 'Grid',
                category: 'Basic',
                content: '<div class="grid grd"></div>',
                attributes: { class: 'fa fa-th' }
            });

            // Column
            blockManager.add('column-empty', {
                label: 'Column',
                category: 'Basic',
                content: '<div class="col grd-cl"></div>',
                attributes: { class: 'fa fa-columns' }
            });

            // Div
            blockManager.add('div', {
                label: 'Div',
                category: 'Basic',
                content: '<div></div>',
                attributes: { class: 'gjs-fonts gjs-f-b1' } // NO ICON
            });

            // Section
            blockManager.add('section', {
                label: 'Section',
                category: 'Basic',
                content: '<section></section>',
                attributes: { class: 'gjs-fonts gjs-f-b1' } // NO ICON
            });

            // Lists
            blockManager.add('unordered-list', {
                label: 'Unordered List',
                category: 'Basic',
                content: '<ul><li><span>Lorem Ipsum</span></li></ul>',
                attributes: { class: 'fa fa-list-ul' }
            });

            blockManager.add('ordered-list', {
                label: 'Ordered List',
                category: 'Basic',
                content: '<ol><li><span>Lorem Ipsum</span></li></ol>',
                attributes: { class: 'fa fa-list-ol' }
            });

            // Horizontal Rule
            blockManager.add('horizontal-rule', {
                label: 'Horizontal Rule',
                category: 'Basic',
                content: '<hr class="hr-separator" />',
                attributes: { class: 'gjs-fonts gjs-f-divider' }
            });

            // Image
            blockManager.add('image', {
                label: 'Image',
                category: 'Basic',
                content: '<img/>',
                attributes: { class: 'fa fa-image' }
            });

            // HTML5 Video
            blockManager.add('html5-video', {
                label: 'Video',
                category: 'Basic',
                content: '<video class="video-wrapper"></video>',
                attributes: { class: 'fa fa-youtube-play' }
            });

            // Icon
            blockManager.add('icon', {
                label: 'Icon',
                category: 'Basic',
                textable: 1,
                content: '<i class="icon-info-circle"></i>',
                attributes: { class: 'fa fa-info' }
            });

            // Heading One
            blockManager.add('heading-one-text', {
                label: 'Heading',
                category: 'Typography',
                content: '<h1 data-gjs-custom-name="Heading">Lorem Ipsum</h1>',
                attributes: { class: 'fa fa-header' }
            });

            // Paragraph
            blockManager.add('paragraph-text', {
                label: 'Paragraph',
                category: 'Typography',
                content: '<p data-gjs-custom-name="Paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis purus mi, a lacinia nunc semper auctor. Nullam id dictum lacus. Sed dignissim eu sem in semper. Nullam viverra, est rhoncus lobortis tristique, mi erat fermentum mauris, ac laoreet mi magna sit amet nibh. Vestibulum vulputate nibh urna, eget vestibulum dolor faucibus quis. Quisque consequat risus sed consectetur iaculis. Cras non dapibus lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam vulputate aliquet justo at lacinia. Praesent pharetra varius velit. Nam eleifend consequat elit sit amet condimentum.</p>',
                attributes: { class: 'fa fa-paragraph' }
            });

            // Span Text
            blockManager.add('span-text', {
                label: 'Text',
                category: 'Typography',
                textable: 1,
                content: '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem rutrum lacus cursus viverra imperdiet id risus. Nulla massa mauris, venenatis eget hendrerit a.</span>',
                attributes: { class: 'gjs-fonts gjs-f-text' }
            });

            // Small Text
            blockManager.add('small-text', {
                label: 'Small Text',
                category: 'Typography',
                textable: 1,
                content: '<small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem rutrum lacus cursus viverra imperdiet id risus. Nulla massa mauris, venenatis eget hendrerit a.</small>',
                attributes: { class: 'fa fa-font' }
            });

            // Block Quote Text
            blockManager.add('blockquote-text', {
                label: 'Quote',
                category: 'Typography',
                content: '<blockquote class="mx-0 my-4" data-gjs-custom-name="Blockquote" data-gjs-stylable="false" data-gjs-droppable="false"> <i class="icon-quotes-round-up top" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-droppable="false" data-gjs-removable="false"></i><p data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-droppable="false" data-gjs-removable="false">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem rutrum lacus cursus viverra imperdiet id risus. Nulla massa mauris, venenatis eget hendrerit a.</p> <i class="icon-quotes-round-down bottom" data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-droppable="false" data-gjs-removable="false"></i><cite data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-droppable="false" data-gjs-removable="false">Lorem Ipsum</cite> <small data-gjs-stylable="false" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-droppable="false" data-gjs-removable="false">Lorem Ipsum</small></blockquote>',
                attributes: { class: 'fa fa-quote-right' }
            });

            // Link
            blockManager.add('link', {
                label: 'Link',
                category: 'Typography',
                textable: 1,
                content: '<a>Lorem ipsum</a>',
                attributes: { class: 'fa fa-link' }
            });

            // Table
            blockManager.add('table', {
                label: 'Table',
                category: 'Basic',
                content: '<div class="table-wrapper"><table><caption>Lorem Ipsum</caption><thead><tr data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-removable="false"><th><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></th><th><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></th><th><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></th></tr></thead><tbody><tr><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td></tr><tr><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td></tr><tr><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td></tr></tbody><tfoot><tr data-gjs-copyable="false" data-gjs-draggable="false" data-gjs-removable="false"><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td><td><p data-gjs-custom-name="Text" data-gjs-is_stylable="false" data-gjs-disableTraits="true" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false">Lorem Ipsum</p></td></tr></tfoot></table></div>',
                //'<div class="table-wrapper"><table><caption>Lorem Ipsum</caption><thead><tr><th><p>Lorem Ipsum</p></th><th><p>Lorem Ipsum</p></th><th><p>Lorem Ipsum</p></th></tr></thead><tbody><tr><td><p>Lorem Ipsum</p></td><td><p>Lorem Ipsum</p></td><td><p>Lorem Ipsum</p></td></tr><tr><td><p>Lorem Ipsum</p></td><td><p>Lorem Ipsum</p></td><td><p>Lorem Ipsum</p></td></tr><tr><td><p>Lorem Ipsum</p></td><td><p>Lorem Ipsum</p></td><td><p>Lorem Ipsum</p></td></tr></tbody><tfoot><tr><td><p>Lorem Ipsum</p></td><td><p>Lorem Ipsum</p></td><td><p>Lorem Ipsum</p></td></tr></tfoot></table></div>',
                attributes: { class: 'fa fa-table' }
            });

            /*
             *   FORMS
             */

            // Form
            blockManager.add('form', {
                label: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="gjs-block-svg-path" d="M22,5.5 C22,5.2 21.5,5 20.75,5 L3.25,5 C2.5,5 2,5.2 2,5.5 L2,8.5 C2,8.8 2.5,9 3.25,9 L20.75,9 C21.5,9 22,8.8 22,8.5 L22,5.5 Z M21,8 L3,8 L3,6 L21,6 L21,8 Z" fill-rule="nonzero"></path>
                <path class="gjs-block-svg-path" d="M22,10.5 C22,10.2 21.5,10 20.75,10 L3.25,10 C2.5,10 2,10.2 2,10.5 L2,13.5 C2,13.8 2.5,14 3.25,14 L20.75,14 C21.5,14 22,13.8 22,13.5 L22,10.5 Z M21,13 L3,13 L3,11 L21,11 L21,13 Z" fill-rule="nonzero"></path>
                <rect class="gjs-block-svg-path" x="2" y="15" width="10" height="3" rx="0.5"></rect>
              </svg>
              <div class="gjs-block-label">Form</div>`,
                category: 'Forms',
                content: '<form><serverblock name="csrf_token" id="csrf-token" data-gjs-removable="false"></serverblock><input type="hidden" name="name" title="Form name" placeholder="Form name" class="input"  data-gjs-custom-name="Hidden Input" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false" /> <input type="hidden" name="actions" title="Form actions" placeholder="Form actions" class="input"  data-gjs-custom-name="Hidden Input" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false" /> <input type="hidden" name="emailto" title="Email to" placeholder="Email to" class="input"  data-gjs-custom-name="Hidden Input" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-removable="false" /><div class="form-dropzone"></div></form>'
            });

            // Label
            blockManager.add('label', {
                label: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="gjs-block-svg-path" d="M22,11.875 C22,11.35 21.5,11 20.75,11 L3.25,11 C2.5,11 2,11.35 2,11.875 L2,17.125 C2,17.65 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.65 22,17.125 L22,11.875 Z M21,17 L3,17 L3,12 L21,12 L21,17 Z" fill-rule="nonzero"></path>
                <rect class="gjs-block-svg-path" x="2" y="5" width="14" height="5" rx="0.5"></rect>
                <polygon class="gjs-block-svg-path" fill-rule="nonzero" points="4 13 5 13 5 16 4 16"></polygon>
              </svg>
              <div class="gjs-block-label">Label</div>`,
                category: 'Forms',
                content: '<label>Lorem Ipsum</label>'
            });

            // Hidden Input
            blockManager.add('hidden-input-form-field', {
                label: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
                <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
              </svg>
              <div class="gjs-block-label">Hidden Input</div>`,
                category: 'Forms',
                content: '<input type="hidden" class="input" placeholder="Custom hidden field" data-gjs-custom-name="Hidden Input" />'
            });

            // Input
            blockManager.add('input-form-field', {
                label: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
                <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
              </svg>
              <div class="gjs-block-label">Input Field</div>`,
                category: 'Forms',
                content: '<label>Lorem Ipsum</label><input type="text" class="input" />'
            });

            // Textarea
            blockManager.add('textarea-form-field', {
                label: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="gjs-block-svg-path" d="M22,7.5 C22,6.6 21.5,6 20.75,6 L3.25,6 C2.5,6 2,6.6 2,7.5 L2,16.5 C2,17.4 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.4 22,16.5 L22,7.5 Z M21,17 L3,17 L3,7 L21,7 L21,17 Z"></path>
                <polygon class="gjs-block-svg-path" points="4 8 5 8 5 12 4 12"></polygon>
                <polygon class="gjs-block-svg-path" points="19 7 20 7 20 17 19 17"></polygon>
                <polygon class="gjs-block-svg-path" points="20 8 21 8 21 9 20 9"></polygon>
                <polygon class="gjs-block-svg-path" points="20 15 21 15 21 16 20 16"></polygon>
              </svg>
              <div class="gjs-block-label">Textarea</div>`,
                category: 'Forms',
                content: '<label>Lorem Ipsum</label><textarea rows="6" class="input"></textarea>'
            });

            // Select
            blockManager.add('select-form-field', {
                label: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
                <polygon class="gjs-block-svg-path" transform="translate(18.500000, 12.000000) scale(1, -1) translate(-18.500000, -12.000000) " points="18.5 11 20 13 17 13"></polygon>
                <rect class="gjs-block-svg-path" x="4" y="11.5" width="11" height="1"></rect>
              </svg>
              <div class="gjs-block-label">Select</div>`,
                category: 'Forms',
                content: '<label>Lorem Ipsum</label><select class="select"><option>Lorem Ipsum</optyion></select>'
            });

            // Checkbox
            blockManager.add('checkbox-form-field', {
                label: 'Checkbox',
                category: 'Forms',
                content: '<label><input type="checkbox" data-gjs-custom-name="Checkbox" /> <span>Lorem Ipsum</span></label>',
                attributes: { class: 'fa fa-check-square' }
            });

            // Radio Button
            blockManager.add('radio-button-form-field', {
                label: 'Radio Button',
                category: 'Forms',
                content: '<label><input type="radio" data-gjs-custom-name="Radio Button" /> <span>Lorem Ipsum</span></label>',
                attributes: { class: 'fa fa-dot-circle-o' }
            });

            // Button
            blockManager.add('button', {
                label: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
                <rect class="gjs-block-svg-path" x="4" y="11.5" width="16" height="1"></rect>
              </svg>
              <div class="gjs-block-label">Button</div>`,
                category: 'Forms',
                content: '<button>Lorem Ipsum</button>'
            });

            if (!options.excludeUserBlocks) {
                /* Load User Blocks */
                $.ajax({
                    url: opt.url_prefix + '/ajax/get/blocks',
                }).done(function(data) {
                    var blocks = JSON.parse(data);

                    _.forEach(blocks, function(block) {
                        blockManager.add(block.block_id, {
                            label: block.label,
                            category: block.category,
                            content: block.content,
                            attributes: JSON.parse(block.attributes),
                        });
                    });

                    editor.runCommand('category-accordionify');
                });
            }
        }
    });


    /*
     *   Events
     */

    editor.on('block:remove', function(model) {
        // block:drag:start
        // block:drag:move
        // block:drag:stop
        // block:add
        // block:remove
        editor.trigger('change:selectedComponent');
    });

});