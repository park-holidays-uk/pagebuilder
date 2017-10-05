/*export default*/
grapesjs.plugins.add('assets', (editor, options) => {

    var opt = options || {};
    var stylePrefix = editor.getConfig().stylePrefix;
    var assetManager = editor.AssetManager;

    var loadAssets = function() {
        $('.gjs-block-categories .gjs-block-category').css('display', 'none');
        $.ajax({
            url: '/ajax/get/assets',
        }).done(function(_data) {
            var _assets = JSON.parse(_data);

            _.forEach(_assets, function(_asset) {
                assetManager.add({
                    label: _asset.alternate_text,
                    src: _asset.path,
                });
            });
        });
    };

    /*
     *   EVENTS
     */
    editor.on('load', function() {
        loadAssets();
    });
});