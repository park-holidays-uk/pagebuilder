<?php

Route::group(['domain' => config('pagebuilder.domain')], function() {
    /*
    *   HTTP Routes
    */

    Route::group(['prefix' => '/editor'], function() {
        Route::get('/{type}/{id}', array('as' => 'pagebuilder.editor', 'uses' => 'PageBuilderController@editor'))
        ->where('type', 'block|layout|page');
    });

    /*
    *   Ajax Routers
    */

    Route::group(['prefix' => '/ajax'], function() {
        /** GET **/
        Route::group(['prefix' => '/get'], function() {
            /** ASSETS **/
            Route::get('/assets', array('as' => 'pagebuilder.ajax.get.assets', 'uses' => 'PageBuilderController@getAssets'));

            /** BLOCKS **/
            Route::get('/{type}/{includeUserDefined?}', array('as' => 'pagebuilder.ajax.get.blocks', 'uses' => 'PageBuilderController@getBlocks'))
            ->where('type', 'blocks|layouts');
        });

        /** LOAD **/
        Route::group(['prefix' => '/load'], function() {
            Route::get('/{type}/{id}', array('as' => 'pagebuilder.ajax.load', 'uses' => 'PageBuilderController@load'))
            ->where('type', 'block|layout|page');
        });

        /** STORE **/
        Route::group(['prefix' => '/store'], function() {
            Route::post('/{type}/{id}', array('as' => 'pagebuilder.ajax.store', 'uses' => 'PageBuilderController@store'))
            ->where('type', 'block|layout|page');
        });
    });
});