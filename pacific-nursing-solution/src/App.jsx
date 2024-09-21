import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import MainPage from './components/pages/MainPage';
import axios from 'axios';
import PropTypes from 'prop-types';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  )
}

export default App;
