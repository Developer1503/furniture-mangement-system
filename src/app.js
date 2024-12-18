import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import About from './components/About';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Categories from './components/Categories';
import Cart from './components/Cart';
import { AuthProvider } from './components/AuthContext';
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Hero} />
            <Route path="/services" component={Services} />
            <Route path="/products" component={Products} />
            <Route path="/about" component={About} />
            <Route path="/signin" component={SignIn} />
            <Route path="/categories" component={Categories} />
            <Route path="/cart" component={Cart} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
