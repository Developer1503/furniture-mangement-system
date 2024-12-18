import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function ProductCard({ product }) {
  const { user } = useContext(AuthContext);

  const addToCart = () => {
    // Handle adding the product to the cart
    console.log('Added to cart:', product);
  };

  return (
    <div className="card">
      <img src={process.env.PUBLIC_URL + product.image} alt={product.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.price}</p>
        {user ? (
          <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
        ) : (
          <button className="btn btn-primary" disabled>Sign In to Add to Cart</button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
