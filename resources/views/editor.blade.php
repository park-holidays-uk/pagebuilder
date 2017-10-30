<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="description" content="Page Builder">
    <meta name="author" content="Mark Bailey">

    <title>Editor | Page Builder</title>
    <link rel="stylesheet" href="{{ asset('parkholidays/pagebuilder/css/grapes.css') }}" />
    <link rel="stylesheet" href="{{ asset('parkholidays/pagebuilder/css/styles.css') }}" />
</head>

<body>

    <div id="pbApp">
        <div id="gjs"></div>
        <!-- The actual snackbar -->
        <div id="snackbar">Some text some message..</div>
    </div>

    <!-- Vendor Scripts -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    
    <!-- LOCAL -->
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/lodash.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapes.min.js') }}"></script>
    
    <!-- Custom Scripts -->
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-preset-webpage.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-modals.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-blocks.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-traits.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-assets.js') }}"></script>

    <script type="text/javascript"> 
        var editor = grapesjs.init({
            container : '#gjs',
            // autorender: 0,
            fromElement: true,
            showOffsets: true,
            height: '100%',
            
            plugins: [
                'preset-webpage',
                'modals',
                'blocks',
                'assets',
                'traits'
            ],
            
            pluginsOpts: {
                'preset-webpage': {
                    id: {{ $viewModel->id }},
                    mode: '{{ $viewModel->mode }}',
                    storeUrl: '{{ $viewModel->url_store }}'
                },
                
                'modals': {
                    mode: '{{ $viewModel->mode }}'
                },

                'blocks': {
                    mode: '{{ $viewModel->mode }}'
                },

                'traits': {
                    mode: '{{ $viewModel->mode }}',
                    form_action: '{{ config("pagebuilder.form_action") }}',
                    form_method: '{{ config("pagebuilder.form_method") }}'
                },

                'assets': {
                    asset_manager_path: '{{ config("pagebuilder.asset_manager_path") }}'
                }
            },

            canvas: {
                styles: [
                    // Park Holidays Stylesheets
                    '{{ config("pagebuilder.asset_path") }}css/parkholidays/critical.css',
                    '{{ config("pagebuilder.asset_path") }}css/parkholidays/non_critical.css',
                    'https://i.icomoon.io/public/342e837bbb/ParkHolidays/style.css',
                    // Page Builder Stylesheets
                    '{{ asset("parkholidays/pagebuilder/css/components.css") }}'
                ]
            },
            
            storageManager: {
                type: 'remote',
                autosave: false,
                autoload: true,
                stepsBeforeSave: 1,
                storeComponents: true, 
                urlStore: '{{ $viewModel->url_store }}',
                urlLoad: '{{ $viewModel->url_load }}'
            },

            styleManager: {
                sectors: [
                    {
                        name: 'Extra',
                        buildProps: ['background']
                    }
                ]
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
    </script>
</body>
</html>