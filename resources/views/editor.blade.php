<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="app_name" content="{{ \Config('pagebuilder.app_name') }}" />
    <meta name="version" content="{{ \Config('pagebuilder.version') }}" />
    <meta name="description" content="{{ \Config('pagebuilder.description') }}" />
    <meta name="author" content="Mark Bailey" />

    <title>{{ $viewModel->record->name }} | Edit {{ ucfirst($viewModel->record->type) }} | Page Builder</title>
    <link rel="stylesheet" href="{{ asset('parkholidays/pagebuilder/css/app.css') }}" />
</head>

<body>

    <div id="pbApp">
        <div id="gjs"></div>
        <!-- The actual snackbar -->
        <div id="snackbar">...</div>
    </div>
    
    <!-- Custom Scripts -->
    <script type="text/javascript"> 
        var _serverData = {
                url_prefix: "{{ config('pagebuilder.url_prefix') }}",
                app_info: {
                    name: "{{ \Config('pagebuilder.app_name') }}",
                    version: "{{ \Config('pagebuilder.version') }}",
                    release: {
                        date: "{{ \Config('pagebuilder.release_date') }}",
                        time: "{{ \Config('pagebuilder.release_time') }}"
                    },
                    description: "{{ \Config('pagebuilder.description') }}",
                },
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
                    @foreach($viewModel->ph_assets as $asset)
                        @if(substr($asset, -4) == '.css')
                        '{{ $asset }}',
                        @endif
                    @endforeach
                    'https://i.icomoon.io/public/342e837bbb/ParkHolidays/style.css',
                    // Page Builder Stylesheets
                    '{{ asset("parkholidays/pagebuilder/css/canvas.css") }}'
                ],
                scripts: [
                    // Park Holidays Scripts
                    @foreach($viewModel->ph_assets as $asset)
                        @if(substr($asset, -3) == '.js')
                        '{{ $asset }}',
                        @endif
                    @endforeach
                ]
            };
    </script>

    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/app.js') }}"></script>
</body>
</html>