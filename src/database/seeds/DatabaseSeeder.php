<?php

namespace ParkHolidays\PageBuilder\Database\Seeds;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0');

        $this->call(BlockGroupSeeder::class);
        $this->call(BlockSeeder::class);

        \DB::statement('SET FOREIGN_KEY_CHECKS=1');

        /** Page Table Amendment **/
        $this->call(PagesFieldConvertSeeder::class);
    }
}
