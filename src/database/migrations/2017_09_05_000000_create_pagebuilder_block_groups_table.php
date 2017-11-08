<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePageBuilderBlockGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagebuilder_block_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 60);
            $table->boolean('is_system_group')->default(false);  
            $table->smallInteger('sort_order')->nullable()->default(null);            
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
        Schema::dropIfExists('pagebuilder_block_groups');
    }
}
