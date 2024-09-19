import React, { useState, useEffect } from "react";
import Navigation from "../layout/Navigation";
import { applyHero } from "../../assets/homePageButton";
import Footer from "../layout/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    dob: "",
    location: "",
    registeredNurse: "",
    bsnDegree: "",
    immigrationPetition: "",
    currentEmployee: "",
    submittedApplication: "",
    questions: "",
    file: null, // File input for the resume
    geoLocationUrl: "", // Geolocation URL
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add a loading state

  // Geolocation fetch on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData((prev) => ({
            ...prev,
            geoLocationUrl: mapsUrl,
          }));
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setErrors({ file: "Only PDF files are allowed." });
    } else if (file && file.size > 5 * 1024 * 1024) {
      setErrors({ file: "File size must be less than 5MB." });
    } else {
      setErrors((prev) => ({ ...prev, file: "" })); // Clear file errors
      setFormData((prev) => ({
        ...prev,
        file,
      }));
    }
  };


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    const data = new FormData();
    
    // Append form data to FormData object
    Object.keys(formData).forEach((key) => {
      if (key === "file" && formData.file) {
        data.append(key, formData.file); // Append the file if present
      } else {
        data.append(key, formData[key]); // Append other form fields
      }
    });

    try {
      // Send form data to the backend via POST request
      const response = await axios.post("/apply-now", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart for file upload
        },
      });
      
      if (response.data.success) {
        navigate("/doneApplication");
      } else {
        setErrors({ general: "There was an issue with your submission." });
      }
    } catch (error) {
      setErrors({ general: "There was an error submitting your application." });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  
  return (
    <section className="bg-primaryBackground">
      <Navigation />
      <div className="flex items-center justify-center py-8">
        <img src={applyHero} alt="Application Form Hero" />
      </div>

      <div className="flex flex-col items-center text-[#093761] px-4 py-8">
        <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit} className="w-full max-w-4xl">
           {/* Display error messages */}
           {errors.general && <div className="text-red-500 mb-4">{errors.general}</div>}

          {/* Form fields go here */}
          {/* Include the existing fields for name, contact, etc. */}
          {/* Two-column layout with three rows each */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <input
              type="text"
              name="registeredNurse"
              placeholder="Are you a registered nurse?"
              value={formData.registeredNurse}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="bsnDegree"
              placeholder="Do you have a Bachelor of Science in Nursing Degree?"
              value={formData.bsnDegree}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="immigrationPetition"
              placeholder="Have you had an Employment-Based Immigration Petition filed on your behalf?"
              value={formData.immigrationPetition}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="currentEmployee"
              placeholder="Are you a current or former employee of PNS?"
              value={formData.currentEmployee}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="submittedApplication"
              placeholder="If not, have you submitted an application?"
              value={formData.submittedApplication}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-full text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="questions"
              placeholder="Do you have any questions for us?"
              value={formData.questions}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#366510] rounded-md text-[#093761] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex flex-col items-start px-4 py-8">
            <p className="mb-4 text-[#093761]">
              Please upload your CV/Resume as a PDF file.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
            <div>
              <input
                type="file"
                name="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
                className="file:border file:bg-[#093761] file:text-white file:py-2 file:px-4 file:rounded-full"
              />
              {errors.file && <div className="text-red-500">{errors.file}</div>}
            </div>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
                className="px-4 py-2 bg-red-500 text-white rounded-full"
              >
                Remove Files
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-full"
              >
                {formData.file ? formData.file.name : "No File Chosen"}
              </button>
            </div>

            <p className="text-sm text-[#093761] mb-4">
            By providing your information on this form, you understand and consent that the data you provide may be used by Pacific Nursing Solutions for the purpose of evaluating your application for employment opportunities. You acknowledge that this information may be used for recruitment, processing of visa applications, and related activities. You also release Pacific Nursing Solutions from any legal obligations under the Data Privacy Act of 2012 and other applicable laws and regulations regarding the handling of your personal data.
            </p>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="consent"
                required
                className="form-checkbox text-blue-500"
              />
              <label htmlFor="consent" className="text-[#093761]">
              I have read and agree to the Privacy Notice. *
              </label>
            </div>
          </div>

          <div className="flex justify-start py-8">
          <button
              type="submit"
              className={`bg-[#093761] text-white px-8 py-4 rounded-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </section>
  );
};

export default ApplicationForm;
