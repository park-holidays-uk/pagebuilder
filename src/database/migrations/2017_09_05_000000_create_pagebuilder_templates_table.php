<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePageBuilderTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagebuilder_templates', function (Blueprint $table) {
            $table->increments('id');

            $table->string('label');
            $table->mediumText('html_base64');
            $table->mediumText('css_base64');
            $table->mediumText('gjs_components');
            $table->string('attributes')->nullable()->default(null);
            $table->string('properties', 1000)->nullable()->default(null);
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pagebuilder_templates');
    }
}
