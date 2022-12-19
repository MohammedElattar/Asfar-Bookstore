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
            $table->string('email');
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('mainPhone');
            $table->string('secondPhone')->nullable();
            $table->string('city');
            $table->string('address');
            $table->string('more_info')->nullable();
            $table->json('order_details');
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
