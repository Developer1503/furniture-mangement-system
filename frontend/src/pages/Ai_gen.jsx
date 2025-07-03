import React, { useState } from 'react';
import antroLogo from '../assets/Antro_transparent.png'; // Adjust the path as necessary

const Ai_gen = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }
    setIsLoading(true);
    try {
      // Placeholder API call
      const response = await fetch('https://api.example.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      console.log('API response:', data);
    } catch (error) {
      setError('Failed to fetch results');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflow: 'hidden',
    }}>
      <img
        src={antroLogo}
        alt="ANTRO Logo"
        style={{
          width: '180px',
          marginBottom: '2.5rem',
          animation: 'scaleIn 0.5s ease-out',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
        }}
      />
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '700px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '0.5rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ask anything..."
          aria-label="Search query"
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            border: 'none',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
          }}
          onFocus={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            background: isLoading || !query.trim()
              ? 'rgba(255, 255, 255, 0.1)'
              : 'linear-gradient(45deg, #6200ea, #03a9f4)',
            color: '#fff',
            fontSize: '1rem',
            cursor: isLoading || !query.trim() ? 'not-allowed' : 'pointer',
            marginLeft: '0.5rem',
            transition: 'transform 0.2s ease, background 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          }}
          onMouseEnter={(e) => {
            if (!isLoading && query.trim()) {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && (
        <p style={{
          color: '#ff6b6b',
          marginTop: '1rem',
          fontSize: '0.9rem',
          animation: 'fadeIn 0.3s ease',
        }}>
          {error}
        </p>
      )}
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Ai_gen;