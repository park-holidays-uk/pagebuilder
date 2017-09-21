/*export default*/
grapesjs.plugins.add('blocks', (editor, options) => {

    var opt = options || {};
    var config = editor.getConfig();
    var blockManager = editor.BlockManager;
    var panels = editor.Panels;
    /** DOM WRAPPER **/
    var domComponents = editor.DomComponents;
    var wrapper = domComponents.getWrapper();

    /** MODALS **/
    var modal = editor.Modal;

    /**  **/
    var isPageMode = (opt.mode == 'page');

    /*
     *   Functions 
     */

    var loadBlocks = function(_includeUserDefined = true) {
        $('.gjs-block-categories .gjs-block-category').css('display', 'none');
        $.ajax({
            url: '/ajax/get/blocks/' + _includeUserDefined,
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
        if (isPageMode) {
            loadBlocks();
        } else {
            loadBlocks(false);
        }
    });

    editor.on('block:drag:start', function() {
        // block:drag:start
        // block:drag:move
        // block:drag:stop
    });

    editor.on('block:drag:stop', function(model) {
        // block:drag:start
        // block:drag:move
        // block:drag:stop
        editor.runCommand('fix-stylable-attribute', { node: model });
    });

});