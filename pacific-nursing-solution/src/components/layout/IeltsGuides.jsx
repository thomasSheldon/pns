import React, { useState } from "react";
import { homeOurServiceContent } from "../../constants";
import Button from "./Button";
import Navigation from "./Navigation";
import Footer from "./Footer";
const IeltsGuides = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (

    <section>
        <Navigation />
    <div className="flex flex-wrap justify-center sm:mx-[100px] my-10 p-10 sm:p-0">
      {homeOurServiceContent.map((item, index) => (
        <div
          key={item.id}
          className={`relative md:p-4 p-1 mb-8 flex flex-col items-center justify-center w-full sm:w-1/3 transition-all duration-300 delay-150 ease-in-out`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            src={hoveredIndex === index ? item.imgSrcHover : item.imgSrc}
            alt={`Service ${index + 1}`}
            className={`w-full h-auto object-cover lg:rounded-[5rem] lg:mb-5 md:mb-3 -mb-2 transition-transform duration-500 ${
              hoveredIndex === index
                ? "transform scale-105"
                : "transform scale-100"
            }`}
          />

          <Button
            color="#0E3D68"
            textColor="#78C440"
            className="sm:mt-4 mt-5 lg:w-[230px] sm:w-[180px] md:w-[200px] w-[100px] text-[10px] sm:text-[14px] md:text-[18px]"
            onClick={() => setHoveredIndex(index)} // Set hoveredIndex on button click
          >
            LEARN MORE
          </Button>
        </div>
      ))}
    </div>
    <Footer />
    </section>
    
  );
};

export default IeltsGuides;
