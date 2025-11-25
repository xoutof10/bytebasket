import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/**
 * ProductCard Component
 * ----------------------
 * Renders a responsive product card with:
 * - product image
 * - discount badge
 * - current & original price
 * - CTA button to add item to cart
 * - click-through to product details page
 */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Calculate original price before discount
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div
      className="
        w-full max-w-xs bg-white 
        border border-gray-200 rounded-xl 
        overflow-hidden shadow-sm hover:shadow-md 
        transition-all duration-300 cursor-pointer
      "
    >
      {/* ---------------------- Product Image ---------------------- */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="
            w-full h-40 sm:h-48 md:h-56 
            object-contain bg-gray-50 
            p-3 sm:p-4
          "
          onClick={() => navigate(`/products/${product.id}`)}
        />

        {/* Discount Badge */}
        <span
          className="
            absolute top-3 left-3 
            bg-blue-100 text-blue-700 
            text-[10px] sm:text-xs font-medium 
            px-2 py-1 rounded-md
          "
        >
          {product.discountPercentage}% OFF
        </span>
      </div>

      {/* ---------------------- Product Info ---------------------- */}
      <div className="p-3 sm:p-4">
        {/* Title */}

        <h3
          className="
            text-gray-900 font-semibold 
            text-sm sm:text-base 
            mb-2 line-clamp-2
          "
        >
          {product.title}
        </h3>

        {/* Price Section */}

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            ${product.price}
          </span>

          <span className="text-xs sm:text-sm text-gray-400 line-through">
            ${originalPrice}
          </span>
        </div>

        {/* ---------------------- Add to Cart Button ---------------------- */}
        
        <button
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.title} to cart`}
          className="
            w-full px-4 sm:px-6 py-2.5 sm:py-3 
            rounded-lg font-semibold 
            text-white bg-red-600 
            hover:bg-red-500
            active:shadow-inner
            cursor-pointer
            transition-all duration-300 
            shadow-md text-sm sm:text-base
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
