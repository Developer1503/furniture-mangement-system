import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductDetail from '../components/ProductDetail';

const ProductPage = () => {
  const { productId } = useParams();
  const { getProductById } = useContext(ShopContext);
  const product = getProductById(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDetail productId={productId} />
    </div>
  );
};

export default ProductPage;
