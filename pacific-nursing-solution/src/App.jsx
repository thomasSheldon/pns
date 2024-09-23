import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainPage from './components/pages/MainPage';
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
