import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ShopContext } from '../context/ShopContext';

const ProductInfo = ({ productId }) => {
  const { getProductById, currency } = useContext(ShopContext);
  const product = getProductById(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, description, price, isOnSale, salePercent, category, date } = product;

  // Ensure price and salePercent are defined
  const discount = salePercent !== undefined ? salePercent : 1;

  return (
    <InfoWrapper>
      <div className="product-info">
        {product.bestseller && <span className="bestseller-badge">BESTSELLER</span>}
        <span className="category-label">{category}</span>
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <div className="pricing">
          <p className="price">
            {currency}
            {isOnSale && price !== undefined && discount !== undefined
              ? (price * discount).toFixed(2)
              : price.toFixed(2)}
          </p>
          {isOnSale && discount !== undefined && (
            <p className="percent">{(discount * 100).toFixed(2)}% off</p>
          )}
          {isOnSale && price !== undefined && (
            <p className="original-price">{currency}{price.toFixed(2)}</p>
          )}
        </div>
        <div className="cta-section">
          <button className="add-to-cart">ADD TO CART</button>
          <button className="buy-now">BUY NOW</button>
          <p className="delivery-date">Delivered by: 2023-01-15</p>
        </div>
        <div className="additional-info">
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Date Added:</strong> {date}</p>
          <p><strong>Highlights:</strong></p>
          <ul>
            <li>Comfortable cushion</li>
            <li>Sturdy wooden frame</li>
            <li>Minimalist design</li>
          </ul>
        </div>
        <div className="trust-elements">
          <p>100% Genuine Product</p>
          <p>Free Delivery Available</p>
          <p>7-Day Easy Return Policy</p>
        </div>
      </div>
    </InfoWrapper>
  );
};

const InfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.4rem;

  @media screen and (min-width: 600px) {
    padding: 2.4rem 4rem;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto;
  }

  .product-info {
    width: 100%;
    .bestseller-badge {
      background-color: #ffd700;
      color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
      font-weight: bold;
      margin-bottom: 1rem;
      display: inline-block;
    }
    .category-label {
      font-size: 1rem;
      color: #888;
      margin-bottom: 0.5rem;
      display: block;
    }
    .product-name {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    .product-description {
      font-size: 1.5rem;
      color: hsl(var(--dark-grayish-blue));
      line-height: 2.5rem;
      margin-bottom: 2.4rem;
    }
    .pricing {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      .price {
        font-size: 2.8rem;
        font-weight: 700;
        margin-right: 1rem;
      }
      .percent {
        color: hsl(var(--orange));
        background-color: hsl(var(--pale-orange));
        font-size: 1.6rem;
        font-weight: 700;
        padding: 0.7rem 0.8rem;
        border-radius: 0.6rem;
        margin-right: 1rem;
      }
      .original-price {
        text-decoration: line-through;
        font-size: 1.6rem;
        font-weight: 700;
        color: hsl(var(--grayish-blue));
      }
    }
    .cta-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .add-to-cart, .buy-now {
        background-color: #007bff;
        color: #fff;
        padding: 0.7rem 1.4rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
      }
      .buy-now {
        background-color: #28a745;
      }
      .delivery-date {
        font-size: 1rem;
        color: #555;
      }
    }
    .additional-info {
      margin-top: 2rem;
      p {
        font-size: 1rem;
        color: #555;
      }
      ul {
        list-style-type: none;
        padding: 0;
        li {
          margin-bottom: 0.5rem;
        }
      }
    }
    .trust-elements {
      margin-top: 2rem;
      p {
        font-size: 1rem;
        color: #555;
      }
    }
  }
`;

ProductInfo.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductInfo;
