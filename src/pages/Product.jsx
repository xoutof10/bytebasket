import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";

function Product() {
  const { data, fetchAllProducts } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  /* ---------------------- Fetch Products ---------------------- */
  useEffect(() => {
    fetchAllProducts();
  }, []);

  /* ---------------------- Handlers ---------------------- */
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  /* ---------------------- Filtered Products ---------------------- */
  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">

        {/* ---------------------- Filter Sidebar ---------------------- */}
        <div className="md:w-72 lg:w-80 flex-shrink-0">
          <Filter
            search={search}
            setSearch={setSearch}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            category={category}
            setCategory={setCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>

        {/* ---------------------- Products Grid ---------------------- */}
        <div className="flex-1">
          {filteredData?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredData.map((d, i) => (
                <div key={i}>
                  <ProductCard product={d} />
                </div>
              ))}
            </div>
          ) : (
            // loading - empty state
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-ring loading-xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
