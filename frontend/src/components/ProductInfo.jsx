import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const ProductInfo = ({ productId }) => {
  const { getProductById, currency, addToCart } = useContext(ShopContext);
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : '#fff');
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setActiveTab('description');
    setAddedToCart(false);
    if (product?.colors) {
      setSelectedColor(product.colors[0]);
    }
  }, [productId, product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, description, price, isOnSale, salePercent, category, dimensions, weightCapacity, materials, warranty, reviews, specifications, features, colors } = product;
  const discount = salePercent !== undefined ? salePercent : 1;
  const finalPrice = isOnSale && price !== undefined && discount !== undefined
    ? (price * discount)
    : price;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAddedToCart(true);
    toast.success(`${name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${name} - ${currency}${finalPrice.toFixed(2)}`;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.info('Link copied to clipboard!', { autoClose: 1500, position: "bottom-right" });
        setShowShareMenu(false);
        return;
      default:
        break;
    }

    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  // Calculate average rating
  const avgRating = reviews && reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth="1">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={`url(#half-${i})`} />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#e5e7eb" stroke="#e5e7eb" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      }
    }
    return stars;
  };

  const tabContent = {
    description: (
      <div className="tab-content-inner">
        <p className="description-text">{description}</p>
        {materials && (
          <div className="detail-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            <span><strong>Materials:</strong> {materials}</span>
          </div>
        )}
        {dimensions && (
          <div className="detail-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 3H3v18h18V3z" />
              <path d="M9 3v18" />
              <path d="M3 9h18" />
            </svg>
            <span><strong>Dimensions:</strong> {dimensions}</span>
          </div>
        )}
      </div>
    ),
    specifications: (
      <div className="tab-content-inner specs-grid">
        {dimensions && (
          <div className="spec-item">
            <div className="spec-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
            </div>
            <div className="spec-text">
              <span className="spec-label">Dimensions</span>
              <span className="spec-value">{dimensions}</span>
            </div>
          </div>
        )}
        {weightCapacity && (
          <div className="spec-item">
            <div className="spec-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <div className="spec-text">
              <span className="spec-label">Weight Capacity</span>
              <span className="spec-value">{weightCapacity}</span>
            </div>
          </div>
        )}
        {materials && (
          <div className="spec-item">
            <div className="spec-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="spec-text">
              <span className="spec-label">Materials</span>
              <span className="spec-value">{materials}</span>
            </div>
          </div>
        )}
        {specifications?.storageCapacity && (
          <div className="spec-item">
            <div className="spec-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 12h.01" />
                <path d="M10 12h.01" />
              </svg>
            </div>
            <div className="spec-text">
              <span className="spec-label">Storage Capacity</span>
              <span className="spec-value">{specifications.storageCapacity}</span>
            </div>
          </div>
        )}
      </div>
    ),
    features: (
      <div className="tab-content-inner">
        {features && features.length > 0 ? (
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item" style={{ animationDelay: `${index * 0.08}s` }}>
                <div className="feature-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data">No features listed for this product.</p>
        )}
      </div>
    ),
  };

  return (
    <InfoWrapper>
      {/* Top Badges */}
      <div className="badge-row">
        {product.bestseller && (
          <span className="badge badge-bestseller">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Bestseller
          </span>
        )}
        {isOnSale && (
          <span className="badge badge-sale">
            {((1 - discount) * 100).toFixed(0)}% OFF
          </span>
        )}
        <span className="badge badge-category">{category}</span>
      </div>

      {/* Product Name */}
      <h1 className="product-name">{name}</h1>

      {/* Rating Summary */}
      {reviews && reviews.length > 0 && (
        <div className="rating-summary">
          <div className="stars">{renderStars(avgRating)}</div>
          <span className="rating-number">{avgRating.toFixed(1)}</span>
          <span className="review-count">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
        </div>
      )}

      {/* Pricing */}
      <div className="pricing-section">
        <span className="current-price">{currency}{finalPrice.toFixed(2)}</span>
        {isOnSale && price !== undefined && (
          <>
            <span className="original-price">{currency}{price.toFixed(2)}</span>
            <span className="savings">
              You save {currency}{(price - finalPrice).toFixed(2)}
            </span>
          </>
        )}
      </div>

      {/* Quick Description */}
      <p className="quick-description">{description}</p>

      {/* Divider */}
      <div className="divider" />

      {/* Color Options */}
      {colors && colors.length > 0 && (
        <div className="section-block">
          <span className="section-label">Color</span>
          <div className="color-options">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                style={{ '--swatch-color': color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color}`}
              >
                {selectedColor === color && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="section-block">
        <span className="section-label">Quantity</span>
        <div className="quantity-control">
          <button
            className="qty-btn"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <span className="qty-display">{quantity}</span>
          <button
            className="qty-btn"
            onClick={() => setQuantity(q => q + 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="cta-row">
        <button className={`btn-primary ${addedToCart ? 'added' : ''}`} onClick={handleAddToCart}>
          {addedToCart ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Added to Cart
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart — {currency}{(finalPrice * quantity).toFixed(2)}
            </>
          )}
        </button>
        <button
          className={`btn-wishlist ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={() => { setIsWishlisted(!isWishlisted); toast.info(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!', { position: "bottom-right", autoClose: 1500 }); }}
          aria-label="Toggle wishlist"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <div className="share-wrapper">
          <button
            className="btn-share"
            onClick={() => setShowShareMenu(!showShareMenu)}
            aria-label="Share product"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
          {showShareMenu && (
            <div className="share-dropdown">
              <button onClick={() => handleShare('copy')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                Copy Link
              </button>
              <button onClick={() => handleShare('twitter')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </button>
              <button onClick={() => handleShare('facebook')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="trust-item">
          <div className="trust-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="trust-text">
            <strong>Free Shipping</strong>
            <span>On orders over $500</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </div>
          <div className="trust-text">
            <strong>Easy Returns</strong>
            <span>7-day return policy</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="trust-text">
            <strong>Warranty</strong>
            <span>{warranty || 'Contact for details'}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="tab-bar">
          {['description', 'specifications', 'features'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && <div className="tab-indicator" />}
            </button>
          ))}
        </div>
        <div className="tab-panel">
          {tabContent[activeTab]}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-header">
          <h3>Customer Reviews</h3>
          <span className="review-badge">{reviews ? reviews.length : 0} reviews</span>
        </div>
        {reviews && reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div key={index} className="review-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="review-header">
                  <div className="reviewer-avatar">
                    {review.user ? review.user.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="reviewer-info">
                    <strong>{review.user || 'Anonymous'}</strong>
                    <div className="review-stars">{renderStars(review.rating || 0)}</div>
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reviews">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </InfoWrapper>
  );
};

/* =================== STYLED COMPONENTS =================== */

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  15% { transform: scale(1.3); }
  30% { transform: scale(1); }
  45% { transform: scale(1.15); }
  60% { transform: scale(1); }
`;

const InfoWrapper = styled.section`
  padding: 0.5rem 0;

  @media screen and (min-width: 600px) {
    padding: 0;
  }

  .badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.75rem;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &.badge-bestseller {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: #78350f;
      }

      &.badge-sale {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
      }

      &.badge-category {
        background: #f0f0ff;
        color: #6366f1;
        border: 1px solid #e0e7ff;
      }
    }
  }

  .product-name {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.3;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;

    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }
  }

  .rating-summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .stars {
      display: flex;
      gap: 2px;
    }

    .rating-number {
      font-weight: 700;
      color: #1e293b;
      font-size: 0.95rem;
    }

    .review-count {
      color: #64748b;
      font-size: 0.875rem;
    }
  }

  .pricing-section {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;

    .current-price {
      font-size: 2rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
    }

    .original-price {
      font-size: 1.25rem;
      text-decoration: line-through;
      color: #94a3b8;
      font-weight: 500;
    }

    .savings {
      font-size: 0.85rem;
      font-weight: 600;
      color: #059669;
      background: #ecfdf5;
      padding: 0.25rem 0.75rem;
      border-radius: 100px;
    }
  }

  .quick-description {
    color: #475569;
    line-height: 1.7;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
    margin: 1.5rem 0;
  }

  /* Color Options */
  .section-block {
    margin-bottom: 1.5rem;

    .section-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #475569;
      margin-bottom: 0.75rem;
    }
  }

  .color-options {
    display: flex;
    gap: 0.625rem;

    .color-swatch {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 3px solid transparent;
      background-color: var(--swatch-color);
      cursor: pointer;
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

      &:hover {
        transform: scale(1.15);
      }

      &.selected {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
      }
    }
  }

  /* Quantity */
  .quantity-control {
    display: inline-flex;
    align-items: center;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;

    .qty-btn {
      width: 44px;
      height: 44px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #475569;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: #e8eeff;
        color: #6366f1;
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    }

    .qty-display {
      width: 48px;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 700;
      color: #1e293b;
      border-left: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      padding: 0.5rem 0;
    }
  }

  /* CTA Section */
  .cta-row {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;

    .btn-primary {
      flex: 1;
      min-width: 200px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      border: none;
      padding: 0.9rem 1.5rem;
      border-radius: 14px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: 0.02em;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
      }

      &:active {
        transform: translateY(0);
      }

      &.added {
        background: linear-gradient(135deg, #059669 0%, #10b981 100%);
        box-shadow: 0 8px 30px rgba(5, 150, 105, 0.3);
      }
    }

    .btn-wishlist {
      width: 50px;
      height: 50px;
      border-radius: 14px;
      border: 1.5px solid #e2e8f0;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      transition: all 0.3s ease;

      &:hover {
        border-color: #fca5a5;
        color: #ef4444;
        background: #fef2f2;
      }

      &.wishlisted {
        border-color: #ef4444;
        color: #ef4444;
        background: #fef2f2;
        animation: ${heartBeat} 0.6s ease;
      }
    }

    .share-wrapper {
      position: relative;

      .btn-share {
        width: 50px;
        height: 50px;
        border-radius: 14px;
        border: 1.5px solid #e2e8f0;
        background: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        transition: all 0.3s ease;

        &:hover {
          border-color: #c7d2fe;
          color: #6366f1;
          background: #f0f0ff;
        }
      }

      .share-dropdown {
        position: absolute;
        bottom: 100%;
        right: 0;
        margin-bottom: 0.5rem;
        background: white;
        border-radius: 14px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
        border: 1px solid #e2e8f0;
        overflow: hidden;
        animation: ${slideDown} 0.2s ease;
        min-width: 170px;
        z-index: 100;

        button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.9rem;
          color: #1e293b;
          transition: background 0.2s ease;

          &:hover {
            background: #f8fafc;
          }

          &:not(:last-child) {
            border-bottom: 1px solid #f1f5f9;
          }
        }
      }
    }
  }

  /* Trust Badges */
  .trust-badges {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.5rem;

    .trust-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem;
      background: #f8fafc;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;

      &:hover {
        border-color: #c7d2fe;
        background: #f0f0ff;
      }

      .trust-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6366f1;
        flex-shrink: 0;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      }

      .trust-text {
        display: flex;
        flex-direction: column;

        strong {
          font-size: 0.8rem;
          color: #1e293b;
          font-weight: 700;
        }

        span {
          font-size: 0.7rem;
          color: #64748b;
        }
      }
    }
  }

  /* Tabs */
  .tabs-section {
    margin-bottom: 2rem;

    .tab-bar {
      display: flex;
      gap: 0;
      border-bottom: 2px solid #e2e8f0;
      margin-bottom: 1.5rem;

      .tab-btn {
        position: relative;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.875rem 1.25rem;
        font-size: 0.9rem;
        font-weight: 600;
        color: #94a3b8;
        transition: all 0.3s ease;
        white-space: nowrap;

        &:hover {
          color: #6366f1;
        }

        &.active {
          color: #6366f1;

          .tab-indicator {
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            border-radius: 2px 2px 0 0;
          }
        }
      }
    }

    .tab-panel {
      animation: ${fadeInUp} 0.3s ease;
    }

    .tab-content-inner {
      .description-text {
        color: #475569;
        line-height: 1.8;
        font-size: 0.95rem;
        margin-bottom: 1.25rem;
      }

      .detail-chip {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.75rem 1rem;
        background: #f8fafc;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        margin-bottom: 0.625rem;
        color: #475569;
        font-size: 0.9rem;
        transition: border-color 0.2s ease;

        &:hover {
          border-color: #c7d2fe;
        }

        svg {
          color: #6366f1;
          flex-shrink: 0;
        }
      }

      .no-data {
        color: #94a3b8;
        font-style: italic;
      }
    }

    .specs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 0.875rem;

      .spec-item {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 14px;
        border: 1px solid #e2e8f0;
        transition: all 0.2s ease;

        &:hover {
          border-color: #c7d2fe;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .spec-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ede9fe, #e0e7ff);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6366f1;
          flex-shrink: 0;
        }

        .spec-text {
          display: flex;
          flex-direction: column;

          .spec-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #94a3b8;
            font-weight: 600;
          }

          .spec-value {
            font-size: 0.9rem;
            color: #1e293b;
            font-weight: 600;
          }
        }
      }
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;

      .feature-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: #f8fafc;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        font-size: 0.9rem;
        color: #334155;
        transition: all 0.2s ease;
        animation: ${fadeInUp} 0.4s ease both;

        &:hover {
          border-color: #c7d2fe;
          background: #f0f0ff;
        }

        .feature-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }
      }
    }
  }

  /* Reviews */
  .reviews-section {
    .reviews-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;

      h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #0f172a;
      }

      .review-badge {
        background: #f0f0ff;
        color: #6366f1;
        padding: 0.25rem 0.75rem;
        border-radius: 100px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .review-card {
      padding: 1.25rem;
      background: #f8fafc;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
      animation: ${fadeInUp} 0.4s ease both;

      &:hover {
        border-color: #c7d2fe;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      }

      .review-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;

        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .reviewer-info {
          strong {
            display: block;
            color: #1e293b;
            font-size: 0.9rem;
            margin-bottom: 0.15rem;
          }

          .review-stars {
            display: flex;
            gap: 1px;
          }
        }
      }

      .review-text {
        color: #475569;
        line-height: 1.6;
        font-size: 0.9rem;
      }
    }

    .no-reviews {
      text-align: center;
      padding: 3rem 2rem;
      background: #f8fafc;
      border-radius: 16px;
      border: 1px dashed #d1d5db;

      p {
        margin-top: 1rem;
        color: #94a3b8;
        font-size: 0.95rem;
      }
    }
  }
`;

ProductInfo.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductInfo;
