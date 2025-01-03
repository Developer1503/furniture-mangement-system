import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, currency, removeFromCart, updateQuantity } = useContext(ShopContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {cart.length === 0 ? (
          <div className="text-center flex-1">
            <p className="text-lg mb-4">Your cart is empty.</p>
            <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Continue Shopping</Link>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 mb-4">
                  <img src={item.image[0]} alt={item.name} className="w-24 h-24 object-cover" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{item.name}</h2>
                      <p className="text-gray-700">{currency}{item.price}</p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                      <p className="text-gray-700">{item.inStock ? 'In Stock' : 'Out of Stock'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => removeFromCart(item._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Save for Later</button>
                      <div className="flex gap-2">
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">+</button>
                        <button onClick={() => updateQuantity(item._id, Math.max(item.quantity - 1, 1))} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">-</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-gray-100 p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <p className="text-gray-700">Subtotal: {currency}{calculateTotal().toFixed(2)}</p>
              <p className="text-gray-700">Shipping: Calculate</p>
              <p className="text-gray-700">Tax: TBD</p>
              <p className="text-gray-700">Total: {currency}{calculateTotal().toFixed(2)}</p>
              <p className="text-gray-700 mt-4">Estimated Delivery Date: TBD</p>
              <input type="text" placeholder="Coupon/Promo Code" className="mt-2 p-2 border rounded w-full" />
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">Apply Coupon</button>
              <div className="mt-4">
                <p className="text-gray-700">Accepted Payment Methods:</p>
                <div className="flex gap-2">
                  <img src="rizz/ritluvbab" alt="razorpay" className="h-8" />
                  <img src="no/cap" alt="gpay" className="h-8" />
                  <img src="rit/luv/bab" alt="mastercard" className="h-8" />
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
