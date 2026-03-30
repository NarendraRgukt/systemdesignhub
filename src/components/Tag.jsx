import React from 'react';
import './Tag.css';

const Tag = ({ children, active, onClick }) => {
  return (
    <button 
      className={`tag ${active ? 'tag-active' : ''}`} 
      onClick={onClick}
      disabled={!onClick}
    >
      {children}
    </button>
  );
};

export default Tag;
