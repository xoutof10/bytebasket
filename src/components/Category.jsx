import React from "react";
import { useData } from "../context/DataContext";

function Category() {
  const { data } = useData();

  const categories = data?.length
    ? [...new Set(data.map((item) => item?.category).filter(Boolean))]
    : [];

  return (
    <section className="py-8 sm:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* --------- Header --------- */}
        <header className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-0 text-center sm:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            Categories
          </h2>

          {categories.length > 0 && (
            <span className="text-xs sm:text-sm text-gray-500">
              {categories.length} total
            </span>
          )}
        </header>

        {/* -------- Category List ---------- */}
        {categories.length > 0 ? (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base text-gray-700 border border-gray-200 shadow-sm hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {/* category dot */}
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-400" />
                {category}
              </span>
            ))}
          </div>
        ) : (
          /* ------------- Empty State -------------- */
          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 text-center">
            <p className="text-gray-500 text-xs sm:text-sm">
              No categories available yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Category;
