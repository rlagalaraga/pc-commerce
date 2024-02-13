import React, {useState, useEffect} from 'react';
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
import NotFound from './components/NotFound';
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import {URL, baseURL} from "./Api-constants";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    axios.get(URL.get_user).then(function(res){
      let user = res.data.user
      setCurrentUser(true)
      console.log("Logged in as " + user.email)
    })
    .catch(function(error){
      setCurrentUser(false)
      console.log("Not logged in")
    })
  },[])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/profile/:userID' element={<Profile/>}/>
        <Route path='/cart/:userID' element={<Cart/>}/>
        <Route path='/userproducts/:userID' element={<UserProducts/>}/>
        <Route path='/transactions/:userID' element={<Transactions/>}/>
        
        <Route path='/' element={<Home />} />
        <Route path='/products/' element={<Products />} />
        <Route path='/products/:productType' element={<Products />} />
        <Route path='/product/:productID'  element={<ProductDetail />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  );
}

export default App;
