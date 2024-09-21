import { BrowserRouter } from 'react-router-dom';
import './index.css'
import MainPage from './components/pages/MainPage';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  )
}

export default App;
