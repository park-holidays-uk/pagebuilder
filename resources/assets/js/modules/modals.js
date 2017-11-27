/*export default*/
grapesjs.plugins.add('modals', (editor, options) => {

    var opt = options || {};
    var config = editor.getConfig();

    /** DOM WRAPPER **/
    var domComponents = editor.DomComponents;

    /** BASE MODAL **/
    var modal = editor.Modal;
    var model = modal.getModel();

    /** CUSTOM MODALS **/
    var aboutModal = new Modal(modal, 'AboutModal', 'About');

    aboutModal.call(function() {

        var container = $('<div class="about-content"></div>');
        var table = $('<table style="width: 100%;"></table>');
        table.append('<tr><td>Name</td><td style="text-align: right;">' + opt.app_info.name + '</tr>');
        table.append('<tr><td>Version</td><td style="text-align: right;">' + opt.app_info.version + '</tr>');
        table.append('<tr><td>Released</td><td style="text-align: right;">' + opt.app_info.release.date + ' at ' + opt.app_info.release.time + '</tr>');
        // for (var key in opt.app_info) {
        //     if (opt.app_info.hasOwnProperty(key)) {
        //         table.append('<tr><td>' + key + '</td><td>' + opt.app_info[key] + '</tr>');
        //     }
        // }

        container.append(table);
        container.append('<div style="margin-top: 16px;"><label>Description</label><p style="margin: 5px 0 0;">' + opt.app_info.description + '</p></div>');
        aboutModal.setContent(container);

    });

    /*
     *   COMMANDS
     */
    var commands = editor.Commands;

    commands.add('open-about-modal', {
        run: function(editor, sender) {
            sender.set('active', 0);
            aboutModal.show();
        }
    });

    /*
     *   EVENTS
     */

    /** MODAL OPEN/CLOSE **/
    model.on('change:open', function(model) {
        switch (model.name) {
            case aboutModal.name:
                var dialogModal = $('.gjs-mdl-dialog');
                if (!dialogModal.hasClass('about-modal') && dialogModal.find('.about-content').length > 0) {
                    dialogModal.addClass('about-modal');
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