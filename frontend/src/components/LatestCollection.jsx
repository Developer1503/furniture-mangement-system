// src/pages/LatestCollection.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 9)); // Adjust to get 9 products for a 3x3 grid
  }, [products]);

  return (
    <div className='my-10 bg-[#FEF9EC] p-4 rounded-lg shadow-lg'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'NEW COLLECTION'} text2={''} className='font-bold' />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
          These products are made with wood from forests certified to be responsibly managed.
        </p>
      </div>

      {/* Latest Collection rendering */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {latestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
