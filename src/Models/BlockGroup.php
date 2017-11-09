<?php

namespace ParkHolidays\PageBuilder\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlockGroup extends Model
{
    use SoftDeletes;
    
    protected $table = 'pagebuilder_block_groups';

    public function blocks()
    {
        return $this->hasMany('ParkHolidays\PageBuilder\Models\Block', 'block_group_id', 'id');
    }
}