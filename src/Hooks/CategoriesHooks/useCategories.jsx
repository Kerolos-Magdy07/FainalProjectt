import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useCategories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let allCategories = useQuery({
    queryKey: ["allCategories"],
    queryFn: getCategories,
    staleTime: 30000,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 10000,
  });

  return allCategories;
}
