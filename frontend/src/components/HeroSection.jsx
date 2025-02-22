import React from 'react';
import { assets } from '../assets/assets'; // Ensure this path is correct

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${assets.home_img})`,
        height: "100vh", // Ensure full viewport height
        width: "100%",
        overflow: "hidden",
        backgroundSize: "cover", // Ensure the image covers the full screen
      }}
    >
      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
        {/* Heading */}
        <div data-layer="Discovering the Best Furniture for Your Home" className="DiscoveringTheBestFurnitureForYourHome text-center text-white text-4xl font-normal font-['Roboto']"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "3rem", // Set font size to 48px
            fontWeight: "bold",
            position: "absolute",
            top: "40%", // Vertically center
            left: "50%", // Horizontally center
            transform: "translate(-50%, -50%)", // Adjust for perfect centering
            color: "white", // Set font color to white
          }}>
          Discovering the Best <br/>Furniture for Your Home
        </div>

        {/* Additional Text */}
        <div data-layer="Our practice is Designing Complete Environments exceptional buildings , communities and place in special situations, where a unique history" className="OurPracticeIsDesigningCompleteEnvironmentsExceptionalBuildingsCommunitiesAndPlaceInSpecialSituationsWhereAUniqueHistory text-center text-white text-xl font-normal font-['Roboto'] hide-on-small"
          style={{
            position: "absolute",
            top: "55%", // Adjust position as needed
            left: "50%", // Horizontally center
            transform: "translate(-50%, -50%)", // Adjust for perfect centering
            fontSize: "1rem", // Set font size to 16px
            color: "white", // Set font color to white,
          }}>
          Our practice is Designing Complete Environments exceptional buildings<br/>, communities and place in special situations, where a unique history
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
