import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const OurPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fdf5cf] overflow-hidden w-full border-t border-[#e8dfb8]">
      {/* Left Section with Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-28 z-10 py-20 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-4 mb-1"
        >
          <span className="text-sm font-semibold tracking-widest text-[#1c1b18] uppercase">
            SINCE 1990
          </span>
          <h2 className="text-[3.5rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] font-bold text-[#1c1b18] tracking-tight leading-none">
            DESIGN
          </h2>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-[3.5rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] font-bold text-[#1c1b18] tracking-tight leading-none mb-1"
        >
          WITHIN
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="text-[3.5rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] font-bold text-[#1c1b18] tracking-tight leading-none mb-8"
        >
          REACH
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="text-lg md:text-xl text-stone-800 mb-10 tracking-wide font-light max-w-sm"
        >
          Your source for modern living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <Link to="/About" className="inline-block w-full sm:w-[280px]">
            <button className="w-full py-4 border border-stone-800 text-stone-800 font-semibold tracking-[0.1em] text-sm hover:bg-stone-800 hover:text-[#fdf5cf] transition-all duration-300">
              ABOUT US
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right Section with Image */}
      <div className="w-full lg:w-1/2 h-96 sm:h-[500px] lg:h-auto relative overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={assets.OurPage}
          alt="Modern living room aesthetic"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle overlay for better blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdf5cf]/20 to-transparent mix-blend-overlay pointer-events-none"></div>
      </div>
    </div>
  );
};

export default OurPage;
