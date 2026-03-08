// frontend/src/pages/Auth.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';

/* ─── Role pill options ─────────────────────────────────────── */
const ROLES = [
  { value: 'customer', label: 'User', icon: '👤' },
  { value: 'admin', label: 'Admin', icon: '🛡️' },
];

/* ─── Inline styles (avoids Tailwind purge issues) ─────────── */
const S = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1209 0%, #2d1f00 40%, #1a1209 100%)',
    padding: '20px',
    fontFamily: "'Outfit', 'Inter', sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: '24px',
    padding: '40px 36px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  logoText: {
    fontSize: '2rem',
    fontWeight: '800',
    letterSpacing: '-0.04em',
    background: 'linear-gradient(90deg, #C9A84C, #f0d080)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoSub: {
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    marginTop: '2px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '6px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    marginBottom: '28px',
  },
  /* Role pills */
  rolePillRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  rolePill: (active) => ({
    flex: 1,
    padding: '10px 0',
    borderRadius: '12px',
    border: active ? '2px solid #C9A84C' : '2px solid rgba(255,255,255,0.1)',
    background: active ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
    color: active ? '#C9A84C' : 'rgba(255,255,255,0.5)',
    fontWeight: active ? '600' : '400',
    fontSize: '0.88rem',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.25s ease',
    letterSpacing: '0.02em',
  }),
  /* Inputs */
  inputGroup: { marginBottom: '16px' },
  label: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: "'Outfit', sans-serif",
    boxSizing: 'border-box',
  },
  inputError: {
    border: '1.5px solid rgba(239,68,68,0.6)',
  },
  errorText: {
    color: '#f87171',
    fontSize: '0.75rem',
    marginTop: '4px',
  },
  /* Buttons */
  submitBtn: (loading) => ({
    width: '100%',
    padding: '13px',
    borderRadius: '12px',
    border: 'none',
    background: loading
      ? 'rgba(201,168,76,0.4)'
      : 'linear-gradient(135deg, #C9A84C, #8B6914)',
    color: '#fff',
    fontWeight: '700',
    fontSize: '0.95rem',
    cursor: loading ? 'not-allowed' : 'pointer',
    letterSpacing: '0.03em',
    marginTop: '8px',
    transition: 'opacity 0.2s, transform 0.1s',
    fontFamily: "'Outfit', sans-serif",
  }),
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '20px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
  },
  googleBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    border: '1.5px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
    fontWeight: '600',
    fontSize: '0.92rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background 0.2s, border-color 0.2s',
    fontFamily: "'Outfit', sans-serif",
  },
  toggleRow: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.4)',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#C9A84C',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '0 4px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
  },
  globalError: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#f87171',
    fontSize: '0.82rem',
    marginTop: '12px',
    textAlign: 'center',
  },
};

