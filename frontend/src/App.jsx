import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import About from './pages/About';
import Cart from './pages/Cart';
import AiGen from './pages/Ai_gen';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Ai_gen" element={<AiGen />} />
          <Route path="/Login" element={<Login />} />
          {/* Fallback route for unknown paths */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
