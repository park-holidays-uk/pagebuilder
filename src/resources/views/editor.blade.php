<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="description" content="Page Builder">
    <meta name="author" content="Mark Bailey">

    <title>Editor | Page Builder</title>
    <link rel="stylesheet" href="{{ asset('parkholidays/pagebuilder/css/grapes.css') }}" />
    <style type="text/css"> 
        html, body {
            padding: 0;
            margin: 0;
            
            width: 100vw;
            height: 100vh;
            
            overflow: hidden;
        }
        
        * { box-sizing: border-box; }

        #pbApp {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>

    <div id="pbApp">
        <div id="gjs"></div>
    </div>

    <!-- Vendor Scripts -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/vue"></script>
    <!-- LOCAL -->
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/vendor/lodash.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapes.min.js') }}"></script>
    
    <!-- Custom Scripts -->
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapejs-preset-webpage.js') }}"></script>
    <script type="text/javascript" src="{{ asset('parkholidays/pagebuilder/js/grapejs-blocks.js') }}"></script>
    <script type="text/javascript"> 
        var editor = grapesjs.init({
            container : '#gjs',
            fromElement: true,
            showOffsets: true,
            height: '100%',
            
            plugins: [
                'preset-webpage',
                'blocks'
            ],
            
            pluginsOpts: {
                'preset-webpage': {
                    customField: 'customValue'
                }
            },
            
            components: '{!! $viewModel->components !!}',
            // style: '.txt-red{color: red}',
            
            storageManager: {
                type: 'remote',
                autosave: false,
            },

            panels: {
                defaults: []
            }
        });

        $(function() {
            var _iframe = $('iframe.gjs-frame');
            _iframe.ready(function(){
                _iframe.contents().find('head').append('<link rel="stylesheet" href="http://www.parkholidays.dev/build/css/parkholidays/critical.css">');
                _iframe.contents().find('head').append('<link rel="stylesheet" href="http://www.parkholidays.dev/build/css/parkholidays/non_critical.css">');
                _iframe.contents().find('head').append('<link rel="stylesheet" href="https://i.icomoon.io/public/342e837bbb/ParkHolidays/style.css">');
                _iframe.contents().find('head').append('<link rel="stylesheet" href="{{ asset("parkholidays/pagebuilder/css/components.css") }}">');
            });
        });
    </script>
</body>
</html>