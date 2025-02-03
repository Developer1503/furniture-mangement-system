import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    language: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profilePicture: null,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFormData((prevData) => ({
          ...prevData,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone || '',
          location: response.data.location || '',
          language: response.data.language || '',
          profilePicture: response.data.profilePicture || '',
        }));
        setPreviewImage(response.data.profilePicture || null);
      } catch (error) {
        setMessage('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('language', formData.language);
      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      const response = await axios.put('http://localhost:4000/api/user/profile', formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.msg);
      setSuccess(true);
      setPreviewImage(response.data.profilePicture); // Update the preview image with the new profile picture URL
    } catch (error) {
      setMessage('Error updating profile');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setError(true);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.put(
        'http://localhost:4000/api/user/profile/password',
        { currentPassword: formData.currentPassword, newPassword: formData.newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage(response.data.msg);
      setSuccess(true);
    } catch (error) {
      setMessage('Error updating password');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        {previewImage && (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={previewImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
        )}
      </div>
      {message && <p className={`mb-4 ${success ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Personal Information</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Location/Time Zone</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Language Preferences</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                className="w-full p-2 border rounded bg-gray-100"
              />
              {previewImage && (
                <img src={previewImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Security Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Security Settings</h2>
          <form onSubmit={handlePasswordSubmit} className="mb-4">
            <div className="mb-4">
              <label className="block mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
