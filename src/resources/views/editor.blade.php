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
    </div>

    <!-- Vendor Scripts -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- <script type="text/javascript" src="https://unpkg.com/vue"></script> -->
    <!-- LOCAL -->
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/vendor/lodash.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapes.min.js') }}"></script>
    
    <!-- Custom Scripts -->
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapejs-preset-webpage.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapejs-modals.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapejs-blocks.js') }}"></script>
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
                'blocks'
            ],
            
            pluginsOpts: {
                'preset-webpage': {
                    mode: '{{ $viewModel->mode }}'
                },
                
                'modals': {
                    mode: '{{ $viewModel->mode }}'
                },

                'blocks': {
                    mode: '{{ $viewModel->mode }}'
                }
            },

            canvas: {
                styles: [
                    // Park Holidays Stylesheets
                    'http://www.parkholidays.dev/build/css/parkholidays/critical.css',
                    'http://www.parkholidays.dev/build/css/parkholidays/non_critical.css',
                    'https://i.icomoon.io/public/342e837bbb/ParkHolidays/style.css',
                    // Page Builder Stylesheets
                    '{{ asset("parkholidays/pagebuilder/css/components.css") }}'
                ]
            },
            
            // components: '',
            // style: '.txt-red{color: red}',
            
            storageManager: {
                type: 'remote',
                autosave: false,
                autoload: true,
                stepsBeforeSave: 1,
                storeComponents: true, 
                urlStore: '{{ $viewModel->url_store }}',
                urlLoad: '{{ $viewModel->url_load }}'
            },

            // assetManager: {
            //     upload: 0,
            //     dropzone: 0
            // },

            panels: {
                defaults: []
            }
        });
    </script>
</body>
</html>