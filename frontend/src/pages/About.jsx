import React from 'react';
import Squares from '../components/squares'; // Correct the import path
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden pb-16">
      <Squares
        speed={0.5}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
        hoverFillColor="#222"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center p-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg sm:text-xl max-w-lg">
          Welcome to our furniture management system. We specialize in providing high-quality furniture solutions for your home and office. Our mission is to deliver exceptional products that enhance your living and working spaces.
        </p>
      </motion.div>

      {/* New Section */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center mt-20 lg:mt-40 px-6 lg:px-16">
        {/* Left Content */}
        <div className="lg:w-1/2 text-left mb-10 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Handcrafted Solid Wood Furniture</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full text-white font-bold mr-4">1</div>
              <div>
                <h3 className="text-xl font-semibold">Sourced Wood</h3>
                <p className="text-sm lg:text-base text-gray-300">We use only the highest quality, sustainably sourced wood for our furniture.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full text-white font-bold mr-4">2</div>
              <div>
                <h3 className="text-xl font-semibold">Expert Craftsmanship</h3>
                <p className="text-sm lg:text-base text-gray-300">Our skilled artisans create each piece with meticulous attention to detail.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full text-white font-bold mr-4">3</div>
              <div>
                <h3 className="text-xl font-semibold">Unique Designs</h3>
                <p className="text-sm lg:text-base text-gray-300">Discover one-of-a-kind pieces that showcase the beauty of natural wood.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <img
            src="/path/to/your/image.jpg" // Replace with the actual path to the image
            alt="Wooden Furniture"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
