import React, { useState } from 'react';
import Navigation from '../layout/Navigation';
import { faqsHero } from '../../assets/homePageButton';
import ContactForm from '../layout/ContactForm';
import ApplicationNow from '../layout/ApplicationNow';
import Footer from '../layout/Footer';
const Faqs = () => {

  const faqsData = [
    {
      question: 'What services does pacific nursing solutions provide?',
      answer: 'Pacific Nursing Solutions specializes in recruiting skilled nurses internationally and assisting them in  obtaining the necessary visas and certifications to work in the United States.',
    },
    {
      question: 'How does Pacific Nursing Solutions support nurses in the visa application process?',
      answer: 'We guide nurses through every step of the visa application process, including document preparation, submission, and interview coaching, ensuring compliance with all U.S. immigration requirements.',
    },
    {
      question: 'What qualifications do I need to apply for your program?',
      answer: 'We are requiring that applicant should have at least passed the Nursing Licensure Exam and at least a minimum of two years working experience.',
    },
    {
      question: 'What costs are involved in the process?',
      answer: 'Costs can include fees for visa applications, exam registrations, exam prep and relocation. Pacific Nursing Solutions offers transparent fee structures.',
    },   {
      question: 'What type of support is available after I start working in the U.S.?',
      answer: 'We offer extensive career opportunities and committed on advancing your nursing career this will include job placement, mentorship and an access on cutting-edge facilities. We are committed on supporting you to achieve your goals in the U.S',
    },   {
      question: 'Can I speak with someone directly about my application and the process?',
      answer: 'Yes, you can directly reach to us, we are live 24/7 on providing you the best application experience, you can either submit your application in contact form page and our team will respond to you or just scroll down and click the contact on Reach Us section below. ',
    },   {
      question: 'What makes Pacific Nursing Solutions unique compared to other recruitment agencies?',
      answer: ' Pacific Nursing Solutions stands out due to our personalized approach, comprehensive support services, and navigating the U.S. immigration and licensing process for nurses. We not only focus on recruitment but also ensure our nurses are fully prepared and supported throughout their transition to working and living in the U.S. Our commitment to the success and well-being of our nurses sets us apart.',
    },   {
      question: 'What factors can affect the timeline of the recruitment and relocation process?',
      answer: "Several factors can influence the timeline, including the time needed to gather and prepare necessary documents, the availability of visa interview appointments, the processing speed of U.S. immigration services, and the nurse's preparedness for exams like the NCLEX-RN. Additionally, specific healthcare facility requirements  and finding placement can also impact the overall duration of the process.'",
    },   {
      question: 'What are the necessary steps to join Pacific Nursing Solutions and start working in the U.S.?',
      answer: 'You will need to submit your application, provide your updated Resume and answer the necessary question. After this, just sit back and relax because our team will do the rest and will contact you as soon as possible.',
    },   {
      question: ' What kind of healthcare facilities will I be placed in through Pacific Nursing Solutions?',
      answer: 'We are committed on making you have an access on cutting-edge facilities to work in the top U.S. Health Care facilities, we will connect you with the placement in a hospital as we directly employ you for that position.',
    },
  ];

    // State to track which FAQ is expanded
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Function to toggle the visibility of the answer
    const toggleAnswer = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };


  return (
    <section className='bg-primaryBackground'>
    <Navigation />
    <div className='flex items-center justify-center'>
      <img src={faqsHero} alt="" className='lg:pt-20 p-5 w-full' />
    </div>

    <div className="flex flex-col items-center px-4 py-8">
      {faqsData.map((faq, index) => (
        <div key={index} className="w-full max-w-4xl mb-4">
          {/* Question row */}
          <div
            className={`flex justify-between items-center bg-radial-gradient px-4 py-5 cursor-pointer rounded-md`}
            onClick={() => toggleAnswer(index)}
          >
            <span className="text-white font-medium px-1 py-5">{faq.question}</span>
            <span className="text-white">
              {expandedIndex === index ? '▲' : '▼'}
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

    <ContactForm />
    <ApplicationNow />
    <Footer />
  </section>
  )
}

export default Faqs