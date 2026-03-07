import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/product/${id}`}
      className="product-card-link"
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="product-card"
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#ffffff',
          boxShadow: isHovered
            ? '0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)'
            : '0 4px 20px rgba(0,0,0,0.06), 0 1px 6px rgba(0,0,0,0.04)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer',
        }}
      >
        {/* Image Container */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '4/3',
            background: '#f5f0e8',
          }}
        >
          <img
            src={image[0]}
            alt={name}
            onLoad={() => setImageLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: imageLoaded ? 1 : 0,
            }}
          />
          {/* Gradient overlay on hover */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: isHovered
                ? 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
                : 'linear-gradient(to top, rgba(0,0,0,0.08), transparent)',
              transition: 'all 0.4s ease',
              pointerEvents: 'none',
            }}
          />
          {/* Quick View badge */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: isHovered
                ? 'translate(-50%, -50%) scale(1)'
                : 'translate(-50%, -50%) scale(0.8)',
              opacity: isHovered ? 1 : 0,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              padding: '10px 22px',
              borderRadius: '30px',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#2d2a26',
              transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            View Details
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '20px 20px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <h2
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1a1a1a',
              margin: 0,
              lineHeight: '1.4',
              letterSpacing: '-0.01em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontSize: '1.15rem',
                fontWeight: '700',
                color: '#8B6914',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {currency}{price}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={star <= 4 ? '#F59E0B' : '#E5E7EB'}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #C9A84C, #8B6914, #C9A84C)',
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transformOrigin: 'left',
          }}
        />
      </div>
    </Link>
  );
};

export default ProductItem;
