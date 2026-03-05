import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductDetail from '../components/ProductDetail';
import styled, { keyframes } from 'styled-components';

const ProductPage = () => {
  const { productId } = useParams();
  const { getProductById, products, currency } = useContext(ShopContext);
  const product = getProductById(productId);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [productId]);

  if (!product) {
    return (
      <NotFoundPage>
        <div className="not-found-card">
          <div className="icon-wrapper">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
              <path d="M8 11h6"/>
            </svg>
          </div>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back to Home
          </button>
        </div>
      </NotFoundPage>
    );
  }

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <PageWrapper className={isVisible ? 'visible' : ''}>
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Home
        </Link>
        <span className="separator">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </span>
        <span className="breadcrumb-link" onClick={() => navigate(`/${product.category.replace(/\s+/g, '')}`)}>
          {product.category}
        </span>
        <span className="separator">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <ProductDetail productId={productId} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <RelatedSection>
          <div className="section-header">
            <div className="header-line" />
            <h3>You May Also Like</h3>
            <div className="header-line" />
          </div>
          <div className="related-grid">
            {relatedProducts.map((rProduct, index) => (
              <div
                key={rProduct._id}
                className="related-card"
                onClick={() => navigate(`/product/${rProduct._id}`)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="related-image-wrapper">
                  <img src={rProduct.image[0]} alt={rProduct.name} />
                  <div className="related-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <div className="related-info">
                  <span className="related-category">{rProduct.category}</span>
                  <h4>{rProduct.name}</h4>
                  <p className="related-price">{currency}{rProduct.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </RelatedSection>
      )}
    </PageWrapper>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NotFoundPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;

  .not-found-card {
    text-align: center;
    background: white;
    padding: 3rem;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    animation: ${fadeInUp} 0.6s ease-out;
    max-width: 450px;

    .icon-wrapper {
      width: 120px;
      height: 120px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6366f1;
    }

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    p {
      color: #64748b;
      font-size: 1rem;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      border: none;
      padding: 0.875rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
      }
    }
  }
`;

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 0 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .breadcrumb-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0;
    margin-bottom: 1rem;
    font-size: 0.9rem;

    .breadcrumb-link {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      color: #6366f1;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.2s ease;
      
      &:hover {
        color: #4f46e5;
        text-decoration: underline;
      }
    }

    .separator {
      color: #cbd5e1;
      display: flex;
      align-items: center;
    }

    .breadcrumb-current {
      color: #475569;
      font-weight: 600;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const cardSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const RelatedSection = styled.section`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid #e2e8f0;

  .section-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .header-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      white-space: nowrap;
      letter-spacing: -0.02em;
    }
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  .related-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${cardSlideIn} 0.6s ease-out both;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);

      .related-overlay {
        opacity: 1;
      }

      .related-image-wrapper img {
        transform: scale(1.08);
      }
    }

    .related-image-wrapper {
      position: relative;
      overflow: hidden;
      aspect-ratio: 4 / 3;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .related-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.85) 0%, rgba(139, 92, 246, 0.85) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;

        span {
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.625rem 1.5rem;
          border: 2px solid white;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }
      }
    }

    .related-info {
      padding: 1.25rem;

      .related-category {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #6366f1;
        font-weight: 600;
        margin-bottom: 0.25rem;
        display: block;
      }

      h4 {
        font-size: 1rem;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }

      .related-price {
        font-size: 1.125rem;
        font-weight: 700;
        color: #059669;
      }
    }
  }
`;

export default ProductPage;
