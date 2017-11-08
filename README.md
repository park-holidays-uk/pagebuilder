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

All layout blocks should be contained within a *DIV* element with the class *wrapper*. This will allow the use of both fullwidth and non-fullwidth blocks in the page.

When creating FORM blocks, they must contain an empty DIV with the class *form-dropzone*. This be the only area a user can drop form field blocks into.

## Events

* component:add - Triggered when a new component is added to the editor, the model is passed as an argument to the callback
* component:update - Triggered when a component is, generally, updated (moved, styled, etc.)
* component:update:{propertyName} - Listen any property change
* component:styleUpdate - Triggered when the style of the component is updated
* component:styleUpdate:{propertyName} - Listen for a specific style property change
* component:selected - New component selected

* asset:add - New asset added
* asset:remove - Asset removed
* asset:upload:start - Before the upload is started
* asset:upload:end - After the upload is ended
* asset:upload:error - On any error in upload, passes the error as an argument
* asset:upload:response - On upload response, passes the result as an argument

* styleManager:change - Triggered on style property change from new selected component, the view of the property is passed as an argument to the callback
* styleManager:change:{propertyName} - As above but for a specific style property

* storage:start - Before the storage request is started
* storage:load - Triggered when something was loaded from the storage, loaded object passed as an argumnet
* storage:store - Triggered when something is stored to the storage, stored object passed as an argumnet
* storage:end - After the storage request is ended
* storage:error - On any error on storage request, passes the error as an argument

* selector:add - Triggers when a new selector/class is created
* canvasScroll - Triggered when the canvas is scrolled

* run:{commandName} - Triggered when some command is called to run (eg. editor.runCommand('preview'))
* stop:{commandName} - Triggered when some command is called to stop (eg. editor.stopCommand('preview'))
* load - When the editor is loaded

## PHAST Wizard Requirements

* Must be able to create blocks & layouts as well as pages.
* For dynamic blocks, it will need to pre-populate the *block_id* field.
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
* Add support for SRCSET on images. - *Need to work out how path will work*
* Tweak filtering options for Asset modal to work better.
* Clean up and refactor code for more efficiency.
* Restyle to match the styling of PHAST.
* Add quality of life features and make existing features more user friendly.
* Add support for more elements (Lists, videos, tables etc.)
* Change the way styling works, so only certain styles can be applied to specific components / elements
* Add support for multiple top level elements when importing HTML.
* Change Trait input fields to multi-select dropdowns.
* Add form input group blocks
* Add ability to align and change style of buttons
* Add ability to change url of iframe.

## Known Issues

* Mysterious glyph appearing in price point on advert-promo-three block.
* If an element with a style associated to it is copied, both copies of the element refer to same style, preventing the elements being styled differently. - *Temporary solution would be to disable copying of elements*
* Some blocks (i.e. Advert-Promo-Three) properties (Stylable, removable etc..) are being reset once dragged into the canvas.