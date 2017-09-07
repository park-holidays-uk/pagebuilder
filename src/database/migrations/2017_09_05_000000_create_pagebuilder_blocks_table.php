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
            $table->text('html_base64');
            $table->string('attributes')->nullable()->default(null);
            $table->string('properties', 1000)->nullable()->default(null);
            
            $table->string('tag', 60)->nullable();
            $table->boolean('dynamic')->default(false);

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
