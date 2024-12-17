import React from 'react';

function Hero() {
  return (
    <div className="main-content">
      <nav className="navbar navbar-expand-md" id="navbar-color">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span><i><img src={process.env.PUBLIC_URL + '/assets/images/menu.png'} alt="" width="30px" /></i></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Shop</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Top Chair</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Chair</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Brands</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
              <li className="nav-item"><a className="nav-link" href="signin.html">Sign In</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content">
        <h1>Make Your Home<br />Modern Design.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minus modi illum cumque velit consectetur?</p>
        <div id="btn1"><button>Shop Now</button></div>
      </div>
    </div>
  );
}

export default Hero;
