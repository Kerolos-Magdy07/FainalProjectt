import React from "react";
import { useParams, Link } from "react-router-dom"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function CategoryDetails() {
  const { categoryId } = useParams();

  
  async function getCategory() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    );
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: getCategory,
    staleTime: 30000,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    select: (data) => data.data.data,
  });

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;

  if (isError)
    return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="mb-6 text-center text-3xl font-bold text-emerald-700">
        Subcategories
      </h2>

      <div className="grid grid-cols-1 mx-auto justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data.map((sub) => (
          <Link
            to={`/subcategory/${sub._id}`} 
            key={sub._id}
            className="rounded-lg border border-gray-200 p-4 text-center shadow-md transition-transform hover:scale-105"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
              {sub.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
