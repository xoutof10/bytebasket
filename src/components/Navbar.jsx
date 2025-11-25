import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import Location from "./navbar/Location";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

/**
 * Global navigation bar with brand, location selector, navigation links,
 * cart summary, and authentication controls.
 */


function Navbar({ location, getLocation, openDropdown, setOpenDropdown }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile navigation drawer
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Close mobile menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Toggle location dropdown (shared between desktop and mobile views)
  const toggleDropdown = () => setOpenDropdown((prev) => !prev);

  const { cartItem } = useCart();
  const cartCount = cartItem?.length ?? 0;

  // --- Styles & configuration ------------------------------------------------

  const linkActive = "text-red-600 font-semibold border-b-2 border-red-600";
  const linkBase =
    "cursor-pointer transition-all font-semibold duration-200 hover:scale-105 hover:text-red-600";

  // Primary navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
  ];

  // ---------------------------------------------------------------------------

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/90 shadow-md">
      <div className="flex items-center h-20 px-4 md:px-20">


        {/* Brand + desktop location selector */}


        <div className="flex items-center gap-4">
          <Link to="/" onClick={closeMobileMenu} aria-label="Go to homepage">
            <h1 className="logo-shine text-3xl font-bold relative inline-block overflow-hidden">
              <span className="text-red-600">Byte</span>Basket
            </h1>
          </Link>

          {/* Location selector (desktop only) */}


          <div className="hidden lg:block">
            <Location
              location={location}
              toggleDropdown={toggleDropdown}
              openDropdown={openDropdown}
              getLocation={getLocation}
            />
          </div>
        </div>

        {/* Desktop navigation */}


        <nav
          className="ml-auto hidden lg:flex items-center gap-6 text-lg"
          aria-label="Main navigation"
        >
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) => (isActive ? linkActive : linkBase)}
            >
              {name}
            </NavLink>
          ))}

          {/* Cart (desktop) */}


          <Link
            to="/cart"
            className="relative group"
            aria-label="View cart and checkout"
          >
            <IoCartOutline className="h-7 w-7 text-gray-800 group-hover:text-red-600 transition" />

            <span className="bg-red-600 px-2 rounded-full absolute -top-3 -right-3 text-white text-sm leading-tight shadow-[0_6px_18px_-6px_rgba(239,68,68,0.8)]">
              {cartCount}
            </span>

            {/* Cart badge pulse effect */}


            <span className="absolute -top-3 -right-3 inline-flex h-5 w-5 rounded-full opacity-50 animate-ping bg-red-500 pointer-events-none" />
          </Link>

          {/* Authentication */}

          
          <div className="ml-2">
            <SignedOut>
              <SignInButton className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-500 active:bg-red-700 transition shadow-[0_8px_20px_-8px_rgba(239,68,68,0.6)]" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>

        {/* Mobile header controls */}
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          {/* Cart (mobile) */}
          <Link
            to="/cart"
            onClick={closeMobileMenu}
            className="relative group"
            aria-label="View cart and checkout"
          >
            <IoCartOutline className="h-7 w-7 text-gray-800 group-hover:text-red-600 transition" />
            <span className="bg-red-600 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs leading-tight shadow-[0_6px_18px_-6px_rgba(239,68,68,0.8)]">
              {cartCount}
            </span>
          </Link>

          {/* Authentication (mobile) */}
          <SignedOut>
            <SignInButton className="px-2 py-1 rounded-md bg-red-600 text-white text-xs font-medium hover:bg-red-500 active:bg-red-700 transition" />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* Hamburger toggle */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="p-2 rounded-md border border-gray-200 active:scale-95"
          >
            {isMobileMenuOpen ? (
              <HiX className="h-6 w-6 text-gray-800" />
            ) : (
              <HiOutlineMenu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {isMobileMenuOpen && (
        <nav
          className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-2 text-base"
          aria-label="Mobile navigation"
        >
          {/* Location selector (mobile) */}
          <div className="mb-2">
            <Location
              location={location}
              toggleDropdown={toggleDropdown}
              openDropdown={openDropdown}
              getLocation={getLocation}
            />
          </div>

          {/* Mobile nav links */}
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block py-2 ${
                  isActive ? "text-red-600 font-semibold" : "text-gray-800"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
