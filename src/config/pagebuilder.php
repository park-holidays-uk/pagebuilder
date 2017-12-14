<?php

return [
    /** Domain Restriction **/
    'domain' => env('PAGEBUILDER_DOMAIN', ''), 
    'url_prefix' => env('PAGEBUILDER_URLPREFIX', '/editor'), 

    /** Asset Manager **/
    'items_per_page' => env('PAGEBUILDER_AM_ITEMSPERPAGE', 100),
    'asset_manager_path' => env('PAGEBUILDER_AM_PATH', '/ajax/asset-manager'), /* Do Not Change This */

    /* For integration to PHAST */
    /* Media */
    'media_path' => env('PAGEBUILDER_MEDIA_PATH', '/images/'), 
    /* Resize Media */
    'resize_media_path' => env('PAGEBUILDER_RESIZE_MEDIA_PATH', '/images/{w}x{h}'), 
    /* Assets - CSS etc. */
    'asset_path' => env('PAGEBUILDER_ASSET_PATH', '/dist/'), 

    /** Forms **/
    'form_action' => env('PAGEBUILDER_FORM_ACTION', '/'), 
    'form_method' => env('PAGEBUILDER_FORM_METHOD', 'POST'), 
];