import { useState } from 'react';
import { UserProvider } from './components/userContext/UserContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import MainPage from './components/pages/MainPage'


import './App.css'

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
