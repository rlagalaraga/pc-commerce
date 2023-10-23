import './App.css';  
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productType' element={<Products />} />
        <Route path='/products/detail/:productID'  element={<ProductDetail />} />
        <Route path='/profile/:userID' element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
