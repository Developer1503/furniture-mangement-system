// Frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaSave, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    language: '',
    profilePicture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone || '',
          location: response.data.location || '',
          language: response.data.language || '',
        });
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

      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:4000/api/user/profile', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.msg);
      setPreviewImage(response.data.user.profilePicture);
      setIsEditing(false);
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/3 flex flex-col items-center mb-4 md:mb-0">
        <div className="relative w-32 h-32">
          <img
            src={previewImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-300"
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer">
            <FaCamera className="text-gray-600" onClick={() => setIsEditing(true)} />
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
        >
          Logout
        </button>
      </div>
      <div className="w-full md:w-2/3 md:pl-8">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-between">
          Profile
          <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setIsEditing(true)} />
        </h1>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-right pr-4">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-100"
              required
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-right pr-4">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-100"
              required
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-right pr-4">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-100"
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-right pr-4">Location/Time Zone</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-100"
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-right pr-4">Language Preferences</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-100"
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/4 text-right pr-4">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full p-2 border rounded bg-gray-100"
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center">
              <FaSave className="mr-2" /> {loading ? 'Updating...' : 'Save Changes'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
