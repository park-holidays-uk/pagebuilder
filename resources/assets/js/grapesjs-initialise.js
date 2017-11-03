var editor = grapesjs.init({
    container: '#gjs',
    // autorender: 0,
    fromElement: true,
    showOffsets: true,
    height: '100%',

    plugins: [
        'preset-webpage',
        'modals',
        'blocks',
        'assets',
        'traits',
        // 'components'
    ],

    pluginsOpts: {
        'preset-webpage': {
            record: _serverData.record,
            user: _serverData.user,
            storageManager: _serverData.storageManager
        },

        'modals': {
            record: _serverData.record
        },

        'blocks': {
            record: _serverData.record
        },

        'traits': {
            record: _serverData.record,
            forms: _serverData.forms
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
        urlLoad: _serverData.storageManager.urlLoad
    },

    styleManager: {
        sectors: [{
            name: 'Extra',
            buildProps: ['background']
        }]
    },

    assetManager: {
        modalTitle: 'Asset Manager',
        autoAdd: 0,
        noAssets: 'There are currently no available assets',
        upload: 0,
        dropzone: 0,
        dropzoneContent: ''
    },

    panels: {
        defaults: []
    }
});