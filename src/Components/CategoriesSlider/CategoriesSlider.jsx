import React from "react";
import Slider from "react-slick";
import useCategoriesSllider from "../../Hooks/CategoriesHooks/useCategoriesSllider";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  let { data, isError, isLoading, error } = useCategoriesSllider();

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
        <span className="loader"></span>
      </div>
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 7,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    slidesToScroll: 2,
    accessibility: true,
    autoplay: true,
  };

  return (
    <>
      <h2 className="my-2 text-3xl font-[400]"> Shop Popular Categories </h2>
      <Slider {...settings}>
        {data?.data?.data.map((category) => {
          return (
            <Link key={category._id} to={`/category/${category._id}`}>
            <div className="mt-4 mb-10">
              <figure>
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-[200px] w-full object-cover"
                />
              </figure>
              <h4 className="ps-2 pt-2 font-[600]">{category.name}</h4>
            </div>
          </Link> 
          );
        })}
      </Slider>
    </>
  );
}
