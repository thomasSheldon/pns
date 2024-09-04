// TetrisLoader.jsx
import React from "react";
import "./TetrisLoading.css"; // Ensure this CSS file is correctly linked

const TetrisLoading = () => {
  return (
    <div className="tetris-loader">
      <div className="tetris-container">
        {/* Adding multiple blocks with different colors and staggered animations */}
        <div className="block block1"></div>
        <div className="block block2"></div>
        <div className="block block3"></div>
        <div className="block block4"></div>
        <div className="block block5"></div>
        <div className="block block6"></div>
        <div className="block block7"></div>
        <div className="block block8"></div>
      </div>
    </div>
  );
};

export default TetrisLoading;
