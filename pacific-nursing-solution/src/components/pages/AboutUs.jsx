import React, { useState } from 'react';
import Navigation from '../layout/Navigation';
import { aboutUsHero, aboutUsMissionVission, ourFounder, ourStory } from '../../assets/homePageButton';
import ApplicationNow from '../layout/ApplicationNow';
import ContactForm from '../layout/ContactForm';
import Footer from '../layout/Footer';

const AboutUs = () => {
  const [imageLoaded, setImageLoaded] = useState({
    aboutUsHero: false,
    aboutUsMissionVission: false,
    ourFounder: false,
    ourStory: false,
  });

  return (
    <section className='bg-[#D0ECFF]'>
      <Navigation />

      {/* aboutUsHero Image with Loading Effect */}
      <div className="relative">
        {!imageLoaded.aboutUsHero && (
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
          src={aboutUsHero}
          alt=""
          className={`w-full ${imageLoaded.aboutUsHero ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, aboutUsHero: true }))}
        />
      </div>

      {/* aboutUsMissionVission Image with Loading Effect */}
      <div className="relative">
        {!imageLoaded.aboutUsMissionVission && (
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
          src={aboutUsMissionVission}
          alt=""
          className={`w-full ${imageLoaded.aboutUsMissionVission ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, aboutUsMissionVission: true }))}
        />
      </div>

      {/* ourStory Image with Loading Effect */}
      <div className="relative">
        {!imageLoaded.ourStory && (
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
          src={ourStory}
          alt=""
          className={`w-full lg:p-20 md:p-10 sm:p-5 p-2 ${imageLoaded.ourStory ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, ourStory: true }))}
        />
      </div>

      {/* ourFounder Image with Loading Effect */}
      <div className="relative">
        {!imageLoaded.ourFounder && (
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
          src={ourFounder}
          alt=""
          className={`w-full ${imageLoaded.ourFounder ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(prev => ({ ...prev, ourFounder: true }))}
        />
      </div>

      <ApplicationNow />
      <ContactForm />
      <Footer />
    </section>
  );
};

export default AboutUs;