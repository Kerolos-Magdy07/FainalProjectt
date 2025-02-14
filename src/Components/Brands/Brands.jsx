import React from "react";
import useBrands from "../../Hooks/useBrands";

export default function Brands() {
  let { data, isError, isLoading, error } = useBrands();
  if (isError) {
    return (
      <h3 className="my-12 text-center text-4xl font-[600] text-red-600">
        {error.message}
      </h3>
    );
  }
  if (isLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader h-12 w-12 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-18 grid grid-cols-2 justify-items-center gap-x-4 gap-y-12 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data?.map((brand) => (
          <div key={brand._id} className="group col-span-1 px-5">
            <div className="productBorder my-main-hover overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105">
              <figure className="overflow-hidden">
                <img
                  className="h-auto w-full object-cover"
                  src={brand.image}
                  alt={brand.name || "Brand Logo"}
                />
              </figure>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
