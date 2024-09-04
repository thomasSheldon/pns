import React from 'react';

const Button = ({ color, textColor, width, children, className }) => {
  return (
    <button
      style={{ backgroundColor: color, color: textColor }}
      className={`px-4 py-2 rounded-full focus:outline-none ${className} ${width}`}
    >
      {children}
    </button>
  );
};

export default Button;
