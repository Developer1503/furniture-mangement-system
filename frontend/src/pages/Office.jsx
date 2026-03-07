import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Office = () => {
  const { products } = useContext(ShopContext);

  // Filter products for the Office category
  const officeProducts = products.filter(product => product.category === "Office");

  // State for sorting
  const [sortedProducts, setSortedProducts] = useState(officeProducts);
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'ascending' });

  const navigate = useNavigate();

  useEffect(() => {
    setSortedProducts(officeProducts);
  }, [products]);

  // Sorting functions
  const sortProducts = (key, direction) => {
    const sorted = [...officeProducts].sort((a, b) => {
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
    <div className="category-page">
      <div className="category-page__header">
        <h1 className="category-page__title">Office Furniture</h1>
        <div className="category-page__accent" />
        <div className="category-page__controls">
          <span className="category-page__sort-label">Sort by</span>
          <select
            className="category-page__sort-select"
            onChange={(e) => sortProducts(e.target.value.split('-')[0], e.target.value.split('-')[1])}
          >
            <option value="price-ascending">Price (Low to High)</option>
            <option value="price-descending">Price (High to Low)</option>
            <option value="date-ascending">Date (Oldest)</option>
            <option value="date-descending">Date (Newest)</option>
            <option value="bestseller-ascending">Bestsellers</option>
          </select>
        </div>
      </div>

      <div className="grid-container">
        {sortedProducts.map((product, index) => (
          <div
            key={product._id}
            className="grid-item"
            onClick={() => handleProductClick(product)}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <div className="grid-item__image-wrapper">
              <img
                src={product.image[0]}
                alt={product.name}
                className="product-image"
              />
              <span className="grid-item__quick-view">View Details</span>
            </div>
            <div className="grid-item__content">
              <h2 className="grid-item__name">{product.name}</h2>
              <p className="grid-item__description">{product.description}</p>
              <p className="grid-item__price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Office;
