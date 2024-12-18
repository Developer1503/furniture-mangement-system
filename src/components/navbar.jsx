import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="container">
      <div className="navbar-top">
        <div className="social-link">
          <i><img src={process.env.PUBLIC_URL + '/assets/images/twitter.png'} alt="Twitter" width="30px" /></i>
          <i><img src={process.env.PUBLIC_URL + '/assets/images/facebook.png'} alt="Facebook" width="30px" /></i>
          <i><img src={process.env.PUBLIC_URL + '/assets/images/google-plus.png'} alt="Google Plus" width="30px" /></i>
        </div>
        <div className="logo">
          <h3>FURNITURE</h3>
        </div>
        <div className="icons">
          <i><img src={process.env.PUBLIC_URL + '/assets/images/search.png'} alt="Search" width="20px" /></i>
          <i><img src={process.env.PUBLIC_URL + '/assets/images/heart.png'} alt="Heart" width="20px" /></i>
          <i><img src={process.env.PUBLIC_URL + '/assets/images/shopping-cart.png'} alt="Shopping Cart" width="25px" /></i>
        </div>
      </div>
      <nav className="navbar navbar-expand-md" id="navbar-color">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span><i><img src={process.env.PUBLIC_URL + '/assets/images/menu.png'} alt="Menu" width="30px" /></i></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Shop</Link></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categories
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/categories">Chairs</Link>
                  <Link className="dropdown-item" to="/categories">Sofas</Link>
                  <Link className="dropdown-item" to="/categories">Desks</Link>
                  <Link className="dropdown-item" to="/categories">Tables</Link>
                </div>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
