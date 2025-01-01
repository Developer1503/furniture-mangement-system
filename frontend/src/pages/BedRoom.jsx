// src/pages/BedRoom.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const BedRoom = () => {
  useEffect(() => {
    console.log('BedRoom component rendered');
  }, []);

  const { products } = useContext(ShopContext);

  // Filter products for the Bedroom category
  const bedroomProducts = products.filter(product => product.category === "Bedroom");

  // State for sorting
  const [sortedProducts, setSortedProducts] = useState(bedroomProducts);
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'ascending' });

  const navigate = useNavigate();

  // Sorting functions
  const sortProducts = (key, direction) => {
    const sorted = [...bedroomProducts].sort((a, b) => {
      if (key === 'price' || key === 'date') {
        return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
      } else if (key === 'bestseller') {
        return direction === 'ascending' ? (a.bestseller === b.bestseller ? 0 : a.bestseller ? -1 : 1) : (a.bestseller === b.bestseller ? 0 : a.bestseller ? 1 : -1);
      }
    });
    setSortedProducts(sorted);
    setSortConfig({ key, direction });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Roboto, sans-serif' }}>
        Bedroom Furniture
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
      <div className="grid-container">
        {sortedProducts.map(product => (
          <div
            key={product._id}
            className="grid-item"
            onClick={() => handleProductClick(product)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="product-image"
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

export default BedRoom;
