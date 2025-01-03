import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ShopContext } from '../context/ShopContext';
import { Rating } from 'react-simple-star-rating';

const ProductInfo = ({ productId }) => {
  const { getProductById, currency, addToCart } = useContext(ShopContext);
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : '#fff');
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, description, price, isOnSale, salePercent, category, date, dimensions, weightCapacity, materials, warranty, reviews, specifications, features, colors } = product;

  // Ensure price and salePercent are defined
  const discount = salePercent !== undefined ? salePercent : 1;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <InfoWrapper>
      <div className="product-info">
        <div className="left-section">
          {product.bestseller && <span className="bestseller-badge">BESTSELLER</span>}
          <span className="category-label">{category}</span>
          <h2 className="product-name">{name}</h2>
          <div className="tabs">
            <button className={activeTab === 'description' ? 'active' : ''} onClick={() => handleTabChange('description')}>Description</button>
            <button className={activeTab === 'specifications' ? 'active' : ''} onClick={() => handleTabChange('specifications')}>Specifications</button>
            <button className={activeTab === 'features' ? 'active' : ''} onClick={() => handleTabChange('features')}>Features</button>
          </div>
          {activeTab === 'description' && <p className="product-description">{description}</p>}
          {activeTab === 'specifications' && (
            <div className="specifications">
              <p><strong>Dimensions:</strong> {dimensions || 'N/A'}</p>
              <p><strong>Weight Capacity:</strong> {weightCapacity || 'N/A'}</p>
              <p><strong>Materials:</strong> {materials || 'N/A'}</p>
            </div>
          )}
          {activeTab === 'features' && (
            <ul className="features">
              {features && features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
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
          {colors && (
            <div className="color-options">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          )}
          <div className="quantity-selector">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>ADD TO CART</button>
        </div>
        <div className="right-section">
          <div className="cta-section">
            <button className="buy-now">BUY NOW</button>
            <button className="save-for-later">SAVE FOR LATER</button>
            <p className="delivery-date">Delivered by: 2023-01-15</p>
            <p className="shipping-costs">Estimated Shipping: $10.00</p>
          </div>
          <div className="additional-info">
            <p><strong>Warranty:</strong> {warranty || 'N/A'}</p>
          </div>
          <div className="trust-elements">
            <p>100% Genuine Product</p>
            <p>Free Delivery Available</p>
            <p>7-Day Easy Return Policy</p>
          </div>
          <div className="reviews">
            <h3>Customer Reviews ({reviews ? reviews.length : 0})</h3>
            {reviews && reviews.map((review, index) => (
              <div key={index} className="review">
                <Rating initialValue={review.rating} readonly />
                <p><strong>{review.user}</strong></p>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
    }

    .left-section {
      width: 100%;

      @media screen and (min-width: 768px) {
        width: 60%;
        margin-right: 2rem;
      }

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
      .tabs {
        display: flex;
        margin-bottom: 1rem;
        button {
          background: none;
          border: none;
          cursor: pointer;
          margin-right: 1rem;
          font-size: 1rem;
          font-weight: bold;
          &.active {
            border-bottom: 2px solid #007bff;
            color: #007bff;
          }
        }
      }
      .product-description, .specifications, .features {
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
      .color-options {
        display: flex;
        margin-bottom: 1rem;
        .color-option {
          width: 2rem;
          height: 2rem;
          margin-right: 0.5rem;
          cursor: pointer;
          border: 2px solid #ccc;
        }
        .color-option.selected {
          border: 2px solid #007bff;
        }
      }
      .quantity-selector {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        button {
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          padding: 0.5rem;
          cursor: pointer;
        }
        span {
          margin: 0 0.5rem;
        }
      }
      .add-to-cart {
        background-color: #007bff;
        color: #fff;
        padding: 0.7rem 1.4rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        margin-top: 1rem;
        cursor: pointer;
      }
    }

    .right-section {
      width: 100%;

      @media screen and (min-width: 768px) {
        width: 40%;
      }

      .cta-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 2rem;
        .buy-now, .save-for-later {
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
        .save-for-later {
          background-color: #ffc107;
        }
        .delivery-date {
          font-size: 1rem;
          color: #555;
          margin-top: 1rem;
        }
        .shipping-costs {
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
      }
      .trust-elements {
        margin-top: 2rem;
        p {
          font-size: 1rem;
          color: #555;
        }
      }
      .reviews {
        margin-top: 2rem;
        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .review {
          margin-bottom: 1rem;
          p {
            margin: 0.5rem 0;
          }
        }
      }
    }
  }
`;

ProductInfo.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductInfo;
