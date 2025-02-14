import React from "react";
import useCategories from "../../../Hooks/CategoriesHooks/useCategories";
import { Link } from "react-router-dom";

export default function Categories() {
  let { data, isError, isLoading, error } = useCategories();

  if (isError) {
    return (
      <h3 className="my-12 text-center text-2xl font-bold text-red-600">
        {error.message}
      </h3>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
  <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-9 max-w-[1200px] w-full px-4">
    <div className="col-span-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 lg:gap-9">
        {data?.data?.data.map((category) => (
          <div
            key={category._id}
            className="group my-main-hover rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:scale-105"
          >
            <Link to={`/category/${category._id}`}>
              <img
                className="h-[200px] w-full rounded-t-lg object-cover sm:h-[250px] md:h-[300px] lg:h-[350px]"
                src={category.image}
                alt={category.name}
              />
            </Link>
            <div className="p-4 transition-all duration-500 group-hover:scale-105 sm:p-5">
              <Link to={`/category/${category._id}`}>
                <h5 className="mb-2 text-center text-xl font-bold tracking-tight text-emerald-700 transition-all duration-500 hover:text-emerald-500">
                  {category.name}
                </h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
