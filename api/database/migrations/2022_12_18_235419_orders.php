<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->enum('status', ['0', '1'])->default('0'); // 0 for pending , 1 for approved
            $table->foreign('user_id')
                    ->on('users')
                    ->references('id')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            $table->string('email');
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('main_phone');
            $table->string('second_phone')->nullable();
            $table->string('city');
            $table->string('address');
            $table->string('more_info')->nullable();
            $table->json('order_details');
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
        Schema::dropIfExists('orders');
    }
};
