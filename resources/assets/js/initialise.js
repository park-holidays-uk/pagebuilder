var options = {
    container: '#gjs',
    fromElement: true,
    forceClass: false,
    showOffsets: true,
    height: '100%',

    plugins: [
        'preset-webpage',
        'traits',
        'components',
        'blocks',
        'modals',
    ],

    pluginsOpts: {
        'preset-webpage': {
            record: _serverData.record,
            user: _serverData.user,
            storageManager: _serverData.storageManager
        },

        'components': {
            url_prefix: _serverData.url_prefix,
            record: _serverData.record,
            user: _serverData.user,
            forms: _serverData.forms,
            mediaPath: _serverData.mediaPath
        },

        'blocks': {
            url_prefix: _serverData.url_prefix
        },

        'modals': {
            url_prefix: _serverData.url_prefix,
            assetManager: _serverData.assetManager,
            app_info: _serverData.app_info
        },
    },

    canvas: {
        styles: _canvas.styles,
        scripts: _canvas.scripts
    },

    storageManager: {
        type: 'remote',
        autoload: false,
        autosave: false,
        stepsBeforeSave: 1,
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

// Initialise
window.firstRun = true;
var editor = grapesjs.init(options);
editor.load();