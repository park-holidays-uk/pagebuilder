# Page Builder

Page editor for PHAST CMS built using the GrapesJS framework...

### Installing

Run the following commands in the CLI

```
composer require park-holidays-uk/PageBuilder
```

Add the following to the App config 'providers'

```
ParkHolidays\PageBuilder\PageBuilderServiceProvider::class
```

Don't forget to publish the config and assets..

```
php artisan vendor:publish
```

Once config has been published, add the following to the .ENV file and change the values appropriately

```
PAGEBUILDER_DOMAIN=phast.parkholidays.com
PAGEBUILDER_ASSET_PATH=//parkholidays.s3-website-eu-west-1.amazonaws.com/assets/
```

When ready run the migrations and seeders

```
php artisan migrate
php artisan db:seed --class="ParkHolidays\PageBuilder\Database\Seeds\DatabaseSeeder"
```

## Things To Know

All layout blocks should be contained within a *DIV* element with the class *wrapper*. This will allow the use of both
fullwidth and non-fullwidth blocks in the page.

When creating FORM blocks, they must contain an empty DIV with the class *form-dropzone*. This be the only area a user can drop form field blocks into.

## PHAST Wizard Requirements

* Must be able to create blocks & layouts as well as pages.
* For dynamic blocks, it will need to pre-populate the *block_id* field with the filename of the view.
* For dynamic blocks, it will need to populate the *properties* field with a JSON object that is used to create dynamic traits (payload object). see **Fig. PW1R**
* For all blocks and layouts, it will need to set the *attributes* field, with a JSON object that has minimum of 1 property, which must be the class property. This is used to display an icon within pagebuilder. see **Fig. PW2R**

### FIG. PW1R
For different trait input types please refer to (https://github.com/artf/grapesjs/wiki/Traits).
At present only type *text* is available.
```
[
    {"property":"park_codes","type":"text", "value": ""},
    {"property":"rental_type","type":"text", "value": "1"}
]
```

### FIG. PW2R
```
{"class": "ICON CLASSES GOES HERE"}
```

## Authors

* **Mark Bailey** - *Initial work* - [markbailey](https://github.com/markbailey)

See also the list of [contributors](https://github.com/park-holidays-uk/pagebuilder/contributors) who participated in this project.

## TODOS

* Modulerise CSS and JavaScript.
* Add support for SRCSET on images - *Once blocks with images have been added*
* Tweak filtering options for Asset modal to work better.
* Add authentication to restrict access.
* Add any additional functionality required to support forms

## Known Issues

* Error installing package into a Laravel project. - *Could not find package vendor/package at any version for your minimum-stability (stable).*
* The GrapesJS property stylable can be either true, false or an array, for which an empty array is equivilant to false but when using traits, the checkbox recognises empty array as true and as such displays incorrectly.
* Mysterious glyph appearing in price point on advert-promo-three block.
* If an element with a style associated to it is copied, both copies of the element refer to same style, preventing the elements being styled differently. - *Temporary solution would be to disable copying of elements*
* Some blocks (i.e. Advert-Promo-Three) properties (Stylable, removable etc..) are being reset once dragged into the canvas.
