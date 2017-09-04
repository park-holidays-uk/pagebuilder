<?php

    Route::group(['domain' => config('pagebuilder.domain')], function(){
        Route::get('/', array('as' => 'pagebuilder.dashboard', 'uses' => 'PageBuilderController@dashboard'));
        Route::get('/editor', array('as' => 'pagebuilder.editor', 'uses' => 'PageBuilderController@editor'));
    });