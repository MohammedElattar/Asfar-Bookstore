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
        Schema::create('books', function (Blueprint $table) {
            $str_len = 50;
            $table->id();
            $table->string('title',$str_len);
            $table->string('writter',$str_len)->nullable();
            $table->string('publisher',$str_len)->nullable();
            $table->string("vendor",$str_len);
            $table->bigInteger("quantity", unsigned: true);
            $table->unsignedDouble("price");
            $table->string('img')->nullable();
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
        Schema::dropIfExists('books');
    }
};
