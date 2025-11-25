import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

/**
 * Carousel
 * --------
 * Hero carousel that highlights a curated set of products with:
 * - blurred background visual
 * - responsive layout
 * - CTA to navigate to product detail
 */

// Custom previous arrow (visible on tablet and desktop)
const SamplePrevArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Previous slide"
    className="hidden sm:block absolute top-1/2 left-2 sm:left-4 lg:left-6 z-10 -translate-y-1/2 cursor-pointer"
  >
    <AiOutlineArrowLeft className="text-white bg-red-500/80 hover:bg-red-600 transition-all rounded-full p-1.5 lg:p-2 text-2xl lg:text-3xl shadow-md" />
  </button>
);

// Custom next arrow (visible on tablet and desktop)
const SampleNextArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Next slide"
    className="hidden sm:block absolute top-1/2 right-2 sm:right-4 lg:right-6 z-10 -translate-y-1/2 cursor-pointer"
  >
    <AiOutlineArrowRight className="text-white bg-red-500/80 hover:bg-red-600 transition-all rounded-full p-1.5 lg:p-2 text-2xl lg:text-3xl shadow-md" />
  </button>
);

function Carousel() {
  const { fetchAllProducts, data } = useData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // Number of products highlighted in the carousel
  const picksCount = Math.min(7, data?.length || 0);

  // Slider configuration
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Fetch products on mount
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await fetchAllProducts();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ---------------------- Loading State ---------------------- */
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <div className="flex items-center gap-3 text-lg font-semibold text-gray-600">
          <div className="w-4 h-4 rounded-full bg-gray-500 animate-pulse" />
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item) => (
          <div key={item?.id ?? item?.title} className="relative overflow-hidden">
            {/* Background layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50" />
            <div className="absolute inset-0 opacity-10">
              <img
                src={item?.images?.[0]}
                alt={item?.title}
                className="object-cover w-full h-full blur-md scale-105"
                loading="lazy"
              />
            </div>

            {/* Main content */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-16 min-h-[320px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[600px] px-3 sm:px-6 md:px-12 lg:px-20 py-8">
              
              {/* Text block */}
              <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-[10px] sm:text-xs md:text-sm text-red-500 font-semibold uppercase tracking-wide mb-2 sm:mb-3">
                  Powering Your World with Innovation
                </h3>

                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 uppercase mb-3 sm:mb-4 leading-tight">
                  {item?.title}
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                  {item?.description}
                </p>

                <button
                  type="button"
                  onClick={() => navigate(`/products/${item?.id}`)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-500 cursor-pointer active:bg-red-700 transition-all duration-300 shadow-md text-xs sm:text-sm md:text-base"
                >
                  Shop Now
                </button>

                {picksCount > 0 && (
                  <div className="mt-3 sm:mt-4 flex items-center gap-3">
                    <div className="h-5 w-px bg-gray-300" />
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {picksCount} {picksCount === 1 ? "pick" : "picks"} • curated just for you
                    </span>
                  </div>
                )}
              </div>

              {/* Image block */}
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="w-[200px] h-[220px] sm:w-[260px] sm:h-[300px] md:w-[340px] md:h-[380px] lg:w-[420px] lg:h-[480px] flex items-center justify-center bg-white/60 rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  <img
                    src={item?.thumbnail || item?.images?.[0]}
                    alt={item?.title}
                    className="object-contain max-h-full max-w-full transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>

      {/* Category section below hero carousel */}
      <Category />
    </div>
  );
}

export default Carousel;
