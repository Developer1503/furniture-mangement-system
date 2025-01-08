import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ShopContext } from '../context/ShopContext';
import ProductInfo from './ProductInfo';

const ProductDetail = ({ productId }) => {
  const { getProductById } = useContext(ShopContext);
  const product = getProductById(productId);
  const [mainImage, setMainImage] = useState(product.image[0]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { image } = product;

  return (
    <DetailWrapper>
      <div className="image-section">
        <div className="thumbnails">
          {image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(img)}
              className="thumbnail"
            />
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt={product.name} />
        </div>
      </div>
      <div className="info-section">
        <ProductInfo productId={productId} />
      </div>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2.4rem;

  @media screen and (min-width: 600px) {
    padding: 2.4rem 4rem;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto;
  }

  .image-section {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;

    .thumbnails {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      .thumbnail {
        max-width: 100px;
        max-height: 100px;
        margin-bottom: 0.5rem;
        cursor: pointer;
      }
    }

    .main-image {
      img {
        max-width: 400px;
        max-height: 400px;
        width: auto;
        height: auto;
      }
    }
  }

  .info-section {
    width: 100%;
  }
`;

ProductDetail.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductDetail;
