<?php

namespace ParkHolidays\PageBuilder;

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
        $resourcePath = __DIR__.'/../resources';

        // Routes
        $this->app['router']->group(['namespace' => 'ParkHolidays\PageBuilder\Http\Controllers'], function () {
            include __DIR__.'/Http/routes.php';
        });

        // Views
        $this->loadViewsFrom($resourcePath .'/views', 'pagebuilder');

        // Migrations
        $this->loadMigrationsFrom(__DIR__.'/database/migrations');

        // Publish config file
        $this->publishes([
            __DIR__.'/config/pagebuilder.php' => config_path('pagebuilder.php'),
        ], 'config');

        // Publish assets
        $this->publishes([
            __DIR__ . '/../public' => public_path('parkholidays/pagebuilder'),
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
