# Page Builder

Page editor for PHAST CMS...

### Installing

Run the following commands in the CLI

```
composer require park-holidays-uk/pagebuilder
```

Add the following to the App config 'providers'

```
ParkHolidays\PageBuilder\PageBuilderServiceProvider::class
```

Don't forget to publish the config and assets..

```
php artisan vendor:publish
```

## Things To Know

All layout blocks should be contained within a *DIV* element with the class *wrapper*. This will allow the use of both
fullwidth and non-fullwidth blocks.

## Authors

* **Mark Bailey** - *Initial work* - [markbailey](https://github.com/markbailey)

See also the list of [contributors](https://github.com/park-holidays-uk/pagebuilder/contributors) who participated in this project.

## TODOS

* Remove fields 'css_base64' and 'gjs_components' from table 'pagebuilder_blocks' and take out and related code.
* Add support for SRCSET on images - *Once blocks with images have been added*
* Add notifications on user and system events.
* Add filtering options to Asset modal for media library.

## Known Issues

* Error installing package into a Laravel project. - *Could not find package vendor/package at any version for your minimum-stability (stable).*
* The GrapesJS property stylable can be either true, false or an array for which an empty array is equivilant to false but when using traits, the checkbox recognises empty array as true and as such displays incorrectly.
* Mysterious glyph appearing in price point on advert-promo-three block.
* Once href set on Links, clicking them redirects canvas to the url.
