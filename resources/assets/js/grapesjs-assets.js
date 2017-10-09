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
                _.forEach(assetManager.getAll().models, function(_asset) {
                    if (_asset) {
                        assetManager.remove(_asset.get('src'));
                    }
                });

                _.forEach(data.assets, function(_asset) {
                    assetManager.add({
                        label: _asset.alternate_text,
                        src: _asset.path,
                    });
                });

                /* Pagination */
                $('#gjs-am-pager').html('');

                var pagination = $('<ul class="gjs-am-pagination"></ul>');
                pagination.append('<li class="' + (formData.page == 1 ? 'active' : '') + '"><a class="' + (formData.page != 1 ? 'gjs-am-page-link' : '') + '">1</a></li>');

                var prevOffset = (formData.page - 3);
                var nextOffset = (formData.page + 3);

                var gt2 = (prevOffset > 2);
                var ltpc1 = (nextOffset < data.page_count - 1);

                var first = gt2 ? prevOffset : 2;
                var last = ltpc1 ? nextOffset : data.page_count - 2;

                if (gt2) { pagination.append('<li><a>...</a></li>'); }

                for (i = first; i <= last; i++) {
                    pagination.append('<li class="' + (formData.page == i ? 'active' : '') + '"><a class="' + (formData.page != i ? 'gjs-am-page-link' : '') + '">' + i + '</a></li>');
                }

                if (ltpc1) { pagination.append('<li><a>...</a></li>'); }
                pagination.append('<li class="' + (formData.page == data.page_count ? 'active' : '') + '"><a class="' + (formData.page != data.page_count ? 'gjs-am-page-link' : '') + '">' + data.page_count + '</a></li>');

                pagination.find('.gjs-am-page-link').on('click', function() {
                    var page = JSON.parse($(this).text());
                    editor.runCommand('am-load-assets', { page: page });
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
                        editor.runCommand('am-load-assets', { page: 1 });
                    });
                    break;
            }
        }
    });
});