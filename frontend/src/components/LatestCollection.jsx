import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const LatestCollection = ({ products }) => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 9));
  }, [products]);

  return (
    <div
      style={{
        padding: '80px 5%',
        background: 'linear-gradient(180deg, #FDFAF3 0%, #F9F3E3 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,105,20,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '60px',
          position: 'relative',
        }}
      >
        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#C9A84C',
            marginBottom: '12px',
          }}
        >
          Curated for You
        </p>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: '0 0 16px',
            letterSpacing: '-0.03em',
            lineHeight: '1.2',
          }}
        >
          New Collection
        </h2>
        <div
          style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, #C9A84C, #8B6914)',
            margin: '0 auto 20px',
            borderRadius: '2px',
          }}
        />
        <p
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            color: '#6b7280',
            fontSize: '1rem',
            lineHeight: '1.7',
          }}
        >
          Handcrafted with wood from sustainably certified forests — designed for beauty that lasts.
        </p>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '28px',
          maxWidth: '1300px',
          margin: '0 auto',
        }}
      >
        {latestProducts.map((item, index) => (
          <div
            key={index}
            style={{
              animation: `fadeInUp 0.5s ease ${index * 0.08}s both`,
            }}
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LatestCollection;
