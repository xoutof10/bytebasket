import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand identity */}

        <div>
          <div className="logo-shine">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 relative overflow-hidden inline-block">
              <span className="text-red-600">Byte</span>Basket
            </h2>
          </div>

          <p className="text-sm leading-relaxed">
            Powering your world with the best in electronics and innovation.
          </p>
        </div>

        {/* Navigation links */}

        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-900">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-red-600 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition-colors">
                Order Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Social media links */}

        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-900">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-red-600">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-red-600">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-red-600">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Pinterest" className="hover:text-red-600">
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Email subscription */}

        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-900">
            Subscribe
          </h3>
          <p className="text-sm mb-4">
            Get updates on new arrivals and exclusive offers.
          </p>

          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="
                flex-grow px-3 py-2
                border border-gray-300 
                rounded-md sm:rounded-l-md sm:rounded-r-none
                focus:outline-none focus:ring-2 focus:ring-red-400
                mb-3 sm:mb-0
              "
            />
            <button
              type="submit"
              className="
                bg-red-600 hover:bg-red-500 text-white
                px-4 py-2 text-sm cursor-pointer
                rounded-md sm:rounded-r-md sm:rounded-l-none
                transition-colors
              "
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom copyright bar */}

      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-xs sm:text-sm text-gray-500">
        © {CURRENT_YEAR} <span className="text-red-600">ByteBasket</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
