/*export default*/
grapesjs.plugins.add('blocks', (editor, options) => {

    var opt = options || {};
    var config = editor.getConfig();
    var blockManager = editor.BlockManager;

    $.ajax({
        url: '/ajax/getblocks',
    }).done(function(_data) {
        var _blocks = JSON.parse(_data);
        console.log(_blocks);

        _.forEach(_blocks, function(_block) {
            blockManager.add(_block.block_id, {
                label: _block.label,
                category: _block.category,
                content: _block.content,
                attributes: _block.attributes,
            });
        });
    });

    //     blockManager.add('layout-one', {
    //         label: '1 Column',
    //         category: "Layouts",
    //         content: {
    //             content: atob('PGRpdiBjbGFzcz0iZ3JpZCI+DQogICAgPGRpdiBjbGFzcz0iY29sLTEyIj4NCiAgICANCiAgICA8L2Rpdj4NCjwvZGl2Pg=='),
    //             stylable: false,
    //             copyable: false,
    //             removable: false, // Once inserted it can't be removed
    //         },
    //         attributes: {
    //             class: "gjs-fonts gjs-f-b1"
    //         },
    //     });

    //     blockManager.add('layout-two', {
    //         label: '2 Columns 6/6',
    //         category: "Layouts",
    //         content: {
    //             content: atob('PGRpdiBjbGFzcz0iZ3JpZCI+DQogICAgPGRpdiBjbGFzcz0iY29sLTYiPg0KICAgIA0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImNvbC02Ij4NCiAgICANCiAgICA8L2Rpdj4NCjwvZGl2Pg=='),
    //             stylable: false,
    //             copyable: false,
    //             removable: false,
    //         },
    //         attributes: {
    //             class: "gjs-fonts gjs-f-b2"
    //         },
    //     });

    //     blockManager.add('layout-three', {
    //         label: '2 Columns 8/4',
    //         category: "Layouts",
    //         content: {
    //             content: atob('PGRpdiBjbGFzcz0iZ3JpZCI+DQogICAgPGRpdiBjbGFzcz0iY29sLTgiPg0KICAgIA0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImNvbC00Ij4NCiAgICANCiAgICA8L2Rpdj4NCjwvZGl2Pg=='),
    //             stylable: false,
    //             copyable: false,
    //             removable: false, // Once inserted it can't be removed
    //         },
    //         attributes: {
    //             class: "gjs-fonts gjs-f-b37"
    //         },
    //     });
});