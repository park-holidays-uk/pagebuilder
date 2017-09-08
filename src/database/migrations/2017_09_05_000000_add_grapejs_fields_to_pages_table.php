<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGrapeJsFieldsToPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->renameColumn('html', 'html_base64');
            $table->mediumText('css_base64')->nullable()->after('html');
            $table->mediumText('gjs_components')->nullable()->after('css_base64');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->renameColumn('html_base64', 'html');
            $table->dropColumn('css_base64');
            $table->dropColumn('gjs_components');
        });
    }
}
