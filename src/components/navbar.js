import React from 'react';

function Navbar() {
  return (
    <div className="container">
      <div className="navbar-top">
        <div className="social-link">
          <i><img src={process.env.PUBLIC_URL + '/assets/images/twitter.png'} alt="" width="30px" /></i>
          <i><img src={process.env.PUBLIC_URL + '/assets/images/facebook.png'} alt="" width="30px" /></i>
          <i><img src={process.env.PUBLIC_URL + '/assets/images/google-plus.png'} alt="" width="30px" /></i>
        </div>
        <div className="logo">
          <h3>FURNITURE</h3>
        </div>
        <div className="icons">
          <i><img src={process.env.PUBLIC_URL + '/assets/images/search.png'} alt="" width="20px" /></i>
          <i><img src={process.env.PUBLIC_URL + '/assets/images/heart.png'} alt="" width="20px" /></i>
          <i><img src={process.env.PUBLIC_URL + '/assets/images/shopping-cart.png'} alt="" width="25px" /></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
