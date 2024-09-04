import React, { useState } from 'react';
import Navigation from '../layout/Navigation';
import { heroServices, handsOnHero } from '../../assets/homePageButton';
import { OurServicesSources } from '../../constants';
import ApplicationNow from '../layout/ApplicationNow';
import ContactForm from '../layout/ContactForm';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';

const OurServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = (index) => {
    const timeout = setTimeout(() => {
      setHoveredIndex(index);
    }, 200); // 200ms delay for hover effect
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setHoveredIndex(null);
  };

  return (
    <>
      <Navigation />
      <div className="bg-primaryBackground">
        <div>
          <img src={heroServices} alt="Hero Services" className="w-full" />
        </div>

        <div className="flex flex-wrap items-center justify-center lg:mx-[200px] md:mx-[200px] sm:mx-[100px] mx-[50px]">
          {OurServicesSources.length > 0 ? (
            OurServicesSources.map((item, index) => (
              <div
                key={item.id}
                className="relative p-4 rounded-[5rem] flex items-center justify-center mx-4"
                style={{ width: '100%', maxWidth: '1200px' }}
              >
                {/* Text Image */}
                <div className="relative w-full h-auto">
                  <img
                    src={item.imgText}
                    alt="Text Image"
                    className="w-full h-auto object-cover rounded-[5rem]"
                  />
                </div>

                {/* Absolute Box containing the Service Image */}
                <div
                  className="absolute top-0"
                  style={{
                    width: '35%',
                    height: '70%',
                    left: '-17.5%',
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={hoveredIndex === index ? item.imgSrcHover : item.imgSrc}
                    alt="Service Image"
                    className="w-full h-full object-cover rounded-[5rem] transition-all duration-500 ease-in-out"
                  />
                </div>

                {/* "See More" Button */}
                <Link to="/homePlacement">
                  <div
                    className="absolute px-16 bg-[#6CBF2A] text-[#17395B] text-center lg:py-3 py-1 cursor-pointer rounded-[5rem] transition-all hover:bg-blue-500"
                    style={{
                      width: 'auto',
                      top: 'calc(70% + 15px)', // Positioned 15px below the image
                      left: '-10%',
                    }}
                  >
                    SEE OUR GUIDE
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-lg">No services available</div>
          )}
        </div>

        <div>
          <img src={handsOnHero} alt="Hero Services" className="w-full" />
        </div>

        <ApplicationNow />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
};

export default OurServices;
