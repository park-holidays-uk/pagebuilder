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

            $.ajax({
                url: opt.url_prefix + '/ajax/get/blocks/' + options.excludeUserBlocks,
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