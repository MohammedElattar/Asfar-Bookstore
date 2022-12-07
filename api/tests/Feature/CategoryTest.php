<?php

namespace Tests\Feature;

use App\Http\Traits\testing;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use testing;
    private string $cat_path = 'api/admin/v1/categories';
    private string $directory_name = 'categories';

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testFetchAllCategories()
    {
        $this->authSanctum();
        $response = $this->getJson($this->cat_path);
        $response->assertStatus(200);
        $this->write_file($this->directory_name, 'fetch_all_categories', $response->getContent());
    }

    public function testOneCategoryFound()
    {
        $this->authSanctum();
        $response = $this->getJson($this->cat_path.'/1');
        $response->assertStatus(200);
        $this->write_file($this->directory_name, 'fetch_one_category_found', $response->getContent());
    }

    public function testOneCategoryNotFound()
    {
        $this->authSanctum();
        $response = $this->getJson($this->cat_path.'/1000000000');
        $response->assertStatus(404);
        $this->write_file($this->directory_name, 'fetch_one_category_not_found', $response->getContent());
    }

    public function testStoreCategory()
    {
        $this->authSanctum();
        $name = 'test_category_name';
        $response = $this->postJson($this->cat_path);
        // $response = $this->
    }
}
