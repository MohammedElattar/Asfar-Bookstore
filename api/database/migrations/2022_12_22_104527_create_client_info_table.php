<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_info', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id')->unique();
            $table->foreign('client_id')
                ->on('users')
                ->references('id')
                ->onUpdate("cascade")
                ->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->longText('address');
            $table->string('city');
            $table->string('email');
            $table->string('main_phone');
            $table->string('second_phone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_info');
    }
};
