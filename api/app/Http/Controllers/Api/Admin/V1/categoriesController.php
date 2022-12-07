<?php

namespace App\Http\Controllers\Api\Admin\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\V1\Categories\storeCategory;
use App\Http\Requests\Admin\V1\Categories\updateCateogry;
use App\Http\Resources\Api\admin\v1\categoriesCollection;
use App\Http\Resources\Api\admin\v1\categoriesResource;
use App\Http\Traits\HttpResponse;
use App\Models\Api\Admin\V1\Category;
use Illuminate\Support\Facades\DB;

class categoriesController extends Controller
{
    use HttpResponse;

    /**
     * Index.
     *
     * Returns all cateogries
     *
     * @return categoriesCollection
     */
    public function index()
    {
        return new categoriesCollection(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(storeCategory $request)
    {
        $category = Category::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);

        return response()->json($this->success(
            new categoriesResource($category), 'Category created successfully'));
    }

    /**
     * Show Category.
     *
     * This function returns one category
     *
     * @return categoriesResource
     */
    public function show(Category $category)
    {
        return new categoriesResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JSONResponse
     */
    public function update(updateCateogry $request, Category $category)
    {
        $category->update([
            'name' => $request->name,
            'status' => $request->status,
        ]);

        return $this->success([
            new categoriesResource($category),
        ], 'Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\JSONResponse
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return $this->success(msg: 'Category deleted successfully');
    }

    public function delete_all()
    {
        DB::delete('DELETE FROM categories');

        return $this->success(msg: 'All categories deleted successfully');
    }
}
