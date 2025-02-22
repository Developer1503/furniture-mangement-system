import React, { useState } from 'react';
import antroLogo from '../assets/Antro_transparent.png'; // Adjust the path as necessary

const Ai_gen = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the query submission
    console.log('Query submitted:', query);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#1e1e1e', color: '#fff', fontFamily: 'Arial, sans-serif', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={antroLogo}
        alt="ANTRO Logo"
        style={{ width: '150px', marginBottom: '2rem' }}
      />
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ask anything"
          style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '4px 0 0 4px', backgroundColor: '#333', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '0 4px 4px 0', backgroundColor: '#555', color: '#fff', cursor: 'pointer' }}>Search</button>
      </form>
    </div>
  );
};

export default Ai_gen;
