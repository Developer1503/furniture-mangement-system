import React from 'react';
import Squares from '../components/Squares'; // Correct the import path
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden pb-24">
      
      {/* Hero Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <Squares
            speed={0.5}
            direction="diagonal"
            borderColor="#fff"
            hoverFillColor="#222"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-none mt-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block mb-6 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm sm:text-base font-medium tracking-widest uppercase text-gray-300 pointer-events-auto"
          >
            Welcome to Our World
          </motion.div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-600">
            About Us
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light">
            We specialize in providing high-quality furniture solutions for your home and office. Our mission is to deliver exceptional products that enhance your living and working spaces.
          </p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center pointer-events-none"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"
          />
        </motion.div>
      </div>

      {/* Main Content Section */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 px-6 lg:px-16 mt-16 relative z-20">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 text-left"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-10 leading-tight">
            Handcrafted <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">Solid Wood</span> Furniture
          </h2>
          
          <div className="space-y-6">
            {[
              { title: "Sourced Wood", desc: "We use only the highest quality, sustainably sourced wood for our furniture." },
              { title: "Expert Craftsmanship", desc: "Our skilled artisans create each piece with meticulous attention to detail." },
              { title: "Unique Designs", desc: "Discover one-of-a-kind pieces that showcase the beauty of natural wood." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default group backdrop-blur-sm"
              >
                <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-gradient-to-br from-gray-800 to-black rounded-full text-white font-bold mr-6 shadow-xl border border-white/10 group-hover:border-white/30 transition-colors duration-300">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-200 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-sm lg:text-base text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:w-1/2 flex items-center justify-center relative mt-12 lg:mt-0"
        >
          {/* Decorative glow behind image */}
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
          
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full"
            >
              <img
                src={assets.about_img} 
                alt="Wooden Furniture"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
              <h4 className="text-white text-xl font-bold mb-1">Timeless Elegance</h4>
              <p className="text-gray-300 text-sm">Built to last generations</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 mt-32 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "50k+", label: "Happy Customers" },
            { value: "100+", label: "Exclusive Designs" },
            { value: "15", label: "Global Stores" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm lg:text-base font-medium uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Core Values Section */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 mt-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Our Core Values</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide our craft and shape our interactions with every customer.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Sustainability", icon: "🌱", desc: "We prioritize eco-friendly materials and ethical manufacturing processes to protect our planet." },
            { title: "Innovation", icon: "💡", desc: "Continuously pushing boundaries to create furniture that fits modern lifestyles." },
            { title: "Uncompromising Quality", icon: "✨", desc: "Every piece undergoes rigorous testing to ensure it meets our high standards of excellence." }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-b from-white/5 to-transparent border border-white/5 p-8 rounded-3xl hover:border-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-6">{value.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl mx-auto px-6 mt-32 relative z-20 text-center"
      >
        <div className="p-12 lg:p-20 rounded-[3rem] bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Explore our wide collection of premium furniture designed to elevate your living and working environments.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-lg"
              onClick={() => window.location.href = '/collection'}
            >
              Explore Collection
            </motion.button>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default About;
