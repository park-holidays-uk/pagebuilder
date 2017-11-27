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
        $composer = json_decode(file_get_contents(base_path() . '/composer.lock'));
        $pb = head(array_where($composer->packages, function($value, $key) {
            return $value->name == 'park-holidays-uk/pagebuilder';
        }));

        if($pb) {
            \Config::set([ 'pagebuilder.app_name' => 'Page Builder' ]);
            \Config::set([ 'pagebuilder.version' => $pb->version ]);
            \Config::set([ 'pagebuilder.release_date' => \Carbon\Carbon::parse($pb->time)->toDateString() ]);
            \Config::set([ 'pagebuilder.release_time' => \Carbon\Carbon::parse($pb->time)->toTimeString() ]);
            \Config::set([ 'pagebuilder.description' => $pb->description ]);
        }
    }
}
