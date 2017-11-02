<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePageBuilderBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagebuilder_blocks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('block_group_id')->unsigned();

            $table->string('block_id')->nullable();
            $table->string('label');
            $table->mediumText('html_base64');
            $table->mediumText('css_base64')->nullable()->default(null);;
            $table->mediumText('gjs_components')->nullable()->default(null);
            $table->string('attributes')->default('{ "class": "" }');

            $table->string('properties', 1000)->nullable()->default(null);
            
            $table->boolean('dynamic')->default(false);
            $table->boolean('is_user_block')->default(true);
            $table->boolean('is_layout')->default(false);

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
        Schema::dropIfExists('pagebuilder_blocks');
    }
}