/* ─── Google SVG icon ───────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.3C29.4 35.5 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.5 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.2 5.3C37 38.5 44 33 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

/* ─── Component ─────────────────────────────────────────────── */
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', username: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  /* ── Handle Google OAuth redirect callback ──────────────── */
  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const user = session.user;

      // Upsert the user row so Google sign-in users get a record too
      const { data: existing } = await supabase
        .from('users')
        .select('id, role')
        .eq('id', user.id)
        .maybeSingle();

      if (!existing) {
        await supabase.from('users').insert([{
          id: user.id,
          name: user.user_metadata?.full_name || user.email,
          email: user.email,
          username: user.email.split('@')[0],
          phone: '',
          role: 'customer',
          password: 'managed-by-supabase-auth',
        }]);
      }

      const userRole = existing?.role || 'customer';

      localStorage.setItem('user', JSON.stringify({
        name: user.user_metadata?.full_name || user.email,
        email: user.email,
        role: userRole,
      }));
      localStorage.setItem('token', session.access_token);

      toast.success('Signed in with Google!');
      navigate(userRole === 'admin' ? '/admin' : '/profile');
    };

    handleAuthCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Field change + inline validation ───────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let error = '';
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
    if (name === 'password' && value && value.length < 6) error = 'Minimum 6 characters';
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  /* ── Submit (sign-up or sign-in) ────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        /* ---- Sign Up ---- */
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              username: formData.username,
              phone: formData.phone,
              role,
            },
          },
        });

        if (authError) throw authError;

        const { error: insertError } = await supabase.from('users').insert([{
          id: authData.user.id,
          name: formData.name,
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          role,
          password: 'managed-by-supabase-auth',
        }]);

        if (insertError && insertError.code !== '23505') {
          console.warn('Insert user row warning:', insertError.message);
        }

        localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email, role }));
        localStorage.setItem('token', authData.session?.access_token || 'authenticated');

        toast.success('Account created! Welcome aboard 🎉');
        navigate(role === 'admin' ? '/admin' : '/profile');

      } else {
        /* ---- Sign In ---- */
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (authError) throw authError;

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

        toast.success(`Welcome back${userInfo.name ? ', ' + userInfo.name : ''}!`);
        navigate(userInfo.role === 'admin' ? '/admin' : '/profile');
      }
    } catch (err) {
      setErrors({ msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  /* ── Google OAuth ───────────────────────────────────────── */
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      });
      if (error) throw error;
      // Browser will redirect — no further action needed here
    } catch (err) {
      setErrors({ msg: err.message });
      setGoogleLoading(false);
    }
  };

  /* ── Toggle between Login / Sign-Up ─────────────────────── */
  const toggleForm = () => {
    setIsSignUp(v => !v);
    setFormData({ name: '', email: '', password: '', phone: '', username: '' });
    setErrors({});
    setRole('customer');
  };

  /* ── Input helper ───────────────────────────────────────── */
  const Field = ({ label, name, type = 'text', placeholder, required = false }) => (
    <div style={S.inputGroup}>
      <label style={S.label}>{label}</label>
      <input
        id={`auth-${name}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        autoComplete={type === 'password' ? 'current-password' : 'on'}
        style={{
          ...S.input,
          ...(errors[name] ? S.inputError : {}),
        }}
        onFocus={e => (e.target.style.borderColor = '#C9A84C')}
        onBlur={e => (e.target.style.borderColor = errors[name] ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)')}
      />
      {errors[name] && <p style={S.errorText}>{errors[name]}</p>}
    </div>
  );

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Logo */}
        <div style={S.logo}>
          <div style={S.logoText}>ANTRO</div>
          <div style={S.logoSub}>Furniture &amp; Interiors</div>
        </div>

        {/* Title */}
        <h2 style={S.title}>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p style={S.subtitle}>
          {isSignUp
            ? 'Join ANTRO and explore premium furniture'
            : 'Sign in to continue to your account'}
        </p>

        {/* Role selector — only on sign-up */}
        {isSignUp && (
          <div>
            <label style={{ ...S.label, display: 'block', marginBottom: '8px' }}>Sign up as</label>
            <div style={S.rolePillRow}>
              {ROLES.map(r => (
                <button
                  key={r.value}
                  type="button"
                  id={`role-${r.value}`}
                  style={S.rolePill(role === r.value)}
                  onClick={() => setRole(r.value)}
                >
                  {r.icon} {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {isSignUp && (
            <>
              <Field label="Full Name" name="name" placeholder="John Doe" required />
              <Field label="Username" name="username" placeholder="johndoe" />
              <Field label="Phone Number" name="phone" placeholder="+91 98765 43210" />
            </>
          )}

          <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
          <Field label="Password" name="password" type="password" placeholder="••••••••" required />

          {/* Toggle link */}
          <div style={{ textAlign: 'right', marginBottom: '4px' }}>
            <button type="button" onClick={toggleForm} style={S.toggleBtn}>
              {isSignUp ? 'Already have an account?' : 'Create a new account'}
            </button>
          </div>

          {/* Submit */}
          <button
            id="auth-submit"
            type="submit"
            disabled={loading}
            style={S.submitBtn(loading)}
            onMouseEnter={e => !loading && (e.target.style.opacity = '0.9')}
            onMouseLeave={e => !loading && (e.target.style.opacity = '1')}
          >
            {loading ? '⏳ Please wait…' : (isSignUp ? `Create ${role === 'admin' ? 'Admin' : 'User'} Account` : 'Sign In')}
          </button>

          {errors.msg && <div style={S.globalError}>⚠️ {errors.msg}</div>}
        </form>

        {/* Divider */}
        <div style={S.divider}>
          <div style={S.dividerLine} />
          <span style={S.dividerText}>OR</span>
          <div style={S.dividerLine} />
        </div>

        {/* Google button */}
        <button
          id="auth-google"
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          style={{ ...S.googleBtn, opacity: googleLoading ? 0.6 : 1 }}
          onMouseEnter={e => !googleLoading && (e.target.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => !googleLoading && (e.target.style.background = 'rgba(255,255,255,0.06)')}
        >
          {googleLoading ? '⏳ Redirecting…' : <><GoogleIcon /> Continue with Google</>}
        </button>

        {/* Toggle row */}
        <div style={S.toggleRow}>
          {isSignUp ? 'Have an account? ' : "Don't have an account? "}
          <button type="button" onClick={toggleForm} style={S.toggleBtn}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;
