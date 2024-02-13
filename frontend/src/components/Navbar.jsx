import React, {useState, useEffect} from "react"
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import {BsFillCartFill} from 'react-icons/bs'
import Modal from '../components/Modal';
import Login from "../forms/Login";
import axios from "axios";
import {URL, baseURL} from "../Api-constants";
import defaultAvatar from "../assets/images/defaultAvatar.png"

const getCsrfToken = () => {
  const csrfCookie = document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='));

  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

// Use the function to get the CSRF token
const csrfToken = getCsrfToken();


const Navbar = ({ refreshKey }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav)
  };

  useEffect(() => {
    axios.get(URL.get_user).then(function(res){
      setCurrentUser(true)
      setUser(res.data.user)
    })
    .catch(function(error){
      setCurrentUser(false)
    })
  },[])

  function logout(e) {
    e.preventDefault();
    axios.post(
      URL.logout, null,
      {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      }
    ).then(function(res){
      setCurrentUser(false)
      window.location.href = '/'
    });
  }

  return (
    <>
       <div className='flex justify-between items-center h-20 mx-auto px-4 text-white bg-black'>
            <a href="/" className="text-3xl bg-gradient-to-t pt-4 h-full font-bold text-[#FDF500] font-cyberpunk hover:scale-110 hover:text-[#37EBF3]">
                DBPC
            </a>
            <ul className='font-bebas text-xl hidden md:flex' key={refreshKey}>
                <button onClick={() => setOpen(true)} className={!currentUser? "border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]":"hidden"}><li className="p-4">Log in | Sign up</li></button>
                <form onSubmit={e => logout(e)}>
                  <button type="submit" className={currentUser? "border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]":"hidden"}><li className="p-4">Logout</li></button>
                </form>
                {currentUser && user && (
                  <>
                    <a href="/transactions/Sample McSampleson" className="border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]"><li className="p-4">Transactions</li></a>
                    <a href="/cart/Sample McSampleson" className="border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]"><li className="p-4">Cart</li></a>
                    
                    <a href={"/profile/" + user.id} className="border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]"><li className="p-4">
                      {currentUser && user && user.avatar ? 
                      (<img className="object-cover w-[30px] h-[30px] mx-auto rounded-full bg-white hover:scale-110" src={baseURL + user.avatar}/>):
                      (<img className="object-cover w-[30px] h-[30px] mx-auto rounded-full bg-white hover:scale-110" src={defaultAvatar}/>)}
                    </li></a>
                  </>
                )}
            </ul>
            <div onClick={handleNav} className="block md:hidden">
              <AiOutlineMenu size={30}/>
            </div>

            <div className={nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-[#710000] bg-black ease-in-out duration-500 md:left-[-100%] z-20" : "fixed left-[-100%]"}>
              <div className="flex">
                <a href="/" className='w-full text-3xl font-bold text-[#FDF500] font-cyberpunk m-4'>
                    DBPC
                </a>
                <div onClick={handleNav} className="m-2">
                  <AiOutlineClose size={20}/>
                </div>
              </div>
              <ul className='font-bebas text-xl p-4'>
                {currentUser && user ? (
                  <>
                    <a href="/transactions/Sample McSampleson"><li className="p-4 hover:bg-[#FDF500] hover:text-black">Transactions</li></a>
                    <a href="/userproducts/Sample McSampleson"><li className="p-4 hover:bg-[#FDF500] hover:text-black">Products</li></a>
                    <a href="/profile/Sample McSampleson"><li className="p-4 hover:bg-[#FDF500] hover:text-black">Profile</li></a>
                    <a href="/cart/Sample McSampleson"><li className="p-5 hover:bg-[#FDF500] hover:text-black flex"><BsFillCartFill className="mr-2"/>CART</li></a>
                    <form onSubmit={e => logout(e)}>
                      <button type="submit" className="w-full text-left"><li className="p-4 hover:bg-[#FDF500] hover:text-black">Logout</li></button>
                    </form>
                  </>
                ):(
                  <button onClick={() => setOpen(true)} className="w-full text-left"><li className="p-4 hover:bg-[#FDF500] hover:text-black">Log in | Sign up</li></button>
                )}
              </ul>
            </div>
       </div>

       <Modal open={open} onClose={() => setOpen(false)}>
        <Login></Login>
       </Modal>
    </>
  )
}

export default Navbar