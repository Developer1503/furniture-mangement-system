import React from 'react';
import Custom from '../components/custom'; // Import the Custom component with correct casing
import HeroSection from '../components/Herosection'; // Import the Herosection component with correct casing

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Custom /> 
    </div>
  );
};

export default Home;
