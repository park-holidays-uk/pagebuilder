<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="description" content="Page Builder" />
    <meta name="author" content="Mark Bailey" />

    <title>{{ $viewModel->record->name }} | Edit {{ ucfirst($viewModel->record->type) }} | Page Builder</title>
    <link rel="stylesheet" href="{{ asset('parkholidays/pagebuilder/css/grapes.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('parkholidays/pagebuilder/css/styles.css') }}" />
</head>

<body>

    <div id="pbApp">
        <div id="gjs"></div>
        <!-- The actual snackbar -->
        <div id="snackbar">...</div>
    </div>

    <!-- Vendor Scripts -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    
    <!-- LOCAL -->
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/lodash.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapes.min.js') }}"></script>
    
    <!-- Custom Scripts -->
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-preset-webpage.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-components.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-blocks.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-assets.js') }}"></script>

    <script type="text/javascript"> 
        var _serverData = {
                url_prefix: "{{ config('pagebuilder.url_prefix') }}",
                record: {
                    id: {{ $viewModel->record->id }},
                    type: '{{ $viewModel->record->type }}',
                    name: '{{ $viewModel->record->name }}'
                },
                user: {
                    isSuperUser: {{ $viewModel->isSuperUser ? $viewModel->isSuperUser : 0 }}
                },
                forms: {
                    action: '{{ config("pagebuilder.form_action") }}',
                    method: '{{ config("pagebuilder.form_method") }}'
                },
                assetManager: {
                    path: '{{ config("pagebuilder.asset_manager_path") }}',
                    assetPath: '{{ config("pagebuilder.asset_path") }}',
                },
                storageManager: {
                    urlLoad: '{{ $viewModel->url_load }}',
                    urlStore: '{{ $viewModel->url_store }}'
                }
            };
        
        var _canvas = {
                styles: [
                    // Park Holidays Stylesheets
                    _serverData.assetManager.assetPath + 'css/parkholidays/critical.css',
                    _serverData.assetManager.assetPath + 'css/parkholidays/non_critical.css',
                    _serverData.assetManager.assetPath + 'css/phast/dynamicblocks.css',
                    'https://i.icomoon.io/public/342e837bbb/ParkHolidays/style.css',
                    // Page Builder Stylesheets
                    '{{ asset("parkholidays/pagebuilder/css/components.css") }}'
                ],
                scripts: []
            };
    </script>

    
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapesjs-initialise.js') }}"></script>
</body>
</html>