import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from '../layout/Navigation';
import { contactUsHero } from '../../assets/homePageButton';
import ApplicationNow from '../layout/ApplicationNow';
import Footer from '../layout/Footer';

const ContactUs = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentEmployee: '',
    submittedApplication: '',
    message: '',
  });

  const [geoLocationUrl, setGeoLocationUrl] = useState('');
  const navigate = useNavigate();

  // Fetch geolocation data on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Create a Google Maps link with the latitude and longitude
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setGeoLocationUrl(mapsUrl);
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Include geolocation URL in formData
    const dataToSend = {
      ...formData,
      geoLocationUrl,
    };
  
    try {
      // Corrected endpoint path
      const response = await axios.post('/.netlify/functions/send-email', dataToSend);
      
      if (response.data.success) {
        navigate(response.data.redirectUrl); // Redirect to the new page
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };
  

  return (
    <section className="bg-primaryBackground">
      <Navigation />
      <div className="flex items-center justify-center">
        <img src={contactUsHero} alt="Contact Us Hero" />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full md:w-1/2 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                className="w-full p-5 border border-[#366510] rounded-full text-[#093761] placeholder-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#366510]"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-5 border border-[#366510] rounded-full text-[#093761] placeholder-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#366510]"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Are you a current employee or former employee of PNS? */}
            <div className="flex flex-col mb-4">
              <p className="text-gray-700 font-semibold mb-2">
                Are you a current employee or former employee of PNS?
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="currentEmployeeYes"
                    name="currentEmployee"
                    value="yes"
                    checked={formData.currentEmployee === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="currentEmployeeYes" className="text-gray-700">
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="currentEmployeeNo"
                    name="currentEmployee"
                    value="no"
                    checked={formData.currentEmployee === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="currentEmployeeNo" className="text-gray-700">
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* If not, have you submitted an application? */}
            <div className="flex flex-col mb-4">
              <p className="text-gray-700 font-semibold mb-2">
                If not, have you submitted an application?
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="submittedApplicationYes"
                    name="submittedApplication"
                    value="yes"
                    checked={formData.submittedApplication === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="submittedApplicationYes" className="text-gray-700">
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="submittedApplicationNo"
                    name="submittedApplication"
                    value="no"
                    checked={formData.submittedApplication === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="submittedApplicationNo" className="text-gray-700">
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Large Text Box */}
            <div>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-10 border border-[#366510] rounded-full text-[#093761] placeholder-[#093761] bg-transparent focus:outline-none lg:h-[200px] focus:ring-2 focus:ring-[#366510]"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#093761] text-white rounded-full hover:bg-[#092A4D] focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <ApplicationNow />
      <Footer />
    </section>
  );
};

export default ContactUs;
