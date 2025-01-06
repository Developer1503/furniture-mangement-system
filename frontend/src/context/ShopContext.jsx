import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [productsState] = useState(products);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const currency = '$';
  const delivery_fee = 10;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getProductById = (productId) => {
    return productsState.find(product => product._id === productId);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = productsState.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const value = {
    products: filteredProducts,
    cart,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getProductById,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
