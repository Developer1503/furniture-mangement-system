// src/components/Title.jsx
import React from 'react';

const Title = ({ text1, text2, className }) => {
  return (
    <div className={`flex flex-col items-center mb-6 ${className}`}>
      <h1 className='text-4xl sm:text-5xl font-bold text-gray-800'>
        {text1} <span className='text-gray-500 font-medium'>{text2}</span>
      </h1>
      <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 mt-2'></div>
    </div>
  );
}

export default Title;
