import './App.css';  
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route></Route>
      </Routes>
    </>
  );
}

export default App;
