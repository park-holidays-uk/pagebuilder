<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterPageBuilderBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pagebuilder_blocks', function (Blueprint $table) {
            $table->integer('sort_order')->nullable()->after('is_layout');
            $table->dropColumn('tag');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pagebuilder_blocks', function (Blueprint $table) {
            $table->dropColumn('sort_order');
        });
    }
}
