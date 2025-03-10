// frontend/src/pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profilePicture: '',
    username: '',
    role: 'customer', // Default role to 'customer'
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
    } else if (name === 'password' && value.length < 6) {
      error = 'Password must be at least 6 characters';
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp ? 'http://localhost:4000/api/user/register' : 'http://localhost:4000/api/user/login';
      const response = await axios.post(url, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/profile'); // Redirect to profile page after successful login
      }
    } catch (error) {
      setErrors({ msg: error.response.data.msg });
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      profilePicture: '',
      username: '',
      role: 'customer', // Default role to 'customer'
    });
    setErrors({});
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/api/auth/google';
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center relative">
            {isSignUp ? 'Sign Up' : 'Login'}
            <span className="block w-16 h-1 bg-black mt-2 mx-auto"></span>
          </h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="profilePicture"
                    placeholder="Profile Picture URL"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.profilePicture}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.username}
                  />
                </div>
                <div className="mb-4">
                  <select
                    name="role"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.role}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}
            {!isSignUp && (
              <>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded bg-gray-100"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </>
            )}
            <div className="flex justify-between mb-4">
              <button type="button" onClick={toggleForm} className="text-blue-500 hover:underline">
                {isSignUp ? 'Login Here' : 'Create account'}
              </button>
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            {errors.msg && <p className="text-red-500 text-xs mt-1">{errors.msg}</p>}
          </form>
          <div className="mt-4 flex justify-center space-x-4">
            <button onClick={handleGoogleLogin} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Login with Google<img src={'Glogo'} alt="Google Logo" className="w-4 h-4 inline-block ml-2" />

            </button>
          </div>
        </div>
      </div>
  );
};

export default Auth;
