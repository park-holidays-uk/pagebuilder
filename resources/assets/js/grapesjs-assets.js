/*export default*/
grapesjs.plugins.add('assets', (editor, options) => {

    /*
     *   VARIABLES
     */

    var stylePrefix = editor.getConfig().stylePrefix;
    var assetManager = editor.AssetManager;
    var commands = editor.Commands;

    /** BASE MODAL **/
    var modal = editor.Modal;
    var model = modal.getModel();

    var amClassName = 'gjs-asset-manager';

    /*
     *   COMMANDS
     */

    commands.add('am-load-assets', {
        run: function(editor, sender, formData) {
            $.ajax({
                type: 'POST',
                url: '/ajax/get/assets',
                data: formData
            }).done(function(_data) {
                var data = JSON.parse(_data);
                var assets = assetManager.getAll().models;

                for (i = assets.length - 1; i >= 0; i--) {
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

    /*
     *   EVENTS
     */

    /** MODAL OPEN/CLOSE **/
    model.on('change:open', function(model) {
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
    });
});