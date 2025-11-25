import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

const DELIVERY_FEE = 10;
const HANDLING_FEE = 5;
const WAIVED_DELIVERY_FEE = 0;

const Cart = ({ location }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // Pre-fill delivery form with user and location info when available
  const [form, setForm] = useState({
    fullName: user?.fullName ?? "",
    address: location?.county ?? "",
    state: location?.state ?? "",
    postcode: location?.postcode ?? "",
    country: location?.country ?? "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Compute totals derived from cart items
  const itemsTotal = useMemo(
    () =>
      cartItem.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cartItem]
  );

  const deliveryCharge = WAIVED_DELIVERY_FEE;
  const handlingCharge = HANDLING_FEE;
  const grandTotal = itemsTotal + deliveryCharge + handlingCharge;

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    console.log("Delivery form submitted:", form);
  };

  return (
    <div className="mt-6 md:mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          {/* Title */}
          <h1 className="font-bold text-xl md:text-2xl">
            My Cart ({cartItem.length})
          </h1>

          {/* Cart Items */}
          <div className="mt-6 md:mt-10 space-y-3">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-4 md:p-5 rounded-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full"
              >
                {/* Product info */}
                <div className="flex items-start md:items-center gap-3 md:gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div>
                    <h1 className="w-full md:w-[300px] line-clamp-2 text-sm md:text-base">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-semibold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity controls + delete */}
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div className="bg-red-500 text-white flex gap-4 px-3 py-2 rounded-md font-bold text-lg md:text-xl">
                    <button
                      onClick={() =>
                        updateQuantity(cartItem, item.id, "decrease")
                      }
                      className="cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(cartItem, item.id, "increase")
                      }
                      className="cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="hover:bg-white/60 transition-all rounded-full p-2 md:p-3 hover:shadow-2xl"
                    aria-label="Remove item from cart"
                  >
                    <FaRegTrashAlt className="text-red-500 text-xl md:text-2xl cursor-pointer" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Bill Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-4 mt-4">
            {/* Delivery Info */}
            <form
              onSubmit={handleDeliverySubmit}
              className="bg-gray-100 rounded-md p-5 md:p-7 mt-2 md:mt-4 space-y-3"
            >
              <h1 className="text-gray-800 font-bold text-lg md:text-xl">
                Delivery Info
              </h1>

              <div className="flex flex-col space-y-1 border-b border-gray-400 pb-2">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  className="p-2 rounded-md focus:outline-none w-full bg-white"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col space-y-1 border-b border-gray-400 pb-2">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="p-2 rounded-md focus:outline-none w-full bg-white"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col md:flex-row w-full gap-3 md:gap-5">
                <div className="flex flex-col space-y-1 w-full border-b border-gray-400 pb-2">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    className="p-2 rounded-md w-full focus:outline-none bg-white"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full border-b border-gray-400 pb-2">
                  <label htmlFor="postcode">PostCode</label>
                  <input
                    id="postcode"
                    type="text"
                    name="postcode"
                    placeholder="Enter your postcode"
                    className="p-2 rounded-md w-full focus:outline-none bg-white"
                    value={form.postcode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-3 md:gap-5">
                <div className="flex flex-col space-y-1 w-full border-b border-gray-400 pb-2">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    type="text"
                    name="country"
                    placeholder="Enter your country"
                    className="p-2 rounded-md w-full focus:outline-none bg-white"
                    value={form.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full border-b border-gray-400 pb-2">
                  <label htmlFor="phone">Phone No</label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Enter your number"
                    className="p-2 rounded-md w-full focus:outline-none bg-white"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-red-600 active:bg-red-700 hover:bg-red-500 transition-all duration-300 shadow-md cursor-pointer"
              >
                Submit
              </button>
            </form>

            {/* Bill Details */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-5 md:p-7 mt-2 md:mt-4 space-y-3 h-max">
              <h1 className="text-gray-800 font-bold text-lg md:text-xl">
                Bill details
              </h1>

              <div className="flex justify-between items-center text-sm md:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <LuNotebookText />
                  </span>
                  Items total
                </h1>
                <p>${itemsTotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center text-sm md:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <MdDeliveryDining />
                  </span>
                  Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">
                    ${DELIVERY_FEE}
                  </span>{" "}
                  FREE
                </p>
              </div>

              <div className="flex justify-between items-center text-sm md:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <GiShoppingBag />
                  </span>
                  Handling Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  ${handlingCharge.toFixed(2)}
                </p>
              </div>

              <hr className="text-gray-200 mt-2" />

              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-base md:text-lg">
                  Grand total
                </h1>
                <p className="font-semibold text-base md:text-lg">
                  ${grandTotal.toFixed(2)}
                </p>
              </div>

              {/* Promo code placeholder */}
              <div>
                <h1 className="font-semibold text-gray-700 mb-2 md:mb-3 mt-4 md:mt-7">
                  Apply Promo Code
                </h1>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="p-2 rounded-md w-full border border-gray-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    className="bg-gray-500 text-white border border-gray-200 px-4 py-2 cursor-pointer active:bg-gray-100 rounded-md"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="px-6 py-3 rounded-lg font-semibold text-white bg-red-600 active:bg-red-700 hover:bg-red-500 transition-all duration-300 shadow-md w-full cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <div className="flex flex-col gap-3 justify-center items-center h-[400px] md:h-[600px] px-4 text-center">
          <h1 className="text-red-500/80 font-bold text-2xl md:text-5xl">
            Oh no! Your cart is empty
          </h1>
          <img
            src={emptyCart}
            alt="Empty cart illustration"
            className="w-56 md:w-[400px]"
          />
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-500 transition-all duration-300 shadow-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
