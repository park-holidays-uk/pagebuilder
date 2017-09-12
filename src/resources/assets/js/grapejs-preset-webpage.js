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
    // config.showDevices = 0;

    /**  **/
    var isPageMode = (isPageMode);

    /** IMPORTER **/
    var codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    var container = document.createElement('div');
    var importBtn = document.createElement('button');

    // Init import button
    importBtn.innerHTML = 'Import';
    importBtn.className = stylePrefix + 'btn-prim ' + stylePrefix + 'btn-import';
    importBtn.onclick = function() {
        var code = codeViewer.editor.getValue();
        editor.DomComponents.getWrapper().set('content', '');
        editor.setComponents(code.trim());
        modal.close();
    };

    /*
     *   COMMANDS
     */
    var commands = editor.Commands;

    /** CLEAR CANVAS **/
    commands.add('empty-canvas', {
        run: function(editor, sender) {
            sender && sender.set('active', false);
            if (confirm('Are you sure to empty the canvas?')) {
                var comps = editor.DomComponents.clear();
                editor.runCommand('open-layouts-modal');
            }
        }
    });

    /** DEVICES **/
    commands.add('set-device-desktop', {
        run: function(editor) {
            editor.setDevice('Desktop');
        }
    });

    commands.add('set-device-tablet', {
        run: function(editor) {
            editor.setDevice('Tablet');
        }
    });

    commands.add('set-device-mobile', {
        run: function(editor) {
            editor.setDevice('Mobile portrait');
        }
    });

    /** SAVE / STORE **/
    commands.add('save', {
        run: function(editor, sender) {
            sender.set('active', 0);
            editor.store();
        }
    });

    /** IMPORT **/
    if (!isPageMode) {
        commands.add('html-import', {
            run: function(editor, sender) {
                sender && sender.set('active', 0);

                var modalContent = modal.getContentEl();
                var viewer = codeViewer.editor;
                modal.setTitle('Import Code');

                // Init code viewer if not yet instantiated
                if (!viewer) {
                    var txtarea = document.createElement('textarea');
                    var labelEl = document.createElement('div');
                    labelEl.className = stylePrefix + 'import-label';
                    labelEl.innerHTML = 'Paste here your HTML/CSS and click Import';
                    container.appendChild(labelEl);
                    container.appendChild(txtarea);
                    container.appendChild(importBtn);
                    codeViewer.init(txtarea);
                    viewer = codeViewer.editor;
                }

                modal.setContent('');
                modal.setContent(container);
                // codeViewer.setContent('');
                modal.open();
                viewer.refresh();
            }
        });
    }

    /** UNDO / REDO **/
    commands.add('undo', {
        run: function(editor, sender) {
            sender.set('active', 0);
            editor.UndoManager.undo(1);
        }
    });

    commands.add('redo', {
        run: function(editor, sender) {
            sender.set('active', 0);
            editor.UndoManager.redo(1);
        }
    });

    /*
     *   PANELS
     */
    var panels = editor.Panels;
    panels.addPanel({ id: 'options' });

    /*
     *   BUTTONS
     */
    panels.addButton('options', [{
            id: 'preview',
            className: 'fa fa-eye',
            command: 'preview',
            attributes: { title: 'Preview' }
        },
        {
            id: 'save',
            className: 'fa fa-floppy-o',
            command: 'save',
            attributes: { title: 'Save (CTRL/CMD + S)' }
        },
        {
            id: 'import',
            className: 'fa fa-download',
            command: 'html-import',
            attributes: { title: 'Import' },
            disabled: (!isPageMode)
        },
        {
            id: 'undo',
            className: 'fa fa-undo icon-undo',
            command: 'undo',
            attributes: { title: 'Undo (CTRL/CMD + Z)' }
        },
        {
            id: 'redo',
            className: 'fa fa-repeat icon-redo',
            command: 'redo',
            attributes: { title: 'Redo (CTRL/CMD + SHIFT + Z)' }
        },
        {
            id: 'empty-canvas',
            className: 'fa fa-trash',
            command: 'empty-canvas',
            attributes: { title: 'Empty Canvas' }
        },
    ]);

    /*
     *   DEVICES
     */
    var panelDevices = panels.addPanel({ id: 'devices-c' });
    var deviceBtns = panelDevices.get('buttons');

    deviceBtns.add([{
            id: 'deviceDesktop',
            command: 'set-device-desktop',
            className: 'fa fa-desktop',
            attributes: { 'title': 'Desktop' },
            active: 1,
        },
        {
            id: 'deviceTablet',
            command: 'set-device-tablet',
            className: 'fa fa-tablet',
            attributes: { 'title': 'Tablet' },
        },
        {
            id: 'deviceMobile',
            command: 'set-device-mobile',
            className: 'fa fa-mobile',
            attributes: { 'title': 'Mobile' },
        }
    ]);

    /*
     *   EVENTS
     */

    editor.on('load', function() {
        editor.runCommand('sw-visibility');

        if (isPageMode) {
            $('.gjs-pn-buttons [title="Import"]').css('display', 'none');
            wrapper.attributes.droppable = false;
            wrapper.attributes.stylable = false;
        }

        // console.log('Components', editor.getComponents());
        // console.log('Wrapper', wrapper);
        // console.log('Editor', editor);
        // console.log('Options', editor.Panels.getPanel('options'));

        // console.log('Panels', editor.Panels.getPanels());
    });

});