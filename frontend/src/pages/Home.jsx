import React from 'react';
<<<<<<< HEAD
import HeroSection from '../components/HeroSection'; // Ensure this path is correct

const Home = () => {
    return (
        <div>
            <HeroSection />
            {/* Other content for the home page */}
        </div>
    );
};
=======
import { assets } from '../assets/assets';

const home = () => {
  return (
    <div style={{height: "100%",width: "100%",overflow: "hidden",}}>
      <div style={{textAlign: 'center'}}>
      <img src={assets.home_img} alt="Home_img" style={{width: "100%",height: "100%",objectFit: "cover",}}/>
      <h1 style={{
    position:"absolute",
    top: "50%", // Vertically center
    left: "50%", // Horizontally center
    transform: "translate(-50%, -50%)", // Adjust for perfect centering
    color: "#fff", // White text
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
  }}>Discovering the Best<br></br> 
Furniture for Your Home</h1>

      </div>
    </div>
  )

}
>>>>>>> f58d54f5c364fd4eb29fd8802567efb1a89cf8f9

export default Home;
