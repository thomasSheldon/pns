import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import burgerMenu from '../../assets/burgerMenu.svg';
import mainLogo from '../../assets/mainLogo.svg';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-primaryBackground">
      {/* First Column */}
      <div className="flex items-center space-x-2">
        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden relative">
          <button className="hamburger" onClick={toggleMenu}>
            <img className="h-8 w-8" src={burgerMenu} alt="Menu" />
          </button>
          <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center space-y-8 bg-primaryBackground transform transition-transform duration-500 ease-in-out ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-2xl text-blue-900" onClick={toggleMenu}>
              <img src={mainLogo} alt='logo'></img>
            </button>
            <Link
              to="/"
              className="text-blue-900 text-lg font-bold"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/aboutUs"
              className="text-blue-900 text-lg font-bold"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/ourServices"
              className="text-blue-900 text-lg font-bold"
              onClick={toggleMenu}
            >
              Our Services
            </Link>
            <Link
              to="/contactUs"
              className="text-blue-900 text-lg font-bold"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            <Link
              to="/faqs"
              className="text-blue-900 text-lg font-bold"
              onClick={toggleMenu}
            >
              FAQs
            </Link>
            <Link
              to="/applicationForm"
              className="text-blue-900 text-lg font-bold"
              onClick={toggleMenu}
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Logo and Text for All Screens */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={mainLogo} alt="Your Image" className="h-8 w-8 md:h-12 md:w-12" />
          <span className="text-base font-bold text-blue-900 md:text-xl">
            Pacific Nursing Solutions
          </span>
        </Link>
      </div>

      {/* Second Column for Larger Screens */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-blue-900 font-normal">Home</Link>
        <Link to="/aboutUs" className="text-blue-900 font-normal">About Us</Link>
        <Link to="/ourServices" className="text-blue-900 font-normal">Our Services</Link>
        <Link to="/contactUs" className="text-blue-900 font-normal">Contact Us</Link>
        <Link to="/faqs" className="text-blue-900 font-normal">FAQs</Link>
        <Link to="/applicationForm" className="text-blue-900 font-normal">Apply Now</Link>
      </div>
    </nav>
  );
};

export default Navigation;
