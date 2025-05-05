import React from 'react';

const Chevron = ({ direction = 'down' }) => {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Chevron;