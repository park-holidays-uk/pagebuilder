/*export default*/
grapesjs.plugins.add('attribute-editor', (editor, options) => {

    var opt = options || {};
    var stylePrefix = editor.getConfig().stylePrefix;

    /**  **/
    var isPageMode = (opt.mode == 'page');

    /*
     *   BUTTONS 
     */

    // Init import button
    updateBtn.innerHTML = 'Update';
    updateBtn.className = stylePrefix + 'btn-prim ' + stylePrefix + 'btn-update';
    updateBtn.onclick = function() {
        var component = editor.getSelected();

        $('.gjs-editor').removeClass('gjs-pn-attributes-shown');
    };


    /*
     *    PANELS
     */

    var panels = editor.Panels;
    panels.addPanel({ id: 'attributes' });

    /*
     *   EVENTS
     */

    editor.on('change:selectedComponent', function() {
        var component = editor.getSelected();
        console.log('Selected', component);

        if (!component.attributes.wrapper) {
            if (!isPageMode) {
                $('.gjs-editor').addClass('gjs-pn-attributes-shown');

            }
        } else {
            if (!isPageMode) {
                $('.gjs-editor').removeClass('gjs-pn-attributes-shown');
            }
        }

        editor.refresh();
    });

});