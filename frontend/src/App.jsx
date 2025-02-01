import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import AiGen from './pages/Ai_gen';
import Auth from './pages/Auth';
import OurPage from './components/OurPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LivingRoom from './pages/LivingRoom';
import BedRoom from './pages/BedRoom';
import DiningRoom from './pages/DiningRoom';
import Office from './pages/Office';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import SearchBar from './components/SearchBar';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchBar />
      <main className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LivingRoom" element={<LivingRoom />} />
          <Route path="/Bedroom" element={<BedRoom />} />
          <Route path="/Diningroom" element={<DiningRoom />} />
          <Route path="/office" element={<Office />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/Ai_gen" element={<AiGen />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/OurPage" element={<OurPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/add-product" element={<PrivateRoute role="admin"><AddProduct /></PrivateRoute>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
