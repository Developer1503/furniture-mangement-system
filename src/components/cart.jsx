import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

function Cart() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId));
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {user ? (
        <div>
          {cart.length > 0 ? (
            <ul>
              {cart.map(product => (
                <li key={product.id}>
                  {product.name} - {product.price}
                  <button onClick={() => removeFromCart(product.id)}>Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      ) : (
        <p>Please sign in to view your cart.</p>
      )}
    </div>
  );
}

export default Cart;
