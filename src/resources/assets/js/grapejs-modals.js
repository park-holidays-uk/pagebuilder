/*export default*/
grapesjs.plugins.add('modals', (editor, options) => {

    var opt = options || {};
    var config = editor.getConfig();

    /** DOM WRAPPER **/
    var domComponents = editor.DomComponents;

    /** BASE MODAL **/
    var modal = editor.Modal;
    var model = modal.getModel();

    /**  **/
    var isPageMode = (opt.mode == 'page');
    var isCanvasEmpty;

    /** CUSTOM MODALS **/
    var layoutModal = new Modal(modal, 'LayoutModal', 'Select a layout');

    layoutModal.call(function() {

        $.ajax({
            url: '/ajax/get/layouts',
        }).done(function(_data) {
            var _layouts = JSON.parse(_data);
            var container = document.createElement('div');
            container.classList = 'gjs-blocks-c gjs-clickable-blocks';

            _.forEach(_layouts, function(_block) {
                var block = document.createElement('div');
                var label = document.createElement('div');

                label.classList = 'gjs-block-label';
                label.innerHTML = _block.label;
                block.classList = 'gjs-block';
                block.appendChild(label);

                block.addEventListener('click', function() {
                    editor.setComponents(_block.content);
                    editor.UndoManager.clear();
                    modal.close();
                });

                container.appendChild(block);
            });

            layoutModal.setContent(container);
        });

    });

    /*
     *   COMMANDS
     */
    var commands = editor.Commands;

    commands.add('open-layouts-modal', {
        run: function(editor) {
            layoutModal.show();
        }
    });

    /*
     *   EVENTS
     */
    editor.on('load', function() {
        isCanvasEmpty = (domComponents.getComponents().length == 0);

        if (isPageMode && isCanvasEmpty) {
            editor.runCommand('open-layouts-modal');
        }
    });

    /** MODAL OPEN/CLOSE **/
    model.on('change:open', function(model) {
        isCanvasEmpty = (domComponents.getComponents().length == 0);

        switch (model.name) {
            case layoutModal.name:
                // Is Modal Closed
                if (!model.attributes.open) {
                    if (isCanvasEmpty) {
                        editor.runCommand('open-layouts-modal');
                    }
                }
                break;
        }
    });


});

/*
 *   MODAL CLASS 
 */
class Modal {
    constructor(_modal, _name, _title, _content = null) {
        this.modal = _modal;

        this.name = _name;
        this.title = _title;
        this.content = _content;

        this.items = [];
    }

    call(callback) {
        callback();
    }

    setContent(_value) {
        this.content = _value;

        if (this.modal.isOpen()) {
            this.modal.setContent(_value);
        }
    }

    show() {
        this.modal.getModel().name = this.name;
        this.modal.setTitle(this.title);
        this.modal.setContent(this.content);
        this.modal.open();
    }
};