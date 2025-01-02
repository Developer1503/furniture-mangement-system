import React from 'react';
import Squares from '../components/squares'; // Correct the import path
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
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
    </div>
  );
};

export default About;
