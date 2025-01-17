import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setProfilePicture(response.data.profilePicture);
        setUsername(response.data.username);
        setShippingAddress(response.data.shippingAddress || {});
        setBillingAddress(response.data.billingAddress || {});
      } catch (error) {
        setMessage('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        '/api/user/profile',
        { name, email, phone, profilePicture, username, shippingAddress, billingAddress },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage(response.data.msg);
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.put(
        '/api/user/profile/password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage(response.data.msg);
    } catch (error) {
      setMessage('Error updating password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Personal Information</h2>
        <div className="mb-2">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Profile Picture</label>
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Address Information</h2>
        <div className="mb-2">
          <label className="block mb-1">Shipping Address</label>
          {shippingAddress && (
            <>
              <input
                type="text"
                value={shippingAddress.street || ''}
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100"
                placeholder="Street"
              />
              <input
                type="text"
                value={shippingAddress.city || ''}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 mt-2"
                placeholder="City"
              />
              <input
                type="text"
                value={shippingAddress.state || ''}
                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 mt-2"
                placeholder="State"
              />
              <input
                type="text"
                value={shippingAddress.zipcode || ''}
                onChange={(e) => setShippingAddress({ ...shippingAddress, zipcode: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 mt-2"
                placeholder="Zipcode"
              />
              <input
                type="text"
                value={shippingAddress.country || ''}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 mt-2"
                placeholder="Country"
              />
            </>
          )}
        </div>
        <div className="mb-2">
          <label className="block mb-1">Billing Address</label>
          {billingAddress && (
            <>
              <input
                type="text"
                value={billingAddress.street || ''}
                onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100"
                placeholder="Street"
              />
              <input
                type="text"
                value={billingAddress.city || ''}
                onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 mt-2"
                placeholder="City"
              />
              <input
                type="text"
                value={billingAddress.state || ''}
                onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 mt-2"
                placeholder="State"
              />
              <input
                type="text"
                value={billingAddress.zipcode || ''}
                onChange={(e) => setBillingAddress({ ...billingAddress, zipcode: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 mt-2"
                placeholder="Zipcode"
              />
              <input
                type="text"
                value={billingAddress.country || ''}
                onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 mt-2"
                placeholder="Country"
              />
            </>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Account Details</h2>
        <div className="mb-2">
          <label className="block mb-1">Account Creation Date</label>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="mb-2">
          <label className="block mb-1">Last Login</label>
          <p>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</p>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Order History</h2>
        {/* Implement order history display here */}
      </div>
      <button onClick={updateProfile} className="bg-blue-500 text-white py-2 px-4 rounded">
        Update Profile
      </button>
      <form onSubmit={updatePassword} className="mt-4">
        <div className="mb-4">
          <label className="block mb-2">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Password
        </button>
      </form>
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
        Logout
      </button>
    </div>
  );
};

export default Profile;
