import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function SingleProduct() {
  const param = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const product = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/products/${param.id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  let rating = Math.floor(singleProduct.rating || 0);

  useEffect(() => {
    product();
  }, []);

  // LOADING UI
  if (loading) {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="flex items-center gap-3 text-lg font-semibold text-gray-600">
        <div className="w-4 h-4 rounded-full bg-gray-500 animate-pulse"></div>
        Loading…
      </div>
    </div>
  );
}

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={singleProduct?.images?.[0]}
            alt={singleProduct.title}
            className="w-full max-w-md rounded-lg shadow"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            {singleProduct.title}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {singleProduct.description}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-gray-900">
              ${singleProduct.price}
            </p>
            <span className="text-green-600 font-medium">
              -{singleProduct.discountPercentage}%
            </span>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-2">
            <div className="text-yellow-500 text-xl">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
            </div>
            <span className="text-gray-700">{singleProduct.rating}</span>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => addToCart(singleProduct)}
            className="w-full md:w-auto bg-red-600 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer active:bg-red-700 hover:bg-red-500 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
