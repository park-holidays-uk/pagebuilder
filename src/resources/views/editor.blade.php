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
    <script type="text/javascript"> 
        var editor = grapesjs.init({
            container : '#gjs',
            // fromElement: true,
            showOffsets: true,
            height: '100%',
            
            plugins: [
                'additional-options'  
            ],
            
//                pluginsOpts: {
//                    'my-plugin-name': {
//                      customField: 'customValue'
//                    }
//                },
            
            components: atob('PCEtLSBCb290c3RyYXAgY29yZSBDU1MgLS0+DQo8bGluayBocmVmPSJodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcyIgcmVsPSJzdHlsZXNoZWV0Ij4NCg0KPCEtLSBDdXN0b20gc3R5bGVzIGZvciB0aGlzIHRlbXBsYXRlIC0tPg0KPGxpbmsgaHJlZj0iY3NzL3RlbXBsYXRlLmNzcyIgcmVsPSJzdHlsZXNoZWV0Ij4NCg0KPHNlY3Rpb24gY2xhc3M9Imp1bWJvdHJvbiB0ZXh0LWNlbnRlciI+DQogIDxkaXYgY2xhc3M9ImNvbnRhaW5lciI+DQogICAgPGgxIGNsYXNzPSJqdW1ib3Ryb24taGVhZGluZyI+QWxidW0gZXhhbXBsZTwvaDE+DQogICAgPHAgY2xhc3M9ImxlYWQgdGV4dC1tdXRlZCI+U29tZXRoaW5nIHNob3J0IGFuZCBsZWFkaW5nIGFib3V0IHRoZSBjb2xsZWN0aW9uIGJlbG934oCUaXRzIGNvbnRlbnRzLCB0aGUgY3JlYXRvciwgZXRjLiBNYWtlIGl0IHNob3J0IGFuZCBzd2VldCwgYnV0IG5vdCB0b28gc2hvcnQgc28gZm9sa3MgZG9uJ3Qgc2ltcGx5IHNraXAgb3ZlciBpdCBlbnRpcmVseS48L3A+DQogICAgPHA+DQogICAgICA8YSBocmVmPSIjIiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5Ij5NYWluIGNhbGwgdG8gYWN0aW9uPC9hPg0KICAgICAgPGEgaHJlZj0iIyIgY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5Ij5TZWNvbmRhcnkgYWN0aW9uPC9hPg0KICAgIDwvcD4NCiAgPC9kaXY+DQo8L3NlY3Rpb24+DQoNCjxkaXYgY2xhc3M9ImFsYnVtIHRleHQtbXV0ZWQiPg0KICA8ZGl2IGNsYXNzPSJjb250YWluZXIiPg0KDQogICAgPGRpdiBjbGFzcz0icm93Ij4NCiAgICAgIDxkaXYgY2xhc3M9ImNhcmQiPg0KICAgICAgICA8aW1nIGRhdGEtc3JjPSJob2xkZXIuanMvMTAwcHgyODAvdGh1bWIiIGFsdD0iQ2FyZCBpbWFnZSBjYXAiPg0KICAgICAgICA8cCBjbGFzcz0iY2FyZC10ZXh0Ij5UaGlzIGlzIGEgd2lkZXIgY2FyZCB3aXRoIHN1cHBvcnRpbmcgdGV4dCBiZWxvdyBhcyBhIG5hdHVyYWwgbGVhZC1pbiB0byBhZGRpdGlvbmFsIGNvbnRlbnQuIFRoaXMgY29udGVudCBpcyBhIGxpdHRsZSBiaXQgbG9uZ2VyLjwvcD4NCiAgICAgIDwvZGl2Pg0KICAgICAgPGRpdiBjbGFzcz0iY2FyZCI+DQogICAgICAgIDxpbWcgZGF0YS1zcmM9ImhvbGRlci5qcy8xMDBweDI4MC90aHVtYiIgYWx0PSJDYXJkIGltYWdlIGNhcCI+DQogICAgICAgIDxwIGNsYXNzPSJjYXJkLXRleHQiPlRoaXMgaXMgYSB3aWRlciBjYXJkIHdpdGggc3VwcG9ydGluZyB0ZXh0IGJlbG93IGFzIGEgbmF0dXJhbCBsZWFkLWluIHRvIGFkZGl0aW9uYWwgY29udGVudC4gVGhpcyBjb250ZW50IGlzIGEgbGl0dGxlIGJpdCBsb25nZXIuPC9wPg0KICAgICAgPC9kaXY+DQogICAgICA8ZGl2IGNsYXNzPSJjYXJkIj4NCiAgICAgICAgPGltZyBkYXRhLXNyYz0iaG9sZGVyLmpzLzEwMHB4MjgwL3RodW1iIiBhbHQ9IkNhcmQgaW1hZ2UgY2FwIj4NCiAgICAgICAgPHAgY2xhc3M9ImNhcmQtdGV4dCI+VGhpcyBpcyBhIHdpZGVyIGNhcmQgd2l0aCBzdXBwb3J0aW5nIHRleHQgYmVsb3cgYXMgYSBuYXR1cmFsIGxlYWQtaW4gdG8gYWRkaXRpb25hbCBjb250ZW50LiBUaGlzIGNvbnRlbnQgaXMgYSBsaXR0bGUgYml0IGxvbmdlci48L3A+DQogICAgICA8L2Rpdj4NCg0KICAgICAgPGRpdiBjbGFzcz0iY2FyZCI+DQogICAgICAgIDxpbWcgZGF0YS1zcmM9ImhvbGRlci5qcy8xMDBweDI4MC90aHVtYiIgYWx0PSJDYXJkIGltYWdlIGNhcCI+DQogICAgICAgIDxwIGNsYXNzPSJjYXJkLXRleHQiPlRoaXMgaXMgYSB3aWRlciBjYXJkIHdpdGggc3VwcG9ydGluZyB0ZXh0IGJlbG93IGFzIGEgbmF0dXJhbCBsZWFkLWluIHRvIGFkZGl0aW9uYWwgY29udGVudC4gVGhpcyBjb250ZW50IGlzIGEgbGl0dGxlIGJpdCBsb25nZXIuPC9wPg0KICAgICAgPC9kaXY+DQogICAgICA8ZGl2IGNsYXNzPSJjYXJkIj4NCiAgICAgICAgPGltZyBkYXRhLXNyYz0iaG9sZGVyLmpzLzEwMHB4MjgwL3RodW1iIiBhbHQ9IkNhcmQgaW1hZ2UgY2FwIj4NCiAgICAgICAgPHAgY2xhc3M9ImNhcmQtdGV4dCI+VGhpcyBpcyBhIHdpZGVyIGNhcmQgd2l0aCBzdXBwb3J0aW5nIHRleHQgYmVsb3cgYXMgYSBuYXR1cmFsIGxlYWQtaW4gdG8gYWRkaXRpb25hbCBjb250ZW50LiBUaGlzIGNvbnRlbnQgaXMgYSBsaXR0bGUgYml0IGxvbmdlci48L3A+DQogICAgICA8L2Rpdj4NCiAgICAgIDxkaXYgY2xhc3M9ImNhcmQiPg0KICAgICAgICA8aW1nIGRhdGEtc3JjPSJob2xkZXIuanMvMTAwcHgyODAvdGh1bWIiIGFsdD0iQ2FyZCBpbWFnZSBjYXAiPg0KICAgICAgICA8cCBjbGFzcz0iY2FyZC10ZXh0Ij5UaGlzIGlzIGEgd2lkZXIgY2FyZCB3aXRoIHN1cHBvcnRpbmcgdGV4dCBiZWxvdyBhcyBhIG5hdHVyYWwgbGVhZC1pbiB0byBhZGRpdGlvbmFsIGNvbnRlbnQuIFRoaXMgY29udGVudCBpcyBhIGxpdHRsZSBiaXQgbG9uZ2VyLjwvcD4NCiAgICAgIDwvZGl2Pg0KDQogICAgICA8ZGl2IGNsYXNzPSJjYXJkIj4NCiAgICAgICAgPGltZyBkYXRhLXNyYz0iaG9sZGVyLmpzLzEwMHB4MjgwL3RodW1iIiBhbHQ9IkNhcmQgaW1hZ2UgY2FwIj4NCiAgICAgICAgPHAgY2xhc3M9ImNhcmQtdGV4dCI+VGhpcyBpcyBhIHdpZGVyIGNhcmQgd2l0aCBzdXBwb3J0aW5nIHRleHQgYmVsb3cgYXMgYSBuYXR1cmFsIGxlYWQtaW4gdG8gYWRkaXRpb25hbCBjb250ZW50LiBUaGlzIGNvbnRlbnQgaXMgYSBsaXR0bGUgYml0IGxvbmdlci48L3A+DQogICAgICA8L2Rpdj4NCiAgICAgIDxkaXYgY2xhc3M9ImNhcmQiPg0KICAgICAgICA8aW1nIGRhdGEtc3JjPSJob2xkZXIuanMvMTAwcHgyODAvdGh1bWIiIGFsdD0iQ2FyZCBpbWFnZSBjYXAiPg0KICAgICAgICA8cCBjbGFzcz0iY2FyZC10ZXh0Ij5UaGlzIGlzIGEgd2lkZXIgY2FyZCB3aXRoIHN1cHBvcnRpbmcgdGV4dCBiZWxvdyBhcyBhIG5hdHVyYWwgbGVhZC1pbiB0byBhZGRpdGlvbmFsIGNvbnRlbnQuIFRoaXMgY29udGVudCBpcyBhIGxpdHRsZSBiaXQgbG9uZ2VyLjwvcD4NCiAgICAgIDwvZGl2Pg0KICAgICAgPGRpdiBjbGFzcz0iY2FyZCI+DQogICAgICAgIDxpbWcgZGF0YS1zcmM9ImhvbGRlci5qcy8xMDBweDI4MC90aHVtYiIgYWx0PSJDYXJkIGltYWdlIGNhcCI+DQogICAgICAgIDxwIGNsYXNzPSJjYXJkLXRleHQiPlRoaXMgaXMgYSB3aWRlciBjYXJkIHdpdGggc3VwcG9ydGluZyB0ZXh0IGJlbG93IGFzIGEgbmF0dXJhbCBsZWFkLWluIHRvIGFkZGl0aW9uYWwgY29udGVudC4gVGhpcyBjb250ZW50IGlzIGEgbGl0dGxlIGJpdCBsb25nZXIuPC9wPg0KICAgICAgPC9kaXY+DQogICAgPC9kaXY+DQoNCiAgPC9kaXY+DQo8L2Rpdj4NCg0KPCEtLSBCb290c3RyYXAgY29yZSBKYXZhU2NyaXB0DQo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAtLT4NCjwhLS0gUGxhY2VkIGF0IHRoZSBlbmQgb2YgdGhlIGRvY3VtZW50IHNvIHRoZSBwYWdlcyBsb2FkIGZhc3RlciAtLT4NCjxzY3JpcHQgc3JjPSJodHRwczovL2NvZGUuanF1ZXJ5LmNvbS9qcXVlcnktMy4yLjEuc2xpbS5taW4uanMiIGludGVncml0eT0ic2hhMzg0LUtKM28yREt0SWt2WUlLM1VFTnptTTdLQ2tSci9yRTkvUXBnNmFBWkdKd0ZETVZOQS9HcEdGRjkzaFhwRzVLa04iIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiPjwvc2NyaXB0Pg0KPHNjcmlwdD53aW5kb3cualF1ZXJ5IHx8IGRvY3VtZW50LndyaXRlKCc8c2NyaXB0IHNyYz0iaHR0cDovL2dldGJvb3RzdHJhcC5jb20vYXNzZXRzL2pzL3ZlbmRvci9qcXVlcnkubWluLmpzIj48XC9zY3JpcHQ+Jyk8L3NjcmlwdD4NCjxzY3JpcHQgc3JjPSJodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9hc3NldHMvanMvdmVuZG9yL3BvcHBlci5taW4uanMiPjwvc2NyaXB0Pg0KPHNjcmlwdCBzcmM9Imh0dHA6Ly9nZXRib290c3RyYXAuY29tL2Fzc2V0cy9qcy92ZW5kb3IvaG9sZGVyLm1pbi5qcyI+PC9zY3JpcHQ+DQo8c2NyaXB0Pg0KICAkKGZ1bmN0aW9uICgpIHsNCiAgICBIb2xkZXIuYWRkVGhlbWUoInRodW1iIiwgeyBiYWNrZ3JvdW5kOiAiIzU1NTk1YyIsIGZvcmVncm91bmQ6ICIjZWNlZWVmIiwgdGV4dDogIlRodW1ibmFpbCIgfSk7DQogIH0pOw0KPC9zY3JpcHQ+DQo8c2NyaXB0IHNyYz0iaHR0cDovL2dldGJvb3RzdHJhcC5jb20vZGlzdC9qcy9ib290c3RyYXAubWluLmpzIj48L3NjcmlwdD4NCjwhLS0gSUUxMCB2aWV3cG9ydCBoYWNrIGZvciBTdXJmYWNlL2Rlc2t0b3AgV2luZG93cyA4IGJ1ZyAtLT4NCjxzY3JpcHQgc3JjPSJodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9hc3NldHMvanMvaWUxMC12aWV3cG9ydC1idWctd29ya2Fyb3VuZC5qcyI+PC9zY3JpcHQ+DQogICAgICA='),
            // style: '.txt-red{color: red}',
            
            storageManager: {
                type: 'remote',
                autosave: false,
            },

            styleManager: {}
        });
    </script>
</body>
</html>