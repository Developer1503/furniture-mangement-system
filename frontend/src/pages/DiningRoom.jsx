// src/pages/DiningRoom.jsx
import React, { useState } from 'react';
import { products } from '../assets/assets'; // Ensure this path is correct

const DiningRoom = () => {
  // Filter products for the Dining Room category
  const diningRoomProducts = products.filter(product => product.category === "Dining room");

  // State for sorting
  const [sortedProducts, setSortedProducts] = useState(diningRoomProducts);
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'ascending' });

  // Sorting functions
  const sortProducts = (key, direction) => {
    const sorted = [...diningRoomProducts].sort((a, b) => {
      if (key === 'price' || key === 'date') {
        return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
      } else if (key === 'bestseller') {
        return direction === 'ascending' ? (a.bestseller === b.bestseller ? 0 : a.bestseller ? -1 : 1) : (a.bestseller === b.bestseller ? 0 : a.bestseller ? 1 : -1);
      }
    });
    setSortedProducts(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Roboto, sans-serif' }}>
        Dining Room Furniture
      </h1>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <select
          onChange={(e) => sortProducts(e.target.value.split('-')[0], e.target.value.split('-')[1])}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
        >
          <option value="price-ascending">Sort by Price (Asc)</option>
          <option value="price-descending">Sort by Price (Desc)</option>
          <option value="date-ascending">Sort by Date (Asc)</option>
          <option value="date-descending">Sort by Date (Desc)</option>
          <option value="bestseller-ascending">Show Bestsellers</option>
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {sortedProducts.map(product => (
          <div
            key={product._id}
            style={{
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={product.image[0]}
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{product.name}</h2>
              <p style={{ color: '#6B7280' }}>{product.description}</p>
              <p style={{ color: '#111827', fontWeight: 'bold' }}>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiningRoom;
