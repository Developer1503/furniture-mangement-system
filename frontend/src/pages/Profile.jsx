// Frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaSave, FaEdit } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

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
        // Get current auth user
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) {
          // Fallback to localStorage
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser) {
            setFormData({
              name: storedUser.name || '',
              email: storedUser.email || '',
              phone: '',
              location: '',
              language: '',
            });
          }
          return;
        }

        // Fetch from users table
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();

        if (error) throw error;

        if (userData) {
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            location: userData.location || '',
            language: userData.language || '',
          });
          setPreviewImage(userData.profile_picture || null);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file);

      if (error) {
        console.warn('Storage upload warning:', error.message);
        // Still set local preview even if storage fails
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      setFormData((prevData) => ({
        ...prevData,
        profilePicture: publicUrl,
      }));
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        setMessage('Not authenticated');
        return;
      }

      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        language: formData.language,
      };

      if (formData.profilePicture) {
        updateData.profile_picture = formData.profilePicture;
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', authUser.id);

      if (error) throw error;

      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...storedUser, name: formData.name, email: formData.email }));

      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/3 flex flex-col items-center mb-4 md:mb-0">
        <div className="relative w-32 h-32">
          <img
            src={previewImage || 'https://via.placeholder.com/128'}
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
        {message && <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
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
