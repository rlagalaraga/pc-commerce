import './App.css';  
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Transactions from './pages/Transactions';
import UserProducts from './pages/UserProducts';
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
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart/:userID' element={<Cart/>}/>
        <Route path='/userproducts/:userID' element={<UserProducts/>}/>
        <Route path='/transactions/:userID' element={<Transactions/>}/>
      </Routes>
    </>
  );
}

export default App;
