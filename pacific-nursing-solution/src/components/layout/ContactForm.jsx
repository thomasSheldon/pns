import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentEmployee: '',
    submittedApplication: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    setFormData({
      ...formData,
      [name || id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/.netlify/functions/send-email', formData);
      if (response.data.success) {
        alert('Form submitted successfully');
        // Clear the form after submission if needed
        setFormData({
          fullName: '',
          email: '',
          currentEmployee: '',
          submittedApplication: '',
          message: '',
        });
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  return (
    <div className="flex flex-wrap p-6 bg-primaryBackground rounded-md lg:mx-20 md:mx-16">
      {/* First Column */}
      <div className="w-full md:w-1/2">
        <h2 className="lg:text-[100px] md:text-[90px] sm:text-[70px] text-[60px] text-[#3D9000] font-bold mb-4">Contact Us</h2>
        <p className="text-[#17395B] lg:text-[20px] lg:pr-20 md:pr-10">
          We’re here to help! Please fill out the form below and we’ll get back to you as soon as possible.
        </p>
      </div>

      {/* Second Column */}
      <div className="w-full md:w-1/2 p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                  required
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
                  required
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
  );
};

export default ContactForm;
