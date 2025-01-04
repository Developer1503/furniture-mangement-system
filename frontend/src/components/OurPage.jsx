import React from 'react';
import { motion } from 'framer-motion';
import ourpageImage from '../assets/ourpage.jpg'; // Import the image from the assets folder

const OurPage = () => {
  return (
    <div className="flex min-h-screen bg-yellow-100 overflow-hidden rounded-2xl">
      {/* Left Section with Text */}
      <div className="w-1/2 flex flex-col justify-center pl-24 pr-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-base font-light tracking-wide">SINCE 1990</span>
            <span className="text-6xl font-bold tracking-tight">DESIGN</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl font-bold tracking-tight leading-tight mb-6"
        >
          WITHIN
          <br />
          REACH
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg mb-8 font-light"
        >
          Your source for modern living.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border border-black px-6 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
        >
          About US
        </motion.button>
      </div>

      {/* Right Section with Image */}
      <div className="w-1/2 pl-0 pr-6 pt-6 pb-6">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          src={ourpageImage} // Use the imported image
          alt="Modern living room with curved white chairs and wooden accents"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default OurPage;
