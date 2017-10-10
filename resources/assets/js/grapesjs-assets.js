/*export default*/
grapesjs.plugins.add('assets', (editor, options) => {

    var opt = options || {};
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

                console.log(data);
                console.log(assetManager);
                console.log(assets.length, 'assets..');

                var c = 0;
                for (i = assets.length - 1; i >= 0; i--) {
                    if (assets[i]) {
                        c++;
                        assetManager.remove(assets[i].get('src'));
                    }
                }

                console.log(c, 'assets removed..');

                _.forEach(data.assets, function(a) {
                    assetManager.add({
                        label: a.alternate_text,
                        src: a.path,
                    });
                });

                console.log(data.assets.length, 'assets added..');
                console.log(assetManager.getAll().models.length, 'assets in total..');


                $('#gjs-am-search-criteria').val(data.criteria);

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
                    var criteria = $('#gjs-am-search-criteria').val();
                    editor.runCommand('am-load-assets', { page: page, criteria: criteria });
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
                    $.ajax({
                        type: 'POST',
                        url: opt.asset_manager_path
                    }).done(function(data) {
                        $('.' + amClassName).html(data);
                        $('#gjs-am-search-btn').on('click', function() {
                            var criteria = $('#gjs-am-search-criteria').val();
                            editor.runCommand('am-load-assets', { page: 1, criteria: criteria });
                        });
                        editor.runCommand('am-load-assets', { page: 1 });
                    });
                    break;
            }
        }
    });
});