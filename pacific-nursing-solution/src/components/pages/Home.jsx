import React, { useState, Suspense, lazy } from "react";
import Navigation from "../layout/Navigation";
import {
  homeHero,
  homeOurService,
  joinHero,
  ourPhilo,
  costWagesPlacements,
  faqsHome,
} from "../../assets/homePageButton";

// const HomeHero = lazy(() => import('../../assets/homePageButton/homeHero.svg').then(module => ({ default: module.ReactComponent })));
// const HomeOurService = lazy(() => import('../../assets/homePageButton/homeOurService.svg').then(module => ({ default: module.ReactComponent })));


import { homeOurServiceContent } from "../../constants";
import Button from "../layout/Button";
import ApplicationNow from "../layout/ApplicationNow";
import ContactForm from "../layout/ContactForm";
import Footer from "../layout/Footer";

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({
    homeHero: false,
    homeOurService: false,
    joinHero: false,
    ourPhilo: false,
    costWagesPlacements: false,
    faqsHome: false,
  });

  const faqsData = [
    {
      question: "What services does pacific nursing solutions provide?",
      answer:
        "Pacific Nursing Solutions specializes in recruiting skilled nurses internationally and assisting them in  obtaining the necessary visas and certifications to work in the United States.",
    },
    {
      question:
        "How does Pacific Nursing Solutions support nurses in the visa application process?",
      answer:
        "We guide nurses through every step of the visa application process, including document preparation, submission, and interview coaching, ensuring compliance with all U.S. immigration requirements.",
    },
    {
      question: "What qualifications do I need to apply for your program?",
      answer:
        "Yes, we ship to over 100 countries worldwide. Shipping fees and delivery times may vary depending on the destination.",
    },
    {
      question: "What costs are involved in the process?",
      answer:
        "Costs can include fees for visa applications, exam registrations, exam prep and relocation. Pacific Nursing Solutions offers transparent fee structures.",
    },
    {
      question:
        "What type of support is available after I start working in the U.S.?",
      answer:
        "Yes, we ship to over 100 countries worldwide. Shipping fees and delivery times may vary depending on the destination.",
    },
    {
      question:
        "Can I speak with someone directly about my application and the process?",
      answer:
        "Yes, we ship to over 100 countries worldwide. Shipping fees and delivery times may vary depending on the destination.",
    },
    {
      question:
        "What makes Pacific Nursing Solutions unique compared to other recruitment agencies?",
      answer:
        " Pacific Nursing Solutions stands out due to our personalized approach, comprehensive support services, and navigating the U.S. immigration and licensing process for nurses. We not only focus on recruitment but also ensure our nurses are fully prepared and supported throughout their transition to working and living in the U.S. Our commitment to the success and well-being of our nurses sets us apart.",
    },
    {
      question:
        "What factors can affect the timeline of the recruitment and relocation process?",
      answer:
        "Several factors can influence the timeline, including the time needed to gather and prepare necessary documents, the availability of visa interview appointments, the processing speed of U.S. immigration services, and the nurse's preparedness for exams like the NCLEX-RN. Additionally, specific healthcare facility requirements  and finding placement can also impact the overall duration of the process.'",
    },
    {
      question:
        "What are the necessary steps to join Pacific Nursing Solutions and start working in the U.S.?",
      answer:
        "Yes, we ship to over 100 countries worldwide. Shipping fees and delivery times may vary depending on the destination.",
    },
    {
      question:
        " What kind of healthcare facilities will I be placed in through Pacific Nursing Solutions?",
      answer:
        "Yes, we ship to over 100 countries worldwide. Shipping fees and delivery times may vary depending on the destination.",
    },
  ];


  // State to track which FAQ is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Function to toggle the visibility of the answer
  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="bg-[#D6EFFF]">
      <Navigation />
      <div className="relative">
        {!imageLoaded.homeHero && (
          <div className="placeholder">
            <div className="tetris-loader">
              <div className="tetris-container">
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
          </div>
        )}
        <img
          src={homeHero}
          alt=""
          className={`w-full ${imageLoaded.homeHero ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, homeHero: true }))}
        />
      </div>

      <div className="relative">
        {!imageLoaded.homeOurService && (
          <div className="placeholder">
            <div className="tetris-loader">
              <div className="tetris-container">
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
          </div>
        )}
        <img
          src={homeOurService}
          alt=""
          className={`w-full ${imageLoaded.homeOurService ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, homeOurService: true }))}
        />
      </div>


     {/* <div>
     <Suspense fallback={<div>Loading...</div>}>
        <HomeHero className="w-full" alt="" />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeOurService className="w-full" alt="" />
      </Suspense>
     </div> */}

      <h2 className="text-center text-[#6CBF2A] font-extrabold pt-10 text-[22px] sm:text-[30px] md:text-[40px] lg:text-[70px]">
        LEARN HOW WE PREPARE YOU FOR YOUR PACIFIC NURSING SOLUTIONS JOURNEY
      </h2>

      <p className="text-center text-[#0E3D68] font-extrabold pb-10 italic text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px]">
        We guide you through these processes and sponsor you as your employer
        for the employment-based visa.
      </p>

      <div className="flex flex-wrap justify-center sm:mx-[100px] p-10 sm:p-0">
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
              // width="lg:230px"
              className="sm:mt-4 mt-5 lg:w-[230px] sm:w-[180px] md:w-[200px] w-[100px] text-[10px] sm:text-[14px] md:text-[18px]"
            >
              LEARN MORE
            </Button>
          </div>
        ))}
      </div>

      <div>
      <div className="relative lg:mt-28">
        {!imageLoaded.joinHero && (
          <div className="placeholder">
            <div className="tetris-loader">
              <div className="tetris-container">
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
          </div>
        )}
        <img
          src={joinHero}
          alt=""
          className={`w-full ${imageLoaded.joinHero ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, joinHero: true }))}
        />
      </div>

      <div className="relative lg:p-20 md:p-16 sm:p-12 p-10">
        {!imageLoaded.ourPhilo && (
          <div className="placeholder">
            <div className="tetris-loader">
              <div className="tetris-container">
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
          </div>
        )}
        <img
          src={ourPhilo}
          alt=""
          className={`w-full ${imageLoaded.ourPhilo ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, ourPhilo: true }))}
        />
      </div>

      <div className="relative z-0 -mt-[180px] sm:-mt-[295px] md:-mt-[395px] lg:-mt-[535px] xlg:-mt-[540px]">
        {!imageLoaded.costWagesPlacements && (
          <div className="placeholder">
            <div className="tetris-loader">
              <div className="tetris-container">
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
          </div>
        )}
        <img
          src={costWagesPlacements}
          alt=""
          className={`w-full ${imageLoaded.costWagesPlacements ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, costWagesPlacements: true }))}
        />
      </div>

      </div>
      <div className="relative lg:-mt-2 sm:-mt-[7px] -mt-1">
        {!imageLoaded.faqsHome && (
          <div className="placeholder">
            <div className="tetris-loader">
              <div className="tetris-container">
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
          </div>
        )}
        <img
          src={faqsHome}
          alt=""
          className={`w-full ${imageLoaded.faqsHome ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, faqsHome: true }))}
        />
      </div>

      <div className="flex flex-col items-center px-4 py-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="w-full max-w-4xl mb-4">
            {/* Question row */}
            <div
              className={`flex justify-between items-center bg-radial-gradient px-4 py-5 cursor-pointer rounded-lg`}
              onClick={() => toggleAnswer(index)}
            >
              <span className="text-white font-medium px-1 py-5">
                {faq.question}
              </span>
              <span className="text-white">
                {expandedIndex === index ? "▲" : "▼"}
              </span>
            </div>

            {/* Answer row */}
            {expandedIndex === index && (
              <div className="bg-radial-gradient px-4 py-2 text-white border-t border-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <ApplicationNow />
      <ContactForm />
      <Footer />
    </section>
  );
};

export default Home;
