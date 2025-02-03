import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Checkout = () => {
  const { cart, currency, delivery_fee, clearCart } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    let error = '';
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email format';
    } else if (name === 'phone' && !/^\d{10}$/.test(value)) {
      error = 'Invalid phone number format';
    } else if (name === 'zipcode' && !/^[1-9][0-9]{5}$/.test(value)) {
      error = 'Invalid postal code format';
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);

    // Clear the form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      phone: '',
    });
    setErrors({});

    // Clear the cart
    clearCart();

    // Navigate to a confirmation page or home page
    navigate('/');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex space-x-8">
        {/* Delivery Information */}
        <div className="w-1/2 pr-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">DELIVERY INFORMATION</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label htmlFor="firstName" className="block mb-1">First Name*</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-2 border rounded bg-gray-100"
                  onChange={handleChange}
                  value={formData.firstName}
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block mb-1">Last Name*</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-2 border rounded bg-gray-100"
                  onChange={handleChange}
                  value={formData.lastName}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-2 border rounded bg-gray-100"
                onChange={handleChange}
                value={formData.email}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1">Street Address*</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Street Address"
                className="w-full p-2 border rounded bg-gray-100"
                onChange={handleChange}
                value={formData.address}
                required
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label htmlFor="city" className="block mb-1">City*</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  className="w-full p-2 border rounded bg-gray-100"
                  onChange={handleChange}
                  value={formData.city}
                  required
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div className="w-1/2">
                <label htmlFor="state" className="block mb-1">State*</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  className="w-full p-2 border rounded bg-gray-100"
                  onChange={handleChange}
                  value={formData.state}
                  required
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label htmlFor="zipcode" className="block mb-1">Zipcode*</label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="Zipcode"
                  className="w-full p-2 border rounded bg-gray-100"
                  onChange={handleChange}
                  value={formData.zipcode}
                  required
                />
                {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
              </div>
              <div className="w-1/2">
                <label htmlFor="country" className="block mb-1">Country*</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  className="w-full p-2 border rounded bg-gray-100"
                  onChange={handleChange}
                  value={formData.country}
                  required
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-1">Phone Number*</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-2 border rounded bg-gray-100"
                onChange={handleChange}
                value={formData.phone}
                required
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 mt-6">PLACE ORDER</button>
            <Link to="/cart" className="block text-center mt-4 text-blue-500 hover:underline">Return to Cart</Link>
          </form>
        </div>

        {/* Cart Totals and Payment Method */}
        <div className="w-1/2 pl-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">CART TOTALS</h2>
          <div className="mb-4">
            <p>Subtotal ({cart.length} items): {currency}{calculateTotal().toFixed(2)}</p>
            <p>Shipping Fee: {currency}{delivery_fee.toFixed(2)}</p>
            <p>Total: {currency}{(calculateTotal() + delivery_fee).toFixed(2)}</p>
          </div>
          <h2 className="text-2xl font-bold mb-6">PAYMENT METHOD</h2>
          <div className="mb-4">
            <label className="block mb-2 flex items-center">
              <input type="radio" name="paymentMethod" value="stripe" className="mr-2" />
              <img src={assets.stripe} alt="Stripe" className="h-6 mr-2" />
              Stripe
              <span className="ml-2 text-gray-500">(Secure online payment)</span>
            </label>
            <label className="block mb-2 flex items-center">
              <input type="radio" name="paymentMethod" value="razorpay" className="mr-2" />
              <img src={assets.razorpay} alt="Razorpay" className="h-6 mr-2" />
              Razorpay
              <span className="ml-2 text-gray-500">(Secure online payment)</span>
            </label>
            <label className="block mb-2 flex items-center">
              <input type="radio" name="paymentMethod" value="cashOnDelivery" className="mr-2" />
              <img src={assets.cash} alt="Cash" className="h-6 mr-2" />
              Cash on Delivery
              <span className="ml-2 text-gray-500">(Pay when you receive the order)</span>
            </label>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">Estimated Delivery Date: TBD</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
