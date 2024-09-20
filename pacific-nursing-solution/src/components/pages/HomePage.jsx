import React, { useState } from "react";
import Navigation from "../layout/Navigation";
import homePageHero from "../../assets/homePageHero.svg";
import { homePageOption } from "../../constants";
import Button from "../layout/Button";
import ContactForm from "../layout/ContactForm";
import Footer from "../layout/Footer";
import ApplicationNow from "../layout/ApplicationNow";

const HomePage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredId(null);
    }, 200); // 200ms delay for exit
    setHoverTimeout(timeout);
  };

  return (
    <section className="bg-primaryBackground">
      <Navigation />
      <img src={homePageHero} alt="Hero Section" className="w-full" />
      <h4 className="font-archivo text-center text-[#6CBF2A] lg:text-[80px] md:text-[50px] sm:text-[30px] text-[20px] py-5">
        PLACEMENT PREPARATION <br /> BENEFITS GUIDE
      </h4>
      <h3 className="text-[#0E3D68] text-center lg:text-[28px] md:text-[22px] sm:text-[18px] text-[14px] lg:pb-[20px] md:pb-[15px] sm:pb-[12px] pb-[10px]">
        Welcome to Pacific Nursing Solutions! <br />
        Where we provide support to help you succeed in securing your desired
        placement. <br />
        Here’s how we assist you through the entire placement preparation
        process:
      </h3>

      <div className="flex flex-wrap justify-center">
        {homePageOption.map((button) => (
          <div
            key={button.id}
            className="w-full md:w-1/2 lg:w-auto lg:mx-10 p-2"
            onMouseEnter={() => handleMouseEnter(button.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col items-center">
              <img
                src={hoveredId === button.id ? button.srcHover : button.src}
                alt={button.alt || "Your Image"}
                className={`max-w-full h-auto cursor-pointer transition-transform duration-500 ${
                  hoveredId === button.id ? "flip-horizontal" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-[#366510] lg:text-[40px] md:text-[30px] sm:text-[20px]  text-[16px] py-10">
        We are committed to your success and here to <br /> support you every
        step of the way. Let’s work together <br /> to ensure you’re fully
        prepared to secure your desired <br /> placement and achieve your career
        goals.
      </p>

      <div className="flex items-center justify-center pb-10">
        <Button color="#6CBF2A" textColor="#093761" width="393px">
          See Other Services
        </Button>
      </div>

      <ApplicationNow />

      <ContactForm />

      <Footer />
    </section>
  );
};

export default HomePage;
