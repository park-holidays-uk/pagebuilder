<?php

namespace ParkHolidays\PageBuilder\Database\Seeds;

use Illuminate\Database\Seeder;
use ParkHolidays\PageBuilder\Models\BlockGroup;

class BlockGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('pagebuilder_block_groups')->truncate();

        $groups = collect(['Basic', 'Dynamic', 'Forms', 'Layouts', 'Misc']);

        $groups->each(function($item, $key) {
            $group = new BlockGroup;
            $group->name = $item;
            $group->save();
        });
    }
}
