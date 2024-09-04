import React from 'react';
import Navigation from '../layout/Navigation';
import { aboutUsHero, aboutUsMissionVission, ourFounder, ourStory } from '../../assets/homePageButton';
import ApplicationNow from '../layout/ApplicationNow';
import ContactForm from '../layout/ContactForm';
import Footer from '../layout/Footer';

const AboutUs = () => {
  return (
    <section className='bg-[#D0ECFF]'>
      <Navigation/>
      <div>
        <img src={aboutUsHero} alt="" className='w-full'/>
      </div>      
      <div>
        <img src={aboutUsMissionVission} alt="" className='w-full'/>
      </div>
      <div>
        <img src={ourStory} alt="" className='w-full lg:p-20 md:p-10 sm:p-5 p-2'/>
      </div>      
      <div>
        <img src={ourFounder} alt="" className='w-full'/>
      </div>

      <ApplicationNow/>
      <ContactForm />
      <Footer />
    </section>
  )
}

export default AboutUs