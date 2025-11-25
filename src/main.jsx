import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./context/DataContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ScrollToTop from "react-scroll-to-top";



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <DataProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
          <ScrollToTop color="white" smooth style={{background:"#E53935", display:"flex", alignItems:"center", justifyContent:"center"}}/>
        </ClerkProvider>
      </DataProvider>
    </CartProvider>
  </StrictMode>
);
