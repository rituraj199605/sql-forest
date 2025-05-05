import React from 'react';

const Leaf = ({ color = "#94A3B8", rotate = "0", size = "24" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M12.0002 22C16.8732 22 21.0002 17.873 21.0002 13C21.0002 8.12701 12.0002 2 12.0002 2C12.0002 2 3.00018 8.12701 3.00018 13C3.00018 17.873 7.12719 22 12.0002 22Z" fill={color} fillOpacity="0.2" />
      <path d="M12 22C12 22 12 11 12 7C12 3 12 2 12 2C12 2 3 8.127 3 13C3 17.873 7.127 22 12 22Z" fill={color} fillOpacity="0.3" />
    </svg>
  );
};

export default Leaf;