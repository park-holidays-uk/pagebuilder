/*export default*/
grapesjs.plugins.add('modals', (editor, options) => {

    /*
     *   VARIABLES 
     */

    /** DOM WRAPPER **/
    var domComponents = editor.DomComponents;

    /** BASE MODAL **/
    var modal = editor.Modal;
    var model = modal.getModel();

    /**  **/
    var isPageMode = (options.record.type == 'page');
    var isCanvasEmpty;

    /** CUSTOM MODALS **/
    var layoutModal = new Modal(modal, 'LayoutModal', 'Select a layout');

    layoutModal.call(function() {

        $.ajax({
            url: options.url_prefix + '/ajax/get/layouts',
        }).done(function(data) {
            var layouts = JSON.parse(data);
            var container = $('<div/>');
            container.addClass('gjs-blocks-c gjs-clickable-blocks');

            _.forEach(layouts, function(b) {
                var block = $('<div/>');
                var label = $('<div/>');

                label.addClass('gjs-block-label');
                label.html(b.label);
                block.addClass('gjs-block');
                block.append(label);

                block.on('click', function() {
                    editor.setComponents(b.content);
                    editor.UndoManager.clear();

                    modal.close();
                });

                container.append(block);
            });

            layoutModal.setContent(container[0]);
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