/*export default*/
grapesjs.plugins.add('preset-webpage', (editor, options) => {

    var opt = options || {};
    var config = editor.getConfig();
    var pfx = editor.getConfig().stylePrefix;
    var modal = editor.Modal;

    config.showDevices = 0;

    /** DOM Wrapper **/
    var domComponents = editor.DomComponents;
    var wrapper = domComponents.getWrapper();
    // wrapper.set('attributes', { 'data-gjs-droppable': '.column' });

    /** IMPORTER **/
    var codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    var container = document.createElement('div');
    var btnImp = document.createElement('button');

    // Init import button
    btnImp.innerHTML = 'Import';
    btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btnImp.onclick = function() {
        var code = codeViewer.editor.getValue();
        editor.DomComponents.getWrapper().set('content', '');
        editor.setComponents(code.trim());
        modal.close();
    };

    /** COMMANDS **/
    var cmdm = editor.Commands;

    cmdm.add('set-device-desktop', {
        run: function(editor) {
            editor.setDevice('Desktop');
        }
    });
    cmdm.add('set-device-tablet', {
        run: function(editor) {
            editor.setDevice('Tablet');
        }
    });
    cmdm.add('set-device-mobile', {
        run: function(editor) {
            editor.setDevice('Mobile portrait');
        }
    });

    cmdm.add('undo', {
        run: function(editor, sender) {
            sender.set('active', 0);
            editor.UndoManager.undo(1);
        }
    });

    cmdm.add('redo', {
        run: function(editor, sender) {
            sender.set('active', 0);
            editor.UndoManager.redo(1);
        }
    });

    cmdm.add('html-import', {
        run: function(editor, sender) {
            sender && sender.set('active', 0);

            var modalContent = modal.getContentEl();
            var viewer = codeViewer.editor;
            modal.setTitle('Import Template');

            // Init code viewer if not yet instantiated
            if (!viewer) {
                var txtarea = document.createElement('textarea');
                var labelEl = document.createElement('div');
                labelEl.className = pfx + 'import-label';
                labelEl.innerHTML = 'Paste here your HTML/CSS and click Import';
                container.appendChild(labelEl);
                container.appendChild(txtarea);
                container.appendChild(btnImp);
                codeViewer.init(txtarea);
                viewer = codeViewer.editor;
            }

            modal.setContent('');
            modal.setContent(container);
            codeViewer.setContent(
                '<div class="txt-red">Hello world!</div>' +
                '<style>\n.txt-red {color: red;padding: 30px\n}</style>'
            );
            modal.open();
            viewer.refresh();
        }
    });

    // Init code viewer
    codeViewer.set({
        codeName: 'htmlmixed',
        theme: opt.codeViewerTheme || 'hopscotch',
        readOnly: 0
    });

    /** Buttons **/
    var pnm = editor.Panels;
    pnm.addPanel({ id: 'options' });

    pnm.addButton('options', [{
            id: 'sw-visibility',
            className: 'fa fa-square-o',
            command: 'sw-visibility',
            attributes: { title: 'View Components' },
            active: true
        },
        {
            id: 'preview',
            className: 'fa fa-eye',
            command: 'preview',
            attributes: { title: 'Preview' }
        },
        {
            id: 'fullscreen',
            className: 'fa fa-arrows-alt',
            command: 'fullscreen',
            attributes: { title: 'Fullscreen' }
        },
        {
            id: 'export-template',
            className: 'fa fa-code',
            command: 'export-template',
            attributes: { title: 'View code' }
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
            id: 'import',
            className: 'fa fa-download',
            command: 'html-import',
            attributes: { title: 'Import' }
        }
    ]);

    /** Device Buttons **/
    var panelDevices = pnm.addPanel({ id: 'devices-c' });
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

    /** Views  */
    pnm.addPanel({ id: 'views' });
    pnm.addPanel({ id: 'views-container' });
    // cmdm.get('open-blocks');

    pnm.addButton('views', [{
            id: 'open-layers',
            className: 'fa fa-bars',
            command: 'open-layers',
            attributes: { title: 'Open Layer Manager' },
            active: false,
        },
        {
            id: 'open-blocks',
            className: 'fa fa-th-large',
            command: 'open-blocks',
            attributes: { title: 'Open Blocks' },
            active: true,
        }
    ]);

    console.log(pnm);
});