import React, { useState } from "react";
import axios from "axios";
import {
  loc,
  phone,
  email,
  ig,
  fb,
  linkedin,
} from "../../assets/homePageButton";
import { Link } from "react-router-dom";

const Footer = () => {
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/subscribe", {
        email: emailInput,
      });
      if (response.status === 200) {
        setMessage("Thank you for subscribing!");
        setEmailInput(""); // Clear the input field after successful submission
      } else {
        setMessage(
          "There was an issue with your subscription. Please try again."
        );
      }
    } catch (error) {
      setMessage("Error occurred. Please try again.");
    }
  };

  return (
    <footer
      className="pt-96 -mt-96 lg:pb-5 px-5 md:px-20"
      style={{
        background:
          "linear-gradient(to bottom, rgba(8, 113, 167, 0) 0%, rgba(6, 85, 126, 0.35) 40%, rgba(6, 77, 114, 0.52) 52%, rgba(5, 68, 100, 0.65) 65%, rgba(4, 57, 85, 0.8) 80%, rgba(4, 48, 71, 0.94) 94%, rgba(3, 44, 65, 1) 100%)",
      }}
    >
      <div className="flex flex-wrap justify-between text-white md:text-[#BFE7FF]">
        {/* First Column: Reach Us */}
        <div className="w-full md:w-1/3 mb-8">
          <h4 className="text-white lg:text-[24px] md:text-[24px] sm:text-[20px] text-[16px] font-extrabold mb-6">
            Reach Us
          </h4>
          <ul>
            <li className="flex items-center mb-4">
              <img src={phone} alt="Contact Icon" className="w-6 h-6 mr-4" />
              <a href="tel:+12069473706" className="hover:text-gray-300">
                +1 425-331-9078
              </a>
            </li>

            <li className="flex items-center mb-4">
              <img src={email} alt="Email Icon" className="w-6 h-6 mr-4" />
              <a
                href="mailto:info@pacificnursing.org"
                className="hover:text-gray-300"
              >
                info@pacificnursing.org
              </a>
            </li>

            <li className="flex items-center mb-4">
              <img src={loc} alt="Location Icon" className="w-6 h-6 mr-4" />
              <a
                href="https://www.google.com/maps/place/Benton+City,+Washington,+USA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Benton City, Washington, USA
              </a>
            </li>

            <li className="flex space-x-4">
              <Link
                target="_blank"
                to="https://www.linkedin.com/company/pacific-nursing-solutions/"
              >
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-6 h-6 cursor-pointer"
                />
              </Link>
              <Link
                target="_blank"
                to="https://www.instagram.com/pacificnursingsolutions "
              >
                <img
                  src={ig}
                  alt="Instagram"
                  className="w-6 h-6 cursor-pointer"
                />
              </Link>
              <Link
                target="_blank"
                to="https://www.facebook.com/profile.php?id=61559591027984&sk=about"
              >
                <img
                  src={fb}
                  alt="Facebook"
                  className="w-6 h-6 cursor-pointer"
                />
              </Link>
            </li>
          </ul>
        </div>

        {/* Second Column: Company */}
        <div className="w-full md:w-1/3 mb-8">
          <h4 className="text-white lg:text-[24px] md:text-[24px] sm:text-[20px] text-[16px] font-extrabold mb-6">
            Company
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <Link to="/aboutUs" className="hover:text-gray-300">
              About Us
            </Link>
            <Link to="/ourServices" className="hover:text-gray-300">
              Our Services
            </Link>
            <Link to="/careers" className="hover:text-gray-300">
              Careers
            </Link>
            <Link
              to="/applicationForm"
              className="hover:text-gray-300"
            >
              Application Form
            </Link>
            <Link
              to="/homePlacement"
              className="hover:text-gray-300"
            >
              Our NCLEX Guide
            </Link>
            <Link
              to="/ieltsGuide"
              className="hover:text-gray-300"
            >
              Our IELTS Guide
            </Link>
            <Link
              to="/homePlacement"
              className="hover:text-gray-300"
            >
              Our Immigration Guide
            </Link>
            <Link to="/faqs" className="hover:text-gray-300">
              FAQs
            </Link>
            <Link
              to="/homePlacement"
              className="hover:text-gray-300"
            >
              Placement Guide
            </Link>
            <Link
              to="/homePlacement"
              className="hover:text-gray-300"
            >
              Networking Benefits
            </Link>
            <Link
              to="/ieltsGuide"
              className="hover:text-gray-300"
            >
              Company Benefits
            </Link>
            <Link to="/feauture" className="hover:text-gray-300">
              Blogs
            </Link>
          </div>
        </div>

        {/* Third Column: Join Our Newsletter */}
        <div className="w-full bg-[#010C15] bg-opacity-40 p-5 rounded-md md:w-1/3 mb-8">
          <h4 className="text-white lg:text-[24px] md:text-[24px] sm:text-[20px] text-[16px] font-extrabold mb-6">
            Join Our Newsletter
          </h4>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {/* Input and Button Container */}
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-[70%] text-[#FFFFFF] bg-[#465E76] bg-opacity-40 opacity-text-[50%] px-4 py-2 rounded-l-full border-none border-r-0 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-[30%] px-2 py-2 rounded-r-full bg-[#113354] text-[#7AAEDD] hover:bg-green-600 focus:outline-none"
              >
                Subscribe
              </button>
            </div>

            <p className="mb-4 mt-4 text-auto font-extralight">
              Will send you weekly updates for your better tool management.
            </p>
          </form>

          {message && <p className="mt-4">{message}</p>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
