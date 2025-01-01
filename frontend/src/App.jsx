import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import About from './pages/About';
import Cart from './pages/Cart';
import AiGen from './pages/Ai_gen';
import Login from './pages/Login';
import OurPage from './components/ourpage'; // Update the import path to the components folder
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LivingRoom from './pages/Livingroom';
import BedRoom from './pages/BedRoom';
import DiningRoom from './pages/DiningRoom';
import Office from './pages/Office';
import ProductDetail from './pages/ProductDetail';



const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LivingRoom" element={<LivingRoom />} />
          <Route path="/Bedroom" element={<BedRoom />} />
          <Route path="/Diningroom" element={<DiningRoom />} />
          <Route path="/office" element={<Office />} />
         <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Ai_gen" element={<AiGen />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/OurPage" element={<OurPage />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          {/* Fallback route for unknown paths */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
