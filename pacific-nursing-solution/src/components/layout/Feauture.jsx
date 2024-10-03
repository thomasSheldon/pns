import React from 'react';
import "./feauture.css" ;
import Button from './Button';
import { Link } from 'react-router-dom';
const Feauture = () => {
  return (
    <div className="tetris-loading-feature">
      {/* Tetris block animation */}
      <div className="tetris-container-feature">
        <div className="block-feature block1-feature"></div>
        <div className="block-feature block2-feature"></div>
        <div className="block-feature block3-feature"></div>
        <div className="block-feature block4-feature"></div>
        <div className="block-feature block5-feature"></div>
        <div className="block-feature block6-feature"></div>
        <div className="block-feature block7-feature"></div>
        <div className="block-feature block8-feature"></div>
      </div>
      
      {/* Text centered below the Tetris animation */}
      <div className="text-container text-center p-3">
        <h2 className="feature-text bolder text-[18px] sm:text-[24px] md:text-[36px] lg:text-[42px]">This Feature is Coming Soon</h2>
        <p className="description-text">
          Stay tuned! We're working hard to bring this feature to life.
        </p>
      </div>

      {/* Container for buttons, aligned horizontally */}
      <div className="button-container">
       <Link to="/">
       <Button color="#6CBF2A" textColor="#FFF" width="w-40" className="mr-2">
          Go Back to Home
        </Button>
       </Link>
       <Link to="/applicationForm">
        <Button color="#093761" textColor="#FFF" width="w-40" className="ml-2">
            Apply Instead
          </Button>
       </Link>
       
      </div>
    </div>
  );
}

export default Feauture