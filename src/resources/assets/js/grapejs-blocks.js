/*export default*/
grapesjs.plugins.add('blocks', (editor, options) => {

    var opt = options || {};
    var config = editor.getConfig();
    var blockManager = editor.BlockManager;
    /** DOM WRAPPER **/
    var domComponents = editor.DomComponents;
    var wrapper = domComponents.getWrapper();

    /*
     *   Functions 
     */

    var loadBlocks = function(_type = 'blocks', _userDefined = true) {
        _.forEach(blockManager.getAll().models, function(_block) {
            console.log(_block);
            blockManager.remove(_block);
        });

        console.log('Blocks', blockManager.getAll());

        $.ajax({
            url: '/ajax/get/' + _type + '/' + _userDefined,
        }).done(function(_data) {
            var _blocks = JSON.parse(_data);

            _.forEach(_blocks, function(_block) {
                blockManager.add(_block.block_id, {
                    label: _block.label,
                    category: _block.category,
                    content: _block.content,
                    attributes: JSON.parse(_block.attributes),
                });
            });
        });
    };

    /*
     *   Events
     */

    editor.on('load', function() {
        if (opt.mode == 'page') {
            if (editor.getComponents().length == 0) {
                loadBlocks('layouts');
            } else {
                loadBlocks();
            }
        } else {
            loadBlocks('blocks', false);
        }
    });

    editor.on('block:drag:stop', function(model) {
        if (opt.mode == 'page') {
            if (wrapper.attributes.droppable) {
                loadBlocks();
                wrapper.attributes.droppable = false;
                console.log('Wrapper', wrapper);
            }
        }
    });

    // blockManager.add('container', {
    //     label: 'Container',
    //     category: "Basic",
    //     content: atob('PGRpdiBjbGFzcz0iY29udGFpbmVyIiBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQ29udGFpbmVyIj48L2Rpdj4='),
    //     attributes: {
    //         class: "gjs-fonts gjs-f-b1 gjs-block"
    //     },
    // });

    // blockManager.add('container-fluid', {
    //     label: 'Fluid Container',
    //     category: "Basic",
    //     content: atob('PGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIiBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQ29udGFpbmVyIj48L2Rpdj4='),
    //     attributes: {
    //         class: "gjs-fonts gjs-f-b1 gjs-block"
    //     },
    // });

    // blockManager.add('image', {
    //     label: 'Image',
    //     category: "Basic",
    //     content: atob('PGltZyBzcmM9Imh0dHA6Ly9wbGFjZWhvbGQuaXQvNDUweDM1MD90ZXh0PUltYWdlK1BsYWNlaG9sZGVyIiBhbHQ9IiIgY2xhc3M9ImltZy1yZXNwb25zaXZlIgogICAgIGRhdGEtZ2pzLXN0eWxhYmxlPSJmYWxzZSIKICAgICBkYXRhLWdqcy1yZXNpemFibGU9ImZhbHNlIiAvPg=='),
    //     attributes: {
    //         class: "gjs-fonts gjs-f-image"
    //     },
    // });

    // blockManager.add('grid-three-column', {
    //     label: '3 Columns',
    //     category: "Grid",
    //     content: atob('PGRpdiBjbGFzcz0iZ3JpZC0zX21kLTJfeHMtMSIgCiAgICAgZGF0YS1nanMtY3VzdG9tLW5hbWU9IlJvdyIgCiAgICAgZGF0YS1nanMtZHJvcHBhYmxlPSIuY29sdW1uIgogICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSIKICAgICBkYXRhLWdqcy1zdHlsYWJsZT0iZmFsc2UiCj4KICAgPGRpdiBjbGFzcz0iY29sIiAKICAgICAgICBkYXRhLWdqcy1jdXN0b20tbmFtZT0iQ29sdW1uIiAKICAgICAgICBkYXRhLWdqcy1yZW1vdmFibGU9ImZhbHNlIgogICAgICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSIKICAgICAgICBkYXRhLWdqcy1kcmFnZ2FibGU9ImZhbHNlIgogICAgICAgIGRhdGEtZ2pzLXN0eWxhYmxlPSJmYWxzZSIKICAgPjwvZGl2PgogICA8ZGl2IGNsYXNzPSJjb2wiIAogICAgICAgIGRhdGEtZ2pzLWN1c3RvbS1uYW1lPSJDb2x1bW4iIAogICAgICAgIGRhdGEtZ2pzLXJlbW92YWJsZT0iZmFsc2UiCiAgICAgICAgZGF0YS1nanMtY29weWFibGU9ImZhbHNlIgogICAgICAgIGRhdGEtZ2pzLWRyYWdnYWJsZT0iZmFsc2UiCiAgICAgICAgZGF0YS1nanMtc3R5bGFibGU9ImZhbHNlIgogICA+PC9kaXY+CiAgIDxkaXYgY2xhc3M9ImNvbCIgCiAgICAgICAgZGF0YS1nanMtY3VzdG9tLW5hbWU9IkNvbHVtbiIgCiAgICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSIKICAgICAgICBkYXRhLWdqcy1jb3B5YWJsZT0iZmFsc2UiCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSIKICAgICAgICBkYXRhLWdqcy1zdHlsYWJsZT0iZmFsc2UiCiAgICA+PC9kaXY+CjwvZGl2Pg=='),
    //     // content: {
    //     //     content: atob('PGRpdiBjbGFzcz0iZ3JpZCIgCiAgICAgZGF0YS1nanMtY3VzdG9tLW5hbWU9IlJvdyIgCiAgICAgZGF0YS1nanMtZHJvcHBhYmxlPSIuY29sdW1uIgogICAgIGRhdGEtZ2pzLWNvcHlhYmxlPSJmYWxzZSIKPgogICA8ZGl2IGNsYXNzPSJjb2wtNCIgCiAgICAgICAgZGF0YS1nanMtY3VzdG9tLW5hbWU9IkNvbHVtbiIgCiAgICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSIKICAgICAgICBkYXRhLWdqcy1jb3B5YWJsZT0iZmFsc2UiCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSIKICAgPjwvZGl2PgogICA8ZGl2IGNsYXNzPSJjb2wtNCIgCiAgICAgICAgZGF0YS1nanMtY3VzdG9tLW5hbWU9IkNvbHVtbiIgCiAgICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSIKICAgICAgICBkYXRhLWdqcy1jb3B5YWJsZT0iZmFsc2UiCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSIKICAgPjwvZGl2PgogICA8ZGl2IGNsYXNzPSJjb2wtNCIgCiAgICAgICAgZGF0YS1nanMtY3VzdG9tLW5hbWU9IkNvbHVtbiIgCiAgICAgICAgZGF0YS1nanMtcmVtb3ZhYmxlPSJmYWxzZSIKICAgICAgICBkYXRhLWdqcy1jb3B5YWJsZT0iZmFsc2UiCiAgICAgICAgZGF0YS1nanMtZHJhZ2dhYmxlPSJmYWxzZSIKICAgID48L2Rpdj4KPC9kaXY+'),
    //     //     stylable: false,
    //     //     copyable: false,
    //     //     removable: false, // Once inserted it can't be removed
    //     // },
    //     attributes: {
    //         class: "gjs-fonts gjs-f-b3"
    //     },
    // });


});