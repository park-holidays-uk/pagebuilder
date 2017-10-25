<?php

return [
    /** Domain Restriction **/
    'domain' => env('PAGEBUILDER_DOMAIN', ''), 
    'url_prefix' => env('PAGEBUILDER_URLPREFIX', '/editor'), 

    /** Asset Manager **/
    'items_per_page' => env('PAGEBUILDER_AM_ITEMSPERPAGE', 100),
    'asset_manager_path' => env('PAGEBUILDER_AM_PATH', '/ajax/asset-manager'),

    /** Media Asset Path **/
    /* For integration to PHAST */
    'asset_path' => env('PAGEBUILDER_ASSET_PATH', '/images/'), 
    
];