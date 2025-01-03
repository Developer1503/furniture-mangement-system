import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [productsState] = useState(products);
  const currency = '$';
  const delivery_fee = 10;

  const getProductById = (productId) => {
    return productsState.find(product => product._id === productId);
  };

  const value = {
    products: productsState,
    currency,
    delivery_fee,
    getProductById,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
