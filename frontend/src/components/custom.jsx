import React from 'react';
import choose_material from '../assets/choose_material.jpg'; // Adjust path as needed

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
        {/* Left Column - Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Revamp your living space with stunning furniture pieces and your style
          </h1>
          <p className="text-gray-700 text-lg">
            Furniture plays an essential role in creating exceptional environments, whether it's a building, community, or place. At our practice, we understand the importance of thoughtful and innovative furniture solutions that complement the unique historic or natural environment of a space.
          </p>
        </div>

        {/* Right Column - Material Selection Content */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl font-bold">
            Choose your material for your furniture
          </h2>
          <p className="text-gray-700 text-lg">
            Furniture materials play a critical role in determining the overall look, feel, and durability of any furniture piece. There are a wide variety of materials available, each with its unique properties and based on their intended use, the desired style.
          </p>
          <div className="mt-4">
            <img
              src={choose_material}
              alt="Furniture material samples"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;