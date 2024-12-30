import React from 'react';
import Custom from '../components/custom'; // Import the Custom component with correct casing
import HeroSection from '../components/Herosection'; // Import the Herosection component with correct casing
import LatestCollection from '../components/LatestCollection';
import OurPage from '../components/ourpage';// Import the ourpage component with correct casing

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
