# Page Builder

Page editor for PHAST CMS built using the GrapesJS framework...

### New Installation

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
php artisan vendor:publish --provider="ParkHolidays\PageBuilder\PageBuilderServiceProvider" --force
```

Once config has been published, add the following to the .ENV file and change the values appropriately

```
PAGEBUILDER_DOMAIN=phast.parkholidays.com
PAGEBUILDER_URLPREFIX=/pagebuilder
PAGEBUILDER_MEDIA_PATH=//parkholidays.s3-website-eu-west-1.amazonaws.com/assets/
PAGEBUILDER_ASSET_PATH=/dist/
PAGEBUILDER_FORM_ACTION=/form/handle
PAGEBUILDER_FORM_METHOD=POST
```

When ready run the migrations and seeders

```
php artisan migrate
php artisan db:seed --class="ParkHolidays\PageBuilder\Database\Seeds\DatabaseSeeder"
```

### Update Installation

Run the following commands in the CLI

```
composer update
```

The publish the assets in the same way as the enw installation above.
Check for any changes to ENV settings.

## Things To Know

* All layout blocks should be contained within a *DIV* element with the class *wrapper*. This will allow the use of both fullwidth and non-fullwidth blocks in the page.
* When creating FORM blocks, they must contain an empty DIV with the class *form-dropzone*. This be the only area a user can drop form field blocks into.
* To use SVG for block icons you can put teh code in the label field. see **Fig. TTK1**

### FIG. TTK1

```
<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
    <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
</svg>
<div class="gjs-block-label">LABEL</div
```

## PHAST Wizard Requirements

* For dynamic blocks, it will need to populate the *payload_properties* field with a JSON object that is used to create dynamic traits (payload object). see **Fig. PW1R**

### FIG. PW1R
For different trait input types please refer to (https://github.com/artf/grapesjs/wiki/Traits).
At present only type *text* and *select* is available.
```
[
    {
        "type":"select",
        "name":"NAME",
        "label":"LABEL", 
        "value": "", 
        "multiple": true,
        "dynamic_options":true, 
        "options_connection":"CONNECTION",
        "options_table":"TABLE",
        "options_text_field":"FIELD",
        "options_value_field":"FIELD"
    },
    {
        "type":"text"
        "name":"NAME", 
        "label":"LABEL",
        "value": "1"
    }
]
```

## Authors

* **Mark Bailey** - *Initial work* - [markbailey](https://github.com/markbailey)

See also the list of [contributors](https://github.com/park-holidays-uk/pagebuilder/contributors) who participated in this project.

## TODOS

* Add support for SRCSET on images. - *Need to work out how path will work*
* Tweak filtering options for Asset modal to work better.
* Add support for more elements (Lists, tables etc.)
* Replace multple grid blocks with customisable grids
* Look at changing video default source to YouTube
* Look into more permenant fix for DomDocument parsing issue (https://stackoverflow.com/questions/39479994/php-domdocument-savehtml-breaks-format)
* Improve on the multiple select traits.
* Look at implimenting being able to add traits (by user) in PB. - Dynablocks, Serverblocks only.

## Known Issues

* When text blocks are emptied, after text is re-entered or pasted in, the text or the block is duplicated.
* Sometimes when canvas is loaded, some content or blocks are missing (although the content is in DB). Refreshing page seems to restore them.
* Dragging blocks into the canvas (BODY) causes the block to be appear duplicated, but it is only vision ghosting.
* Some blocks are randomly unable to be dropped into droppable components (elements).
* Input NAME field (custom name) doesn't always change when emptied.