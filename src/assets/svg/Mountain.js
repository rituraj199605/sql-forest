import React from 'react';

const Mountain = ({ color = "#2D3F4C", size = "100" }) => {
  return (
    <svg width={size} height={Math.round(parseInt(size) * 0.6)} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 60H100V40C100 40 85 25 70 35C55 45 50 30 30 35C10 40 0 60 0 60Z" fill={color} fillOpacity="0.2" />
      <path d="M0 60H100V45C100 45 75 30 60 40C45 50 35 35 20 40C5 45 0 60 0 60Z" fill={color} fillOpacity="0.4" />
    </svg>
  );
};

export default Mountain;