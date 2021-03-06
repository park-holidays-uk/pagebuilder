<?php

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::group(['domain' => config('pagebuilder.domain')], function() {
        /*
        *   HTTP Routes
        */

        Route::group(['prefix' => config('pagebuilder.url_prefix')], function() {
            Route::get('/page/{id}', array('as' => 'pagebuilder.editor.pages', 'uses' => 'PageBuilderController@editPage'))
            ;//->middleware('can:ACL_PHAST_PARKHOLIDAYS_PAGES');

            Route::get('/block/{id}', array('as' => 'pagebuilder.editor.blocks', 'uses' => 'PageBuilderController@editBlock'))
            ;//->middleware('can:ACL_PHAST_PAGEBUILDER_COMPONENTS');
        });
    });
});

/*
*   Asset Manager Routes
*/

Route::any(config('pagebuilder.asset_manager_path'), function() {
    $viewModel = new \StdClass;

    $viewModel->types = \DB::table('media_lookups')->select('media_lookup_type')->orderBy('media_lookup_type')->distinct()->get();
    $viewModel->tags = \DB::table('media_lookups')->select('media_lookup_tag')->orderBy('media_lookup_tag')->where('media_lookup_tag', 'not like','%PDF%')->where('media_lookup_tag', 'not like', '%Video%')->distinct()->get();
    $viewModel->parks = \DB::table('parks')->select('id', 'name')->orderBy('name')->get();

    return view('pagebuilder::partials.asset-manager', ['viewModel' => $viewModel]);
});

/*
*   Ajax Routers
*/

Route::group(['prefix' => config('pagebuilder.url_prefix')], function() {
    Route::group(['prefix' => '/ajax'], function() {
        /** GET **/
        Route::group(['prefix' => '/get'], function() {
            /** ASSETS **/
            Route::post('/assets', array('as' => 'pagebuilder.ajax.get.assets', 'uses' => 'PageBuilderController@getAssets'));

            /** ICON SELECTION **/
            Route::get('/icon-selection', array('as' => 'pagebuilder.ajax.get.icon.selection', 'uses' => 'PageBuilderController@getIconSelection'));            

            /** BLOCKS **/
            Route::get('/blocks', array('as' => 'pagebuilder.ajax.get.blocks', 'uses' => 'PageBuilderController@getBlocks'));

            /** Trait Select Options **/
            Route::post('/trait/options', array('as' => 'pagebuilder.ajax.get.trait.options', 'uses' => 'PageBuilderController@getTraitOptions'));

             /** Field Names **/
             Route::post('/field/names', array('as' => 'pagebuilder.ajax.get.field.names', 'uses' => 'PageBuilderController@getFieldNames'));
        });

        /** LOAD **/
        Route::group(['prefix' => '/load'], function() {
            Route::get('/{type}/{id}', array('as' => 'pagebuilder.ajax.load', 'uses' => 'PageBuilderController@load'))
            ->where('type', 'block|page');
        });

        /** STORE **/
        Route::group(['prefix' => '/store'], function() {
            Route::post('/{type}/{id}', array('as' => 'pagebuilder.ajax.store', 'uses' => 'PageBuilderController@store'))
            ->where('type', 'block|page');
        });
    });
});

// TEST ROUTES
// Route::get('/image-path-replace', function() {
//     $pages = \App\Models\Pages\Page::whereNotNull('html_base64')->get();
//     $c = 0;

//     foreach($pages as $page) {
//         //parkholidays.s3-website-eu-west-1.amazonaws.com
//         $html_base64 = base64_encode(preg_replace('/\b(parkholidays.s3-website-eu-west-1.amazonaws.com)\b/','d1q8m8tdjwh44.cloudfront.net', base64_decode($page->html_base64)));
        
//         if($page->html_base64 != $html_base64) {
//             $page->html_base64 = $html_base64;
//             $page->save();

//             $c += 1;
//         }
//     }

//     return $c . ' pages have been amended';
// });            