// src/pages/ProductDetail.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Roboto, sans-serif' }}>
        {product.name}
      </h1>
      <img
        src={product.image[0]}
        alt={product.name}
        style={{
          width: '100%',
          height: '400px',
          objectFit: 'cover',
          marginBottom: '1rem',
        }}
      />
      <p style={{ color: '#6B7280', marginBottom: '1rem' }}>{product.description}</p>
      <p style={{ color: '#111827', fontWeight: 'bold', fontSize: '1.5rem' }}>${product.price}</p>
      {product.bestseller && <p style={{ color: '#111827', fontWeight: 'bold', fontSize: '1.5rem' }}>Bestseller</p>}
    </div>
  );
};

export default ProductDetail;
