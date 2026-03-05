import { useContext, useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import { ShopContext } from '../context/ShopContext';
import ProductInfo from './ProductInfo';

const ProductDetail = ({ productId }) => {
  const { getProductById } = useContext(ShopContext);
  const product = getProductById(productId);
  const [mainImage, setMainImage] = useState(product?.image[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(product.image[0]);
      setActiveThumb(0);
      setImageLoaded(false);
    }
  }, [productId, product]);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = mainImage;
    img.onload = () => setImageLoaded(true);
  }, [mainImage]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!showLightbox || !product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowLightbox(false);
      if (e.key === 'ArrowRight') navigateImage(1);
      if (e.key === 'ArrowLeft') navigateImage(-1);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showLightbox, activeThumb, product]);

  const navigateImage = useCallback((direction) => {
    if (!product) return;
    const { image } = product;
    const newIndex = (activeThumb + direction + image.length) % image.length;
    handleImageChange(image[newIndex], newIndex);
  }, [activeThumb, product]);

  if (!product) {
    return (
      <NotFoundWrapper>
        <div className="not-found-content">
          <div className="icon-container">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist</p>
        </div>
      </NotFoundWrapper>
    );
  }

  const { image } = product;

  const handleImageChange = (img, index) => {
    setImageTransition(true);
    setTimeout(() => {
      setMainImage(img);
      setActiveThumb(index);
      setImageLoaded(false);
      setTimeout(() => setImageTransition(false), 50);
    }, 200);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <>
      <DetailWrapper>
        <div className="image-section">
          {/* Thumbnails */}
          <div className="thumbnails">
            {image.map((img, index) => (
              <div
                key={index}
                className={`thumbnail-wrapper ${activeThumb === index ? 'active' : ''}`}
                onClick={() => handleImageChange(img, index)}
                role="button"
                tabIndex={0}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={img}
                  alt={`${product.name} - View ${index + 1}`}
                  className="thumbnail"
                />
                {activeThumb === index && <div className="active-indicator" />}
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="main-image-container">
            <div
              className={`main-image ${isZoomed ? 'zoomed' : ''} ${imageLoaded ? 'loaded' : ''} ${imageTransition ? 'transitioning' : ''}`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setShowLightbox(true)}
            >
              {!imageLoaded && (
                <div className="image-loader">
                  <div className="loader-ring">
                    <div /><div /><div /><div />
                  </div>
                </div>
              )}
              <img
                src={mainImage}
                alt={product.name}
                style={
                  isZoomed
                    ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` }
                    : {}
                }
              />
              <div className="image-actions">
                <button className="action-btn zoom-btn" title="Click to enlarge" onClick={(e) => { e.stopPropagation(); setShowLightbox(true); }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>
              {isZoomed && (
                <div className="zoom-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Hover to zoom
                </div>
              )}
            </div>

            {/* Image Navigation */}
            {image.length > 1 && (
              <div className="image-nav">
                <button className="nav-arrow" onClick={() => navigateImage(-1)} aria-label="Previous image">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <div className="image-dots">
                  {image.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${activeThumb === index ? 'active' : ''}`}
                      onClick={() => handleImageChange(image[index], index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
                <button className="nav-arrow" onClick={() => navigateImage(1)} aria-label="Next image">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <ProductInfo productId={productId} />
        </div>
      </DetailWrapper>

      {/* Lightbox */}
      {showLightbox && (
        <Lightbox onClick={() => setShowLightbox(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowLightbox(false)} aria-label="Close lightbox">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {image.length > 1 && (
              <button className="lightbox-nav prev" onClick={() => navigateImage(-1)} aria-label="Previous image">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            <img src={mainImage} alt={product.name} className="lightbox-image" />
            {image.length > 1 && (
              <button className="lightbox-nav next" onClick={() => navigateImage(1)} aria-label="Next image">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
            <div className="lightbox-counter">
              {activeThumb + 1} / {image.length}
            </div>
            {image.length > 1 && (
              <div className="lightbox-thumbs">
                {image.map((img, index) => (
                  <div
                    key={index}
                    className={`lightbox-thumb ${activeThumb === index ? 'active' : ''}`}
                    onClick={() => handleImageChange(img, index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Lightbox>
      )}
    </>
  );
};

/* =================== STYLED COMPONENTS =================== */

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const loaderSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
  50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
`;

const NotFoundWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;

  .not-found-content {
    text-align: center;
    animation: ${fadeIn} 0.5s ease-in;

    .icon-container {
      width: 100px;
      height: 100px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #f0f4ff, #e8eeff);
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
    }
  }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;

  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .close-btn {
    position: absolute;
    top: -50px;
    right: -10px;
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%) scale(1.1);
    }

    &.prev { left: -80px; }
    &.next { right: -80px; }

    @media (max-width: 768px) {
      &.prev { left: -30px; }
      &.next { right: -30px; }
      width: 40px;
      height: 40px;
    }
  }

  .lightbox-image {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 12px;
    animation: ${slideInUp} 0.4s ease;
  }

  .lightbox-counter {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .lightbox-thumbs {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;

    .lightbox-thumb {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      opacity: 0.5;
      transition: all 0.3s ease;

      &.active {
        border-color: #6366f1;
        opacity: 1;
      }

      &:hover {
        opacity: 0.9;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const DetailWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.06);
  animation: ${slideInUp} 0.6s ease-out;

  @media screen and (min-width: 600px) {
    padding: 2.5rem;
    flex-direction: row;
    gap: 2.5rem;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto;
  }

  .image-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;

    @media screen and (min-width: 600px) {
      flex-direction: row;
      width: 50%;
      min-width: 50%;
    }

    .thumbnails {
      display: flex;
      flex-direction: row;
      gap: 0.75rem;
      overflow-x: auto;
      padding: 0.25rem;

      @media screen and (min-width: 600px) {
        flex-direction: column;
        overflow-y: auto;
        max-height: 500px;
        min-width: 85px;
      }

      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 10px;
      }

      .thumbnail-wrapper {
        position: relative;
        min-width: 75px;
        min-height: 75px;
        max-width: 75px;
        max-height: 75px;
        cursor: pointer;
        border-radius: 14px;
        overflow: hidden;
        border: 2.5px solid transparent;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: #f8fafc;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #c7d2fe;
        }

        &.active {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);

          .active-indicator {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 10px;
            height: 10px;
            background: #6366f1;
            border-radius: 50%;
            border: 2px solid white;
            animation: ${pulse} 2s infinite;
          }
        }

        .thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        &:hover .thumbnail {
          transform: scale(1.12);
        }
      }
    }

    .main-image-container {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .main-image {
        position: relative;
        background: #f8fafc;
        border-radius: 20px;
        padding: 1.25rem;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e2e8f0;

        &:hover {
          border-color: #c7d2fe;

          .image-actions {
            opacity: 1;
            transform: translateY(0);
          }
        }

        &.transitioning img {
          opacity: 0;
          transform: scale(0.95);
        }

        &.loaded {
          .image-loader {
            opacity: 0;
            pointer-events: none;
          }
        }

        .image-loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          transition: opacity 0.3s ease;

          .loader-ring {
            display: inline-block;
            position: relative;
            width: 48px;
            height: 48px;

            div {
              box-sizing: border-box;
              display: block;
              position: absolute;
              width: 40px;
              height: 40px;
              margin: 4px;
              border: 3px solid transparent;
              border-top-color: #6366f1;
              border-radius: 50%;
              animation: ${loaderSpin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

              &:nth-child(1) { animation-delay: -0.45s; }
              &:nth-child(2) { animation-delay: -0.3s; }
              &:nth-child(3) { animation-delay: -0.15s; }
            }
          }
        }

        img {
          max-width: 100%;
          max-height: 450px;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: zoom-in;
        }

        &.zoomed {
          cursor: zoom-out;

          img {
            transform: scale(2.2);
          }
        }

        .image-actions {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.3s ease;

          .action-btn {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            border: none;
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #475569;
            transition: all 0.2s ease;

            &:hover {
              background: #6366f1;
              color: white;
              transform: scale(1.1);
            }
          }
        }

        .zoom-hint {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(8px);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          pointer-events: none;
          animation: ${fadeIn} 0.3s ease;
        }
      }

      .image-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 0.5rem;

        .nav-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid #e2e8f0;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          transition: all 0.2s ease;

          &:hover {
            border-color: #6366f1;
            color: #6366f1;
            background: #f0f0ff;
          }
        }

        .image-dots {
          display: flex;
          gap: 0.5rem;
          align-items: center;

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: #d1d5db;
            cursor: pointer;
            padding: 0;
            transition: all 0.3s ease;

            &.active {
              background: #6366f1;
              width: 24px;
              border-radius: 100px;
            }

            &:hover:not(.active) {
              background: #a5b4fc;
            }
          }
        }
      }
    }
  }

  .info-section {
    width: 100%;
    animation: ${fadeIn} 0.8s ease 0.2s both;

    @media screen and (min-width: 600px) {
      flex: 1;
    }
  }
`;

ProductDetail.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductDetail;
