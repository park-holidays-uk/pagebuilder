<?php

namespace ParkHolidays\PageBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class BlockGroup extends Model
{
    protected $table = 'pagebuilder_block_groups';

    public function blocks()
    {
        return $this->hasMany('ParkHolidays\PageBuilder\Models\Block', 'block_group_id', 'id');
    }
}