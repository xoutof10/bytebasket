import React, { useEffect, useState } from "react";
import banner from "../assets/banner1.jpg";
import { Link } from "react-router-dom";

// Mid-page promotional banner with background image,
// overlay, headline, subtext, and CTA button.


const MidBanner = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative bg-gray-50 py-12 sm:py-16 md:py-20 overflow-hidden">


      {/* Banner Wrapper */}


      <div
        className="
          relative max-w-7xl mx-auto
          h-[300px] sm:h-[380px] md:h-[500px] lg:h-[600px]
          rounded-2xl overflow-hidden shadow-xl
        "
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: isDesktop ? "fixed" : "scroll",
        }}
      >
        {/* Dark overlay */}


        <div className="absolute inset-0 bg-black/50 sm:bg-black/55 md:bg-black/60 backdrop-blur-[1px]" />

        {/* Content */}


        <div className="relative flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-6 drop-shadow-md">
            Next-Gen Electronics
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              at Your Fingertips
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-100/90 mb-6 sm:mb-8 leading-relaxed">
            Discover the latest tech innovations with unbeatable prices and free
            shipping on all orders.
          </p>

          {/* CTA Button */}

          
          <Link
            to="/products"
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MidBanner;
