import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    bestseller: false,
    image: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct({
      ...product,
      image: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/admin/products', product, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/admin');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bestseller</label>
          <input
            type="checkbox"
            name="bestseller"
            checked={product.bestseller}
            onChange={(e) => setProduct({ ...product, bestseller: e.target.checked })}
            className="mr-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Images</label>
          <input
            type="file"
            name="image"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded bg-gray-100"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
