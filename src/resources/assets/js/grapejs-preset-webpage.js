/*export default*/
grapesjs.plugins.add('preset-webpage', (editor, options) => {

    /*
     *   VARIABLES
     */

    var opt = options || {};
    var config = editor.getConfig();
    var stylePrefix = editor.getConfig().stylePrefix;

    /** MANAGERS **/
    var assetManager = editor.AssetManager;
    // const amConfig = editor.AssetManager.getConfig();

    // amConfig.upload = 0;
    // amConfig.dropzone = 0;

    /** MODAL **/
    var modal = editor.Modal;

    /** DOM WRAPPER **/
    var domComponents = editor.DomComponents;
    var wrapper = domComponents.getWrapper();
    // wrapper.attributes.stylable = false;
    // config.showDevices = 0;




    /*
     *   EVENTS
     */

    editor.on('load', function() {
        console.log('Components', editor.getComponents());
        console.log('Wrapper', wrapper);
        console.log('Editor', editor);

        console.log('Panels', editor.Panels.getPanels());
    });

});