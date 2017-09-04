<?php

namespace ParkHolidays\PageBuilder\Providers;

use Illuminate\Support\ServiceProvider;

class PageBuilderServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        // Routes
        $this->app['router']->group(['namespace' => 'ParkHolidays\PageBuilder\Http\Controllers'], function () {
            include __DIR__.'/../routes/web.php';
        });

        // Views
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'pagebuilder');

        // Publish config file
        $this->publishes([
            __DIR__.'/../config/pagebuilder.php' => config_path('pagebuilder.php'),
        ], 'config');

        // Publish assets
        $this->publishes([
            __DIR__.'/../resources/assets' => public_path('parkholidays/pagebuilder'),
        ], 'public');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
