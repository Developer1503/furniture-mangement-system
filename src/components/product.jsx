import React, { useState } from 'react';
import ProductCard from './ProductCard';

function Products() {
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All',
    color: 'All',
    material: 'All',
    style: 'All',
    size: 'All',
    brand: 'All'
  });

  const products = [
    { id: 1, name: 'Best Sofa', price: '$1000.50', image: '/assets/images/card1.png', category: 'Sofas', color: 'Brown', material: 'Leather', style: 'Modern', size: 'Large', brand: 'Brand A' },
    { id: 2, name: 'New Sofa', price: '$100.50', image: '/assets/images/card2.png', category: 'Sofas', color: 'Gray', material: 'Fabric', style: 'Classic', size: 'Medium', brand: 'Brand B' },
    { id: 3, name: 'New Chair', price: '$300.20', image: '/assets/images/card3.png', category: 'Chairs', color: 'Black', material: 'Wood', style: 'Minimalist', size: 'Small', brand: 'Brand C' },
    { id: 4, name: 'Modern Chair', price: '$500.50', image: '/assets/images/card4.png', category: 'Chairs', color: 'White', material: 'Plastic', style: 'Modern', size: 'Medium', brand: 'Brand D' },
    { id: 5, name: 'Best Sofa', price: '$200.50', image: '/assets/images/card5.png', category: 'Sofas', color: 'Beige', material: 'Fabric', style: 'Classic', size: 'Large', brand: 'Brand E' },
    { id: 6, name: 'Sofa Chair', price: '$100.50', image: '/assets/images/card6.png', category: 'Chairs', color: 'Blue', material: 'Fabric', style: 'Modern', size: 'Medium', brand: 'Brand F' },
    { id: 7, name: 'Table Chair', price: '$150.50', image: '/assets/images/card1.png', category: 'Chairs', color: 'Red', material: 'Metal', style: 'Modern', size: 'Small', brand: 'Brand G' },
    { id: 8, name: 'Hanging Chair', price: '$500.60', image: '/assets/images/card1.png', category: 'Chairs', color: 'Green', material: 'Wood', style: 'Minimalist', size: 'Medium', brand: 'Brand H' }
  ];

  const filteredProducts = products.filter(product => {
    return (
      (filters.category === 'All' || product.category === filters.category) &&
      (filters.priceRange === 'All' || product.price <= filters.priceRange) &&
      (filters.color === 'All' || product.color === filters.color) &&
      (filters.material === 'All' || product.material === filters.material) &&
      (filters.style === 'All' || product.style === filters.style) &&
      (filters.size === 'All' || product.size === filters.size) &&
      (filters.brand === 'All' || product.brand === filters.brand)
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="filters">
            <h3>Filters</h3>
            <label>Category</label>
            <select name="category" onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Chairs">Chairs</option>
              <option value="Sofas">Sofas</option>
              <option value="Tables">Tables</option>
              <option value="Desks">Desks</option>
            </select>

            <label>Price Range</label>
            <select name="priceRange" onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="500">$0 - $500</option>
              <option value="1000">$500 - $1000</option>
              <option value="100000">$1000+</option>
            </select>

            <label>Color</label>
            <select name="color" onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Brown">Brown</option>
              <option value="Gray">Gray</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Beige">Beige</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
            </select>

            <label>Material</label>
            <select name="material" onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Leather">Leather</option>
              <option value="Fabric">Fabric</option>
              <option value="Wood">Wood</option>
              <option value="Plastic">Plastic</option>
              <option value="Metal">Metal</option>
            </select>

            <label>Style</label>
            <select name="style" onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Modern">Modern</option>
              <option value="Classic">Classic</option>
              <option value="Minimalist">Minimalist</option>
            </select>

            <label>Size</label>
            <select name="size" onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>

            <label>Brand</label>
            <select name="brand" onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Brand A">Brand A</option>
              <option value="Brand B">Brand B</option>
              <option value="Brand C">Brand C</option>
              <option value="Brand D">Brand D</option>
              <option value="Brand E">Brand E</option>
              <option value="Brand F">Brand F</option>
              <option value="Brand G">Brand G</option>
              <option value="Brand H">Brand H</option>
            </select>
          </div>
        </div>
        <div className="col-md-9">
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
