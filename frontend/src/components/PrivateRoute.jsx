import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PrivateRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Check Supabase session
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setAuthenticated(true);
        // Get role from localStorage (set during login)
        const user = JSON.parse(localStorage.getItem('user'));
        setUserRole(user?.role || 'customer');
      } else {
        // Fallback to localStorage token (for backward compatibility)
        const token = localStorage.getItem('token');
        if (token) {
          setAuthenticated(true);
          const user = JSON.parse(localStorage.getItem('user'));
          setUserRole(user?.role || 'customer');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/auth" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default PrivateRoute;
