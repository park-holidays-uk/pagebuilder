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
            $table->string('icon_class')->nullable();
            $table->mediumText('html_base64');
            $table->mediumText('css_base64')->nullable();
            $table->mediumText('gjs_components')->nullable();

            $table->string('payload_properties', 1000)->nullable();
            
            $table->boolean('is_dynamic')->default(false);
            $table->boolean('is_system_block')->default(false);
            $table->boolean('is_layout')->default(false);
            $table->integer('sort_order')->nullable();

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
