/*export default*/
export default grapesjs.plugins.add('preset-webpage', (editor, options) => {

    /*
     *   VARIABLES
     */

    var config = editor.getConfig();
    var stylePrefix = editor.getConfig().stylePrefix;

    // Managers
    var commands = editor.Commands;
    var panels = editor.Panels;
    var modal = editor.Modal;
    var domComponents = editor.DomComponents;
    var wrapper = domComponents.getWrapper();

    // Code Viewer
    var codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();

    // Hide Default Controls for Devices
    config.showDevices = 0;

    // Parameters
    var isPageMode = (options.record.type == 'page');

    // Elements
    var importBtn = $('<button/>');
    var container = $('<div/>');


    /*
     *   COMMANDS
     */

    /** Prevent Default Actions **/
    commands.add('prevent-default', {
        run: function(editor, sender) {
            var elements = [
                { tagName: 'a', events: ['click'] },
                { tagName: 'form', events: ['submit'] },
                { tagName: 'input[type="checkbox"]', events: ['click'] },
                { tagName: 'input[type="radio"]', events: ['click'] }
            ];

            var iframe = $(editor.Canvas.getFrameEl()).contents();

            elements.forEach(function(el) {
                el.events.forEach(function(e) {
                    iframe.find(el.tagName).off(e).on(e, function(event) {
                        event.preventDefault();
                        if (el.tagName == 'checkbox' || el.tagName == 'radio') {
                            $(this).prop('checked', !$(this).prop('checked'));
                        }
                    });
                });
            });
        }
    });

    /** Exit Application **/
    commands.add('exit-app', {
        run: function(editor, sender) {
            sender.set('active', 0);
            window.location = '/';
        }
    });

    /** Clear Canvas **/
    commands.add('empty-canvas', {
        run: function(editor, sender, options) {
            if (sender.cid) { sender && sender.set('active', false); }
            if (options.skipConfirm || confirm('Are you sure to empty the canvas?')) {
                var comps = editor.DomComponents.clear();
                editor.CssComposer.getAll().reset();
                editor.trigger('change:selectedComponent');
                editor.runCommand('open-snackbar', { message: 'The canvas has been cleared!' });
            }
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
    if (options.user.isSuperUser) {
        commands.add('html-import', {
            run: function(editor, sender) {
                sender && sender.set('active', 0);

                var modalContent = modal.getContentEl();
                var viewer = codeViewer.editor;
                modal.setTitle('Import Code');

                // Init code viewer if not yet instantiated
                if (!viewer) {
                    var txtarea = $('<textarea/>');
                    var labelEl = $('<div/>');

                    labelEl.addClass(stylePrefix + 'import-label');
                    labelEl.html('Paste here your HTML/CSS and click Import');

                    container.append(labelEl);
                    container.append(txtarea);
                    container.append(importBtn);

                    codeViewer.init(txtarea[0]);
                    viewer = codeViewer.editor;
                }

                modal.setContent('');
                modal.setContent(container[0]);
                codeViewer.setContent('');
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

    /* SNACKBAR */
    commands.add('open-snackbar', {
        run: function(editor, sender, options) {
            // Get the snackbar DIV
            var x = $("#snackbar");
            x.html(options.message);
            // Add the "show" class to DIV
            x.addClass("show");

            // After 3 seconds, remove the show class from DIV
            setTimeout(function() { x.removeClass("show"); }, 3000);
        }
    });


    /*
     *   PANELS
     */

    var defaultPanel = panels.addPanel({ id: 'default' });
    var panelDevices = panels.addPanel({ id: 'devices-c' });


    /*
     *   BUTTONS 
     */

    var deviceBtns = panelDevices.get('buttons');

    // Default Panel
    panels.addButton('default', [{
        id: 'about',
        className: 'fa fa-info',
        command: 'open-about',
        attributes: { title: 'About PageBuilder' }
    }]);

    // Options Panel
    panels.addButton('options', [{
            id: 'divider-1',
            className: 'gjs-pn-divider',
        },
        {
            id: 'undo',
            className: 'fa fa-undo', // icon-undo
            command: 'undo',
            attributes: { title: 'Undo' } //(CTRL/CMD + Z)
        },
        {
            id: 'redo',
            className: 'fa fa-repeat', // icon-redo
            command: 'redo',
            attributes: { title: 'Redo' } //  (CTRL/CMD + SHIFT + Z)
        }
    ]);

    if (options.user.isSuperUser) {
        panels.addButton('options', [{
            id: 'divider-2',
            className: 'gjs-pn-divider',
        }, {
            id: 'import',
            className: 'fa fa-download',
            command: 'html-import',
            attributes: { title: 'Import' }
        }]);
    }

    panels.addButton('options', [{
        id: 'save',
        className: 'fa fa-floppy-o',
        command: 'save',
        attributes: { title: 'Save' } //(CTRL/CMD + S)
    }, {
        id: 'empty-canvas',
        className: 'fa fa-trash',
        command: 'empty-canvas',
        attributes: { title: 'Empty Canvas' }
    }, {
        id: 'divider-3',
        className: 'gjs-pn-divider',
    }, {
        id: 'exit-app',
        className: 'fa fa-sign-out',
        command: 'exit-app',
        attributes: { title: 'Exit PageBuilder' }
    }]);

    // Devices
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
        if (isPageMode) {
            wrapper.set('stylable', []);
        }

        /* RESTRICTIONS - Disable Features for Non Super Users */
        if (options.user.isSuperUser) {
            // Init code viewer
            codeViewer.set({
                codeName: 'htmlmixed',
                theme: options.codeViewerTheme || 'hopscotch',
                readOnly: 0
            });

            // Init import button
            importBtn.html('Import');
            importBtn.addClass(stylePrefix + 'btn-prim ' + stylePrefix + 'btn-import');
            importBtn.on('click', function() {
                var code = codeViewer.editor.getValue();
                editor.runCommand('empty-canvas', { skipConfirm: true });
                editor.setComponents(code);

                modal.close();
            });
        } else {
            // Hide Buttons
            var hideButtons = [
                { name: 'options', buttons: ['import', 'export-template'] }
            ];

            hideButtons.forEach(function(p) {
                p.buttons.forEach(function(b) {
                    var btn = panels.getButton(p.name, b);

                    if (btn) {
                        var className = btn.get('className') + ' hidden';
                        btn.set('disabled', true);
                        btn.set('className', className);
                    }
                });
            });

            // Hide Styling Options
            var hideStyles = [
                '.gjs-clm-tags'
            ];

            hideStyles.forEach(function(s) {
                $('#gjs-pn-views-container ' + s).addClass('hidden');
            });
        }

        // IFrame
        var encMeta = $('<meta/>');
        encMeta.attr('charset', 'utf-8');
        $(editor.Canvas.getFrameEl()).contents().find('head').append(encMeta);

        var bmBtn = panels.getButton('views', 'open-blocks');
        bmBtn.set('active', true);

        // Run Commands
        editor.runCommand('load-blocks', { excludeUserBlocks: !isPageMode });
        editor.runCommand('prevent-default');

        editor.trigger('change:selectedComponent');
    });

    // Storage
    editor.on('storage:error', function(error) {
        console.log('storage:error', error);
        var message = error.toString();

        switch (message) {
            case 'the server responded with a status of 413 (Request Entity Too Large)':
                message = '<strong>Oh No!</strong> It looks like the page is too large, please reduce the amount of blocks used.';
                break;
            default:
                var regex = /\b(SyntaxError: Unexpected token (.*) in JSON at position 0)?\b/g;
                if (regex.test(message)) {
                    message = '<strong>Ut Oh!</strong> There seems to be something wrong with the server response.';
                }
                break;
        }

        editor.runCommand('open-dialog', { title: 'Error', type: 'error', message: message });
    });

    editor.on('storage:end', function(response) {
        if (typeof response != 'undefined') {
            response = JSON.parse(response);

            if (response.message && (!response.exception || response.status != 200)) {
                editor.runCommand('open-snackbar', { message: response.message });
            } else if ((response.exception || response.status != 200) && !response['gjs-html']) {
                console.log('storage:end', response);
            }
        }

        if (window.firstRun) {
            editor.UndoManager.clear();
            delete window.firstRun;
        }
    });

    // Toolbar events
    // editor.on('run:tlb-clone', () => {});
});