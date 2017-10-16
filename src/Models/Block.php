<?php

namespace ParkHolidays\PageBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    protected $fillable = ['block_id'];
    protected $table = 'pagebuilder_blocks';

    public function group()
    {
        return $this->belongsTo('ParkHolidays\PageBuilder\Models\BlockGroup', 'block_group_id');
    }
}
