import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ShopContext } from '../context/ShopContext';
import ProductInfo from './ProductInfo';

const ProductDetail = ({ productId }) => {
  const { getProductById } = useContext(ShopContext);
  const product = getProductById(productId);
  const [mainImage, setMainImage] = useState(product.image[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = mainImage;
    img.onload = () => setImageLoaded(true);
  }, [mainImage]);

  if (!product) {
    return (
      <NotFoundWrapper>
        <div className="not-found-content">
          <span className="icon">🔍</span>
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist</p>
        </div>
      </NotFoundWrapper>
    );
  }

  const { image } = product;

  const handleImageChange = (img, index) => {
    setMainImage(img);
    setActiveThumb(index);
    setImageLoaded(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <DetailWrapper>
      <div className="image-section">
        <div className="thumbnails">
          {image.map((img, index) => (
            <div
              key={index}
              className={`thumbnail-wrapper ${activeThumb === index ? 'active' : ''}`}
              onClick={() => handleImageChange(img, index)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail"
              />
              {activeThumb === index && <div className="active-indicator" />}
            </div>
          ))}
        </div>
        <div className="main-image-container">
          <div
            className={`main-image ${isZoomed ? 'zoomed' : ''} ${imageLoaded ? 'loaded' : ''}`}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            {!imageLoaded && (
              <div className="image-loader">
                <div className="spinner" />
              </div>
            )}
            <img
              src={mainImage}
              alt={product.name}
              style={
                isZoomed
                  ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }
                  : {}
              }
            />
            {isZoomed && <div className="zoom-hint">🔍 Hover to zoom</div>}
          </div>
          <div className="image-counter">
            {activeThumb + 1} / {image.length}
          </div>
        </div>
      </div>
      <div className="info-section">
        <ProductInfo productId={productId} />
      </div>
    </DetailWrapper>
  );
};

const NotFoundWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;

  .not-found-content {
    text-align: center;
    animation: fadeIn 0.5s ease-in;

    .icon {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
      animation: bounce 1s infinite;
    }

    h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
      font-size: 1rem;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const DetailWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.6s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (min-width: 600px) {
    padding: 2.4rem;
    flex-direction: row;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto;
  }

  .image-section {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    width: 100%;
    gap: 1rem;

    @media screen and (min-width: 600px) {
      flex-direction: row;
      margin-right: 2rem;
    }

    .thumbnails {
      display: flex;
      flex-direction: row;
      gap: 0.75rem;
      overflow-x: auto;
      padding: 0.5rem 0;

      @media screen and (min-width: 600px) {
        flex-direction: column;
        overflow-y: auto;
        max-height: 500px;
      }

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
        
        &:hover {
          background: #555;
        }
      }

      .thumbnail-wrapper {
        position: relative;
        min-width: 80px;
        min-height: 80px;
        max-width: 80px;
        max-height: 80px;
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        border: 3px solid transparent;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        &:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        &.active {
          border-color: #007BFF;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
          
          .active-indicator {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 12px;
            height: 12px;
            background: #007BFF;
            border-radius: 50%;
            border: 2px solid white;
            animation: pulse 1.5s infinite;
          }
        }

        .thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        &:hover .thumbnail {
          transform: scale(1.1);
        }
      }

      @keyframes pulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(0, 123, 255, 0);
        }
      }
    }

    .main-image-container {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .main-image {
        position: relative;
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        overflow: hidden;
        transition: all 0.3s ease;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
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

          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #007BFF;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        }

        img {
          max-width: 100%;
          max-height: 500px;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: zoom-in;
        }

        &.zoomed {
          cursor: zoom-out;

          img {
            transform: scale(2);
          }
        }

        .zoom-hint {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          animation: fadeInUp 0.3s ease;
          pointer-events: none;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }

      .image-counter {
        text-align: center;
        padding: 0.75rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.875rem;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        animation: slideUp 0.5s ease;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }

  .info-section {
    width: 100%;
    animation: fadeIn 0.8s ease 0.2s both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

ProductDetail.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductDetail;
