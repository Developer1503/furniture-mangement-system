// src/pages/Office.jsx
import React from 'react';
import { products } from '../assets/assets';

const Office = () => {
  // Filter products for the Office category
  const officeProducts = products.filter(product => product.category === "Office");

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Roboto, sans-serif' }}>
        Office Furniture
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {officeProducts.map(product => (
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

export default Office;
