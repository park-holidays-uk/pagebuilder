<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePageBuilderFieldNamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagebuilder_field_names', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('label');
            $table->string('type');
            $table->string('values')->nullable();
            $table->integer('copies')->default(0);
            $table->string('active_campaign_field')->nullable();
            $table->string('elite_parks_field')->nullable();
            $table->boolean('active_campaign')->default(false);
            $table->boolean('elite_parks')->default(false);
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
        Schema::dropIfExists('pagebuilder_field_names');
    }
}
