let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

let directory = ''; //mix.config.inProduction ? '/dist' : '/build';

mix.setPublicPath('public')
    .js('resources/assets/js/app.js', 'public' + directory + '/js')
    .sass('resources/assets/sass/app.scss', 'public' + directory + '/css')
    .sass('resources/assets/sass/canvas.scss', 'public' + directory + '/css')
    .options({ processCssUrls: false });