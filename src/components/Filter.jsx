import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";

// Sidebar filter for the product listing page:
// - Free-text search
// - Category selection
// - Price range slider
// Works responsively (collapsible on mobile, fixed on desktop).


function Filter({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  handleCategoryChange,
  setCategory,
}) {
  const { data } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const MIN_PRICE = 0;
  const MAX_PRICE = 5000;

  // Derive unique categories from the product data.
  // "All" is used as the default category.


  const categories = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const unique = new Set(data.map((item) => item?.category).filter(Boolean));
    return ["All", ...unique];
  }, [data]);

  return (
    <div className="w-full md:w-auto">
      {/* Mobile: filter toggle (shown only on small screens) */}
      <div className="mb-3 flex items-center justify-between px-2 md:hidden">
        <h1 className="text-sm font-semibold">Filter</h1>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded border px-3 py-1 text-xs"
        >
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>

      {/* Main filter card */}


      <div
        className={`
          w-full sm:w-80 md:w-72
          rounded-xl border border-gray-200 bg-white p-4
          flex flex-col gap-3
          shadow-lg hover:shadow-xl
          transition-shadow duration-300
          ${isOpen ? "block" : "hidden"} md:block
        `}
      >
        {/* Desktop header label */}


        <h1 className="hidden text-lg font-semibold md:block">Filter</h1>

        {/* Search input */}


        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
          className="mt-3 w-full rounded border px-3 py-3 text-sm focus:outline-none"
        />

        {/* Category list */}


        <div className="mt-3 h-auto space-y-2 overflow-y-auto pr-1">
          {categories.length > 0 ? (
            categories.map((c) => (
              <label
                key={c}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="category"
                  value={c}
                  checked={category === c}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 cursor-pointer accent-red-500"
                />
                {c}
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No categories found.</p>
          )}
        </div>

        {/* Price range + reset */}

        
        <div className="mt-3 flex flex-col gap-3 font-semibold">
          <label className="text-lg font-medium text-gray-700">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>

          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            aria-label="Filter by maximum price"
            className="w-full cursor-pointer accent-red-500"
          />

          {/* Reset all filters to defaults */}


          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setPriceRange([MIN_PRICE, MAX_PRICE]);
            }}
            className="w-full rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white cursor-pointer active:bg-red-700 hover:bg-red-500"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
