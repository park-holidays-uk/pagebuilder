# Page Builder

Page editor for PHAST CMS...

### Installing

A step by step series of examples that tell you have to get a development env running

Run the following commands in the CLI

```
composer install park-holidays-uk/pagebuilder --save
```

Don't forget to publish the config and assets..

```
php artisan vendor:publish
```

## Authors

* **Mark Bailey** - *Initial work* - [markbailey](https://github.com/markbailey)

See also the list of [contributors](https://github.com/park-holidays-uk/pagebuilder/contributors) who participated in this project.

## TODOS

* Remove fields 'css_base64' and 'gjs_components' from table 'pagebuilder_blocks' and take out and related code.
* Add support for SRCSET on images - *Once blocks with images have been added*

## Known Issues

* The GrapesJS property stylable can be either true, false or an array for which an empty array is equivilant to false but when using traits, the checkbox recognises empty array as true and as such displays incorrectly.
