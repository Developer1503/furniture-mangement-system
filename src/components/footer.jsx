import React from 'react';

function Footer() {
  return (
    <footer id="footer">
      <h1 className="text-center">Furniture</h1>
      <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ab?</p>
      <div className="icons text-center">
        <i className="bx bxl-twitter"></i>
        <i className="bx bxl-facebook"></i>
        <i className="bx bxl-google"></i>
        <i className="bx bxl-skype"></i>
        <i className="bx bxl-instagram"></i>
      </div>
      <div className="copyright text-center">
        &copy; Copyright <strong><span>Furniture</span></strong>. All Rights Reserved
      </div>
      <div className="credite text-center">
        Designed By <a href="#">vs coding</a>
      </div>
    </footer>
  );
}

export default Footer;
