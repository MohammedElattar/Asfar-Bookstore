<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\Categories\storeCategory;
use App\Http\Requests\Admin\V1\Categories\updateCateogry;
use App\Http\Resources\Api\admin\v1\categoriesCollection;
use App\Http\Resources\Api\admin\v1\categoriesResource;
use App\Http\Traits\HttpResponse;
use App\Models\Category;
use Illuminate\Http\Request;

class categoriesController extends Controller
{
    use HttpResponse;
    /**
     * Index
     *
     * Returns all cateogries
     * @return categoriesCollection
     */
    public function index()
    {
        return new categoriesCollection(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(storeCategory $request)
    {
        $category = Category::create([
            "name" => $request->name,
            "status" => $request->status
        ]);
        return response()->json($this->success([
            "data" => [
                "name" => $category->name ,
                "status" =>$category->status ,
                "created_at" => date("Y-m-d" , strtotime($category->created_at)) ,
                "id" => $category->id
            ]
        ] , "Category created successfully"));
    }
    /**
     * Show Category
     *
     * This function returns one category
     * @param Category $category
     * @return categoriesResource
     */
    public function show(Category $category)
    {
        return new categoriesResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return categoriesResource
     */
    public function edit(Category $category)
    {
        return new categoriesResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\JSONResponse
     */
    public function update(updateCateogry $request, Category $category)
    {
        $category->update([
            "name" => $request->name ,
            "status" => $request->status
        ]);
        return $this->success([
            new categoriesResource($category)
        ] , "Category updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\JSONResponse
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return $this->success(msg:"Category deleted successfully");
    }
}
