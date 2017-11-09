<?php

namespace ParkHolidays\PageBuilder\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Block extends Model
{
    use SoftDeletes;

    protected $fillable = ['block_id'];
    protected $table = 'pagebuilder_blocks';

    public function group()
    {
        return $this->belongsTo('ParkHolidays\PageBuilder\Models\BlockGroup', 'block_group_id');
    }
}
