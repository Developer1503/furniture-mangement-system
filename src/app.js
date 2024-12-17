import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Footer from './components/Footer';
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
