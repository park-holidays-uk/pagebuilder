# Page Builder

Page editor for PHAST CMS...

### Installing

A step by step series of examples that tell you have to get a development env running

Run the following commands in the CLI

```
composer install parkholidays/pagebuilder --save
```

Don't forget to publish the config and assets..

```
php artisan vendor:publish
```

## Authors

* **Mark Bailey** - *Initial work* - [markbailey](https://github.com/markbailey)

See also the list of [contributors](https://github.com/parkholidays/pagebuilder/contributors) who participated in this project.

## Known Issues

* Trait 'Stylable' checbox is checked when property is empty array, should be unchecked.
