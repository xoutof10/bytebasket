import { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  /* ---------------------- Fetch All Products ---------------------- */
  const fetchAllProducts = async () => {
    try {
      // fetch multiple product categories at once
      const [resAccessories, resSmartPhones, resLaptops, resTablets] =
        await Promise.all([
          axios.get("https://dummyjson.com/products/category/mobile-accessories"),
          axios.get("https://dummyjson.com/products/category/smartphones"),
          axios.get("https://dummyjson.com/products/category/laptops"),
          axios.get("https://dummyjson.com/products/category/tablets"),
        ]);

      // merge all products into a single array
      const merged = [
        ...(resAccessories.data.products || []),
        ...(resSmartPhones.data.products || []),
        ...(resLaptops.data.products || []),
        ...(resTablets.data.products || []),
      ];

      setData(merged);
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
