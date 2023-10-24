import React, {useState} from "react"
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import {BsFillCartFill} from 'react-icons/bs'
import Modal from '../components/Modal';
import Login from "../forms/Login";

function Navbar() {
  const [open, setOpen] = useState(false)
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }
  return (
    <>
       <div className='flex justify-between items-center h-20 mx-auto px-4 text-white bg-black'>
            <a href="/" className="text-3xl bg-gradient-to-t pt-4 h-full font-bold text-[#FDF500] font-cyberpunk">
                DBPC
            </a>
            <ul className='font-bebas text-xl hidden md:flex'>
                <a href="" className="border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]"><li className="p-4">Transactions</li></a>
                <a href="" className="border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]"><li className="p-4">Products</li></a>
                <a href="/profile/Sample McSampleson" className="border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]"><li className="p-4">Profile</li></a>
                <a href="" className="border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]"><li className="p-4">Cart</li></a>
                <button onClick={() => setOpen(true)} className="border-b-[3px] border-black hover:border-b-[3px] hover:border-[#FDF500]"><li className="p-4">Log in | Sign up</li></button>
            </ul>
            <div onClick={handleNav} className="block md:hidden">
              <AiOutlineMenu size={30}/>
            </div>

            <div className={nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-[#710000] bg-black ease-in-out duration-500 md:left-[-100%] z-20" : "fixed left-[-100%]"}>
              <div className="flex">
                <h1 className='w-full text-3xl font-bold text-[#FDF500] font-cyberpunk m-4'>
                    DBPC
                </h1>
                <div onClick={handleNav} className="m-2">
                  <AiOutlineClose size={20}/>
                </div>
              </div>
              <ul className='font-bebas text-xl p-4'>
                <a href=""><li className="p-4 hover:bg-[#FDF500] hover:text-black">Transactions</li></a>
                <a href=""><li className="p-4 hover:bg-[#FDF500] hover:text-black">Products</li></a>
                <a href=""><li className="p-4 hover:bg-[#FDF500] hover:text-black">Profile</li></a>
                <a href=""><li className="p-5 hover:bg-[#FDF500] hover:text-black"><BsFillCartFill/></li></a>
                <a href=""><li className="p-4 hover:bg-[#FDF500] hover:text-black">Log in | Sign up</li></a>
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