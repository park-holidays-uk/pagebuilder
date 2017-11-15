<?php

namespace ParkHolidays\PageBuilder\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FieldName extends Model
{
    use SoftDeletes;

    protected $table = 'pagebuilder_field_names';
}
