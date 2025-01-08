import React, { useContext } from 'react';
import Custom from '../components/Custom';
import HeroSection from '../components/HeroSection';
import LatestCollection from '../components/LatestCollection';
import OurPage from '../components/OurPage';
import Footer from '../components/Footer';
import { ShopContext } from '../context/ShopContext';

const Home = () => {
  const { products } = useContext(ShopContext);

  return (
    <div>
      <HeroSection />
      <Custom />
      <LatestCollection products={products} />
      <OurPage />
    </div>
  );
};

export default Home;
