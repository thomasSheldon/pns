import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import OurServices from "./OurServices";
import AboutUs from "./AboutUs";
import ApplicationForm from "./ApplicationForm";
import ContactUs from "./ContactUs";
import Faqs from "./Faqs";
import Home from "./Home";
import TetrisLoading from "../layout/TetrisLoading";
import DoneApplication from "../layout/DoneApplication";
import DoneContact from "../layout/DoneContact";
function MainPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start loading animation whenever the component mounts
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust this to control the minimum loader duration

    // Clean up timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <TetrisLoading />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homePlacement" element={<HomePage />} />
          <Route path="/ourServices" element={<OurServices />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/applicationForm" element={<ApplicationForm />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/doneApplication" element={<DoneApplication />} />
          <Route path="/doneContact" element={<DoneContact />} />
        </Routes>
      )}
    </>
  );
}

export default MainPage;
