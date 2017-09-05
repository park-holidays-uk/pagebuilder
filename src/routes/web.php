<?php

Route::group(['domain' => config('pagebuilder.domain')], function(){
    /*
    *   HTTP Routes
    */
    // Route::get('/', array('as' => 'pagebuilder.dashboard', 'uses' => 'PageBuilderController@dashboard'));
    Route::get('/editor/page/{id?}', array('as' => 'pagebuilder.editor.page', 'uses' => 'PageBuilderController@pageEditor'));

    /*
    *   Ajax Routers
    */
    Route::group(['prefix' => '/ajax'], function(){
        Route::get('/getblocks', array('as' => 'pagebuilder.ajax.getblocks', 'uses' => 'PageBuilderController@getBlocks'));
    });
});