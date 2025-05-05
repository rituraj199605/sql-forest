import React from 'react';
import Leaf from '../../assets/svg/Leaf';

const Header = () => {
  return (
    <header className="mb-8 text-center relative">
      <div className="absolute -top-2 -left-4">
        <Leaf color="#94a3b8" rotate="30" size="40" />
      </div>
      <div className="absolute top-6 right-2">
        <Leaf color="#cbd5e1" rotate="-20" size="24" />
      </div>
      <h1 className="text-4xl font-light text-slate-800 mb-2">SQL Forest</h1>
      <p className="text-slate-500 max-w-lg mx-auto">
        Journey through the forest of SQL knowledge, solving challenges as you grow your skills
      </p>
    </header>
  );
};

export default Header;