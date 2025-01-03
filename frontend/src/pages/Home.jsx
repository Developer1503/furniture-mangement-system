import React from 'react';
import Custom from '../components/Custom';
import HeroSection from '../components/HeroSection';
import LatestCollection from '../components/LatestCollection';
import OurPage from '../components/OurPage';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Custom />
      <LatestCollection />
      <OurPage />
      
    </div>
  );
};

export default Home;
