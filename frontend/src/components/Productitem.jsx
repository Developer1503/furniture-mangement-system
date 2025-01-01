// src/components/ProductItem.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-gray-700 hover:text-gray-900'>
      <div className='bg-[#FEF9EC] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105'>
        <img className='w-full h-48 object-cover' src={image[0]} alt={name} />
        <div className='p-4'>
          <h2 className='text-lg font-semibold'>{name}</h2>
          <p className='text-gray-700'>{currency}{price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
