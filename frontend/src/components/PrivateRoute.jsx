import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PrivateRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          setAuthenticated(true);

          // Prefer DB role over localStorage (authoritative source)
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();

          const resolvedRole = userData?.role || 'customer';
          setUserRole(resolvedRole);

          // Keep localStorage in sync
          const localUser = JSON.parse(localStorage.getItem('user') || '{}');
          localStorage.setItem('user', JSON.stringify({ ...localUser, role: resolvedRole }));
        } else {
          // Fallback: localStorage token (backward compat)
          const token = localStorage.getItem('token');
          if (token) {
            setAuthenticated(true);
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setUserRole(user?.role || 'customer');
          }
        }
      } catch (err) {
        console.error('PrivateRoute auth check error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', fontFamily: "'Outfit', sans-serif",
        color: '#C9A84C', fontSize: '1rem', gap: '10px',
      }}>
        <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
        Verifying access…
      </div>
    );
  }

  if (!authenticated) return <Navigate to="/auth" />;
  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;

