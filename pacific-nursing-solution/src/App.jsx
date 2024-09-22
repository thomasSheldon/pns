import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import OurServices from "./components/pages/OurServices";
import AboutUs from "./components/pages/AboutUs";
import ApplicationForm from "./components/pages/ApplicationForm";
import ContactUs from "./components/pages/ContactUs";
import Faqs from "./components/pages/Faqs";
import Home from "./components/pages/Home";
import TetrisLoading from "./components/layout/TetrisLoading";
import DoneApplication from "./components/layout/DoneApplication";
import DoneContact from "./components/layout/DoneContact";
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import './App.css';

function App() {
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
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App;
