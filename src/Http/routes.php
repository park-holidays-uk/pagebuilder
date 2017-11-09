<?php

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::group(['domain' => config('pagebuilder.domain')], function() {
        /*
        *   HTTP Routes
        */

        Route::group(['prefix' => config('pagebuilder.url_prefix')], function() {
            Route::get('/page/{id}', array('as' => 'pagebuilder.editor.pages', 'uses' => 'PageBuilderController@editPage'))
            ;//->middleware('can:ACL_PHAST_PARKHOLIDAYS_PAGES');

            Route::get('/{type}/{id}', array('as' => 'pagebuilder.editor.blocks', 'uses' => 'PageBuilderController@editBlock'))
            ->where('type', 'block|layout');//->middleware('can:ACL_PHAST_PAGEBUILDER_COMPONENTS,ACL_PHAST_PAGEBUILDER_LAYOUTS');
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

            /** BLOCKS **/
            Route::get('/blocks', array('as' => 'pagebuilder.ajax.get.blocks', 'uses' => 'PageBuilderController@getBlocks'));
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