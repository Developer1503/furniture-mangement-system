import React from 'react';
import HeroSection from '../components/HeroSection'; // Ensure this path is correct
import { assets } from '../assets/assets'; // Ensure assets are correctly exported and available

const Home = () => {
    return (
        <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
            <div style={{ textAlign: 'center' }}>
                {/* Background Image */}
                <img
                    src={assets.home_img}
                    alt="Home_img"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                {/* Overlay Text */}
                <h1
                    style={{
                        position: "absolute",
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
                    }}
                >
                    Discovering the Best<br />
                    Furniture for Your Home
                </h1>
            </div>
            {/* Hero Section Component */}
            <HeroSection />
        </div>
    );
};

export default Home;
