// frontend/src/pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    username: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        // Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              username: formData.username,
              phone: formData.phone,
            },
          },
        });

        if (authError) throw authError;

        // Also insert into our users table
        const { error: insertError } = await supabase.from('users').insert([{
          id: authData.user.id,
          name: formData.name,
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          role: 'customer',
          password: 'managed-by-supabase-auth',
        }]);

        if (insertError && insertError.code !== '23505') {
          // Ignore duplicate key errors (user may already exist)
          console.warn('Insert user row warning:', insertError.message);
        }

        // Store user info
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: 'customer',
        }));
        localStorage.setItem('token', authData.session?.access_token || 'authenticated');
        navigate('/profile');
      } else {
        // Sign in with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (authError) throw authError;

        // Get user profile from our users table
        const { data: userData } = await supabase
          .from('users')
          .select('name, email, role')
          .eq('email', formData.email)
          .maybeSingle();

        const userInfo = userData || {
          name: authData.user.user_metadata?.name || formData.email,
          email: formData.email,
          role: 'customer',
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('token', authData.session?.access_token || 'authenticated');
        navigate('/profile');
      }
    } catch (error) {
      setErrors({ msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      username: '',
    });
    setErrors({});
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setErrors({ msg: error.message });
    }
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
                  name="username"
                  placeholder="Username"
                  className="w-full p-2 border rounded bg-gray-100"
                  onChange={handleChange}
                  value={formData.username}
                />
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
          {errors.msg && <p className="text-red-500 text-xs mt-1">{errors.msg}</p>}
        </form>
        <div className="mt-4 flex justify-center space-x-4">
          <button onClick={handleGoogleLogin} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
