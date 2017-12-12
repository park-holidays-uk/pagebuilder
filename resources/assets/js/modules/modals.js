/*export default*/
export default grapesjs.plugins.add('modals', (editor, options) => {

    var opt = options || {};
    var config = editor.getConfig();

    /** MANAGERS **/
    var commands = editor.Commands;
    var assetManager = editor.AssetManager;

    /** DOM WRAPPER **/
    var domComponents = editor.DomComponents;

    /** BASE MODAL **/
    var modal = editor.Modal;
    var model = modal.getModel();

    /** CUSTOM VARIABLES **/
    var amClassName = 'gjs-asset-manager';

    /** CUSTOM MODALS **/
    var aboutModal = new Modal(modal, 'AboutModal', 'About');
    var iconSelectorModal = new Modal(modal, 'IconSelectorModal', 'Select an Icon');

    // About Modal Callback Function
    aboutModal.call(function() {
        var container = $('<div class="about-content"></div>');
        var table = $('<table style="width: 100%;"></table>');
        table.append('<tr><td>Name</td><td style="text-align: right;">' + opt.app_info.name + '</tr>');
        table.append('<tr><td>Version</td><td style="text-align: right;">' + opt.app_info.version + '</tr>');
        table.append('<tr><td>Released</td><td style="text-align: right;">' + opt.app_info.release.date + ' at ' + opt.app_info.release.time + '</tr>');

        container.append(table);
        container.append('<div style="margin-top: 16px;"><label>Description</label><p style="margin: 5px 0 0;">' + opt.app_info.description + '</p></div>');
        aboutModal.setContent(container);
    });

    // Icon Selector Callback Function
    iconSelectorModal.call(function() {
        $.ajax({
            type: 'GET',
            url: options.url_prefix + '/ajax/get/icon-selection',
        }).done(function(_data) {
            var icons = JSON.parse(_data);

            var container = $('<div class="gjs-icon-selection gjs-blocks-c gjs-clickable-blocks"></div>');
            container.html('');

            _.forEach(icons, function(icon) {
                var block = $('<div class="gjs-block gjs-four-color-h"></div>');
                block.addClass(icon.class);

                var label = $('<div class="gjs-block-label"></div>');
                label.html(icon.label);

                block.append(label);

                block.on('click', function() {
                    var sel = editor.getSelected();

                    var currentClass = _.find(sel.get('classes').models, function(c) {
                        console.log('find', c.id);
                        return _.startsWith(c.id, 'icon-');
                    });

                    if (currentClass) {
                        editor.runCommand('remove-class', { component: sel, classes: [currentClass.id] });
                        editor.runCommand('add-class', { component: sel, classes: [icon.class] });
                    }

                    modal.close();
                });

                container.append(block);
            });

            iconSelectorModal.setContent(container);
        });
    });

    /*
     *   COMMANDS
     */

    commands.add('am-load-assets', {
        run: function(editor, sender, formData) {
            $.ajax({
                type: 'POST',
                url: options.url_prefix + '/ajax/get/assets',
                data: formData
            }).done(function(_data) {
                var data = JSON.parse(_data);
                var assets = assetManager.getAll().models;

                for (var i = assets.length - 1; i >= 0; i--) {
                    if (assets[i]) {
                        assetManager.remove(assets[i].get('src'));
                    }
                }

                _.forEach(data.assets, function(a) {
                    assetManager.add({
                        label: a.alternate_text,
                        src: a.path,
                    });
                });

                /* Repopulate filter options */
                // Required for paging
                $('#gjs-am-filter-types').val(data.types);
                $('#gjs-am-filter-tags').val(data.tags);
                $('#gjs-am-filter-parks').val(data.parks);
                $('#gjs-am-search-criteria').val(data.criteria);

                $('#gjs-am-filter-types').trigger("change");
                $('#gjs-am-filter-tags').trigger("change");
                $('#gjs-am-filter-parks').trigger("change");

                /* Pagination */
                $('#gjs-am-pager').html('');

                var pagination = $('<ul class="gjs-am-pagination"></ul>');
                if (data.page_count > 0) {
                    pagination.append('<li class="' + (formData.page == 1 ? 'active' : '') + '"><a class="' + (formData.page != 1 ? 'gjs-am-page-link' : '') + '">1</a></li>');
                }

                var prevOffset = (formData.page - 3);
                var nextOffset = (formData.page + 3);

                var gt2 = (prevOffset > 2);
                var ltpc1 = (nextOffset < data.page_count - 1);

                var first = gt2 ? prevOffset : 2;
                var last = ltpc1 ? nextOffset : (data.page_count - 2) > first ? (data.page_count - 2) : (data.page_count - 1);

                if (gt2) { pagination.append('<li><a>...</a></li>'); }

                if (data.page_count > 2) {
                    for (i = first; i <= last; i++) {
                        pagination.append('<li class="' + (formData.page == i ? 'active' : '') + '"><a class="' + (formData.page != i ? 'gjs-am-page-link' : '') + '">' + i + '</a></li>');
                    }
                }

                if (ltpc1) { pagination.append('<li><a>...</a></li>'); }
                if (data.page_count > 1) {
                    pagination.append('<li class="' + (formData.page == data.page_count ? 'active' : '') + '"><a class="' + (formData.page != data.page_count ? 'gjs-am-page-link' : '') + '">' + data.page_count + '</a></li>');
                }

                pagination.find('.gjs-am-page-link').on('click', function() {
                    var page = JSON.parse($(this).text());
                    var types = $('#gjs-am-filter-types').val();
                    var tags = $('#gjs-am-filter-tags').val();
                    var parks = $('#gjs-am-filter-parks').val();
                    var criteria = $('#gjs-am-search-criteria').val();

                    editor.runCommand('am-load-assets', {
                        page: page,
                        criteria: criteria,
                        types: types,
                        tags: tags,
                        parks: parks
                    });
                });

                $('#gjs-am-pager').html(pagination);
            });
        }
    });

    commands.add('open-about', {
        run: function(editor, sender) {
            sender.set('active', 0);
            aboutModal.show();
        }
    });

    commands.add('open-icon-selector', {
        run: function(editor, sender) {
            // sender.set('active', 0);
            iconSelectorModal.show();
        }
    });

    /*
     *   EVENTS
     */

    /** MODAL OPEN/CLOSE **/
    model.on('change:open', function(model) {
        var dialogModal = $('.gjs-mdl-dialog');
        var content = model.get('content');

        if (content) {
            switch (content.className) {
                case amClassName:
                    $('.' + amClassName).html('');

                    $.ajax({
                        type: 'POST',
                        url: options.assetManager.path
                    }).done(function(data) {
                        $('.' + amClassName).html(data);
                        $('#gjs-am-search-btn').on('click', function() {
                            var types = $('#gjs-am-filter-types').val();
                            var tags = $('#gjs-am-filter-tags').val();
                            var parks = $('#gjs-am-filter-parks').val();
                            var criteria = $('#gjs-am-search-criteria').val();

                            editor.runCommand('am-load-assets', {
                                page: 1,
                                criteria: criteria,
                                types: types,
                                tags: tags,
                                parks: parks
                            });
                        });
                        editor.runCommand('am-load-assets', { page: 1 });
                    });
                    break;
            }
        }

        switch (model.name) {
            case aboutModal.name:
                // Is Modal Open
                if (model.attributes.open) {
                    if (!dialogModal.hasClass('about-modal') && dialogModal.find('.about-content').length > 0) {
                        dialogModal.addClass('about-modal');
                    }
                } else {
                    dialogModal.removeClass('about-modal');
                }
                break;

            case iconSelectorModal.name:
                // Is Modal Open
                if (model.attributes.open) {
                    if (!dialogModal.hasClass('gjs-icon-selection')) {
                        dialogModal.addClass('gjs-icon-selection');
                    }
                } else {
                    dialogModal.removeClass('gjs-icon-selection');
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