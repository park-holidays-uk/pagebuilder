var options = {
    container: '#gjs',
    fromElement: true,
    showOffsets: true,
    height: '100%',

    plugins: [
        'preset-webpage',
        'components',
        'blocks',
        // 'assets',
    ],

    pluginsOpts: {
        'preset-webpage': {
            record: _serverData.record,
            user: _serverData.user,
            storageManager: _serverData.storageManager
        },

        'components': {
            record: _serverData.record,
            forms: _serverData.forms
        },

        'blocks': {
            url_prefix: _serverData.url_prefix
        },

        'assets': {
            assetManager: _serverData.assetManager
        }
    },

    canvas: {
        styles: _canvas.styles,
        scripts: _canvas.scripts
    },

    storageManager: {
        type: 'remote',
        autosave: false,
        autoload: true,
        stepsBeforeSave: 1,
        storeComponents: true,
        urlStore: _serverData.storageManager.urlStore,
        urlLoad: _serverData.storageManager.urlLoad,
        params: {
            name: _serverData.record.name
        },
        contentTypeJson: true
    },

    assetManager: {
        modalTitle: 'Asset Manager',
        autoAdd: 0,
        noAssets: 'There are currently no available assets',
        upload: 0,
        dropzone: 0,
        dropzoneContent: ''
    }
};

// Remove styling options for non Super Users
if (!_serverData.user.isSuperUser) {
    options.styleManager = {
        sectors: [{
            name: 'Decoration',
            buildProps: ['background']
        }]
    };
}


// Initialise
var editor = grapesjs.init(options);