/*export default*/
grapesjs.plugins.add('blocks', (editor, options) => {

    /*
     *   VARIABLES 
     */

    // Managers
    var opt = options || {};
    var commands = editor.Commands;
    var blockManager = editor.BlockManager;


    /*
     *   COMMANDS
     */

    commands.add('load-blocks', {
        run: function(editor, sender, options) {
            blockManager.getAll().reset();

            /* System Blocks */
            // Container
            blockManager.add('container', {
                label: 'Container',
                category: 'Basic',
                content: '<div class="container"></div>',
                attributes: { class: '' } // NO ICON
            });

            // One Column Grid
            blockManager.add('grid-one-column', {
                label: '1 Column',
                category: 'Basic',
                content: '<div class="grid"><div class="col"></div></div>',
                attributes: { class: 'gjs-fonts gjs-f-b1' }
            });

            // Two Column Grid
            blockManager.add('grid-two-columns', {
                label: '2 Columns',
                category: 'Basic',
                content: '<div class="grid-2_md-2_sm-1_xs-1"><div class="col"></div><div class="col"></div></div>',
                attributes: { class: 'gjs-fonts gjs-f-b2' }
            });

            // Three Column Grid
            blockManager.add('grid-three-columns', {
                label: '3 Columns',
                category: 'Basic',
                content: '<div class="grid-3_md-2_xs-1"><div class="col"></div><div class="col"></div><div class="col"></div></div>',
                attributes: { class: 'gjs-fonts gjs-f-b3' }
            });

            // Two Column 4/8 Grid
            blockManager.add('grid-four-eight-columns', {
                label: '2 Columns 4/8',
                category: 'Basic',
                content: '<div class="grid"><div class="col-4_xs-12"></div><div class="col-8_xs-12"></div></div>',
                attributes: { class: 'gjs-fonts gjs-f-b37' }
            });

            // Heading One
            blockManager.add('heading-one-text', {
                label: 'Heading 1',
                category: 'Basic',
                content: '<h1>Lorem Ipsum</h1>',
                attributes: { class: 'fa fa-header' }
            });

            // Heading Two
            blockManager.add('heading-two-text', {
                label: 'Heading 2',
                category: 'Basic',
                content: '<h2>Lorem Ipsum</h2>',
                attributes: { class: 'fa fa-header' }
            });

            // Heading
            blockManager.add('heading-three-text', {
                label: 'Heading 3',
                category: 'Basic',
                content: '<h3>Lorem Ipsum</h3>',
                attributes: { class: 'fa fa-header' }
            });

            // Heading Four
            blockManager.add('heading-four-text', {
                label: 'Heading 4',
                category: 'Basic',
                content: '<h4>Lorem Ipsum</h4>',
                attributes: { class: 'fa fa-header' }
            });

            // Heading Five
            blockManager.add('heading-five-text', {
                label: 'Heading 5',
                category: 'Basic',
                content: '<h5>Lorem Ipsum</h5>',
                attributes: { class: 'fa fa-header' }
            });

            // Heading Six
            blockManager.add('heading-six-text', {
                label: 'Heading 6',
                category: 'Basic',
                content: '<h6>Lorem Ipsum</h6>',
                attributes: { class: 'fa fa-header' }
            });

            // Paragraph
            blockManager.add('paragraph-text', {
                label: 'Paragraph',
                category: 'Basic',
                content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis purus mi, a lacinia nunc semper auctor. Nullam id dictum lacus. Sed dignissim eu sem in semper. Nullam viverra, est rhoncus lobortis tristique, mi erat fermentum mauris, ac laoreet mi magna sit amet nibh. Vestibulum vulputate nibh urna, eget vestibulum dolor faucibus quis. Quisque consequat risus sed consectetur iaculis. Cras non dapibus lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam vulputate aliquet justo at lacinia. Praesent pharetra varius velit. Nam eleifend consequat elit sit amet condimentum.</p>',
                attributes: { class: 'fa fa-paragraph' }
            });

            // Span Text
            blockManager.add('span-text', {
                label: 'Text',
                category: 'Basic',
                content: '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem rutrum lacus cursus viverra imperdiet id risus. Nulla massa mauris, venenatis eget hendrerit a.</span>',
                attributes: { class: 'gjs-fonts gjs-f-text' }
            });

            // Block Quote Text
            blockManager.add('quote-text', {
                label: 'Quote',
                category: 'Basic',
                content: '<blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem rutrum lacus cursus viverra imperdiet id risus. Nulla massa mauris, venenatis eget hendrerit a.</blockquote>',
                attributes: { class: 'fa fa-quote-right' }
            });

            // Link
            blockManager.add('link', {
                label: 'Link',
                category: 'Basic',
                content: '<a>Lorem ipsum</a>',
                attributes: { class: 'fa fa-link' }
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
                content: '<video></video>',
                attributes: { class: 'fa fa-youtube-play' }
            });

            // Form
            blockManager.add('form', {
                label: 'Form',
                category: 'Forms',
                content: '<form><input type="hidden" name="name"> <input type="hidden" name="actions"> <input type="hidden" name="emailto"><div class="form-dropzone"></div></form>',
                attributes: { class: '' } // NO ICON
            });

            // Input
            blockManager.add('input-form-field', {
                label: 'Input Field',
                category: 'Forms',
                content: '<label>Lorem Ipsum</label><input class="input" />',
                attributes: { class: '' } // NO ICON
            });

            // Select
            blockManager.add('select-form-field', {
                label: 'Select Field',
                category: 'Forms',
                content: '<label>Lorem Ipsum</label><select class="select"><option>Lorem Ipsum</optyion></select>',
                attributes: { class: '' } // NO ICON
            });

            // Checkbox
            blockManager.add('checkbox-form-field', {
                label: 'Checkbox',
                category: 'Forms',
                content: '<label><input type="checkbox" /> <span>Lorem Ipsum</span></label>',
                attributes: { class: 'fa fa-check-square' }
            });

            // Radio Button
            blockManager.add('radio-button-form-field', {
                label: 'Radio Button',
                category: 'Forms',
                content: '<label><input type="radio" /> <span>Lorem Ipsum</span></label>',
                attributes: { class: 'fa fa-dot-circle-o' } // NO ICON
            });

            // Button
            blockManager.add('button', {
                label: 'Button',
                category: 'Forms',
                content: '<button>Lorem Ipsum</button>',
                attributes: { class: '' } // NO ICON
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
                });
            }
        }
    });


    /*
     *   Events
     */

    // editor.on('block:drag:stop', function(model) {
    //     // block:drag:start
    //     // block:drag:move
    //     // block:drag:stop
    // });

});