import React from 'react';
import { assets } from '../assets/assets';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${assets.home_img})`
      }}
    >
      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-screen">
       

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-full">
          {/* Heading */}
          <h1 className="text-8xl text-white text-center font-roboto mb-8 max-w-[1000px]">
            Discovering the Best<br />
            Furniture for Your Home
          </h1>

          {/* Subheading */}
          <p className="text-xl text-white text-center font-roboto max-w-[800px]">
            Our practice is Designing Complete Environments exceptional buildings<br />
            , communities and place in special situations, where a unique history
          </p>
        </div>

        {/* Price Match Button */}
        <div className="absolute right-8 bottom-12">
          <button className="text-4xl text-black font-bold font-roboto bg-white px-8 py-4 rounded-full">
            Price Match Guarantee
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;