import React, {useState} from "react"
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import {BsFillCartFill} from 'react-icons/bs'

function Navbar() {
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }
  return (
    <>
       <div className='flex justify-between items-center h-24 mx-auto px-4 text-white bg-black'>
            <h1 className='text-3xl font-bold text-[#FDF500] font-cyberpunk'>
                DBPC
            </h1>
            <ul className='font-bebas text-xl hidden md:flex'>
                <li className='p-4'>Gaming Gear</li>
                <li className='p-4'>PC components</li>
                <li className='p-4'>Gaming PCs</li>
                <li className='p-4'>Contact</li>
                <li className='p-4'>Log in | Sign up</li>
                <li><button className="p-4"><BsFillCartFill/></button></li>
            </ul>
            <div onClick={handleNav} className="block md:hidden">
              <AiOutlineMenu size={30}/>
            </div>

            <div className={!nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-[#710000] bg-black ease-in-out duration-500 md:left-[-100%] z-10" : "fixed left-[-100%]"}>
              <div className="flex">
                <h1 className='w-full text-3xl font-bold text-[#FDF500] font-cyberpunk m-4'>
                    DBPC
                </h1>
                <div onClick={handleNav} className="m-2">
                  <AiOutlineClose size={20}/>
                </div>
              </div>
              <ul className='font-bebas text-xl p-4'>
                <li className='p-4'>Gaming Gear</li>
                <li className='p-4'>PC components</li>
                <li className='p-4'>Gaming PCs</li>
                <li className='p-4'>Contact</li>
                <li className='p-4'>Log in | Sign up</li>
                <li><button className="p-4 w-full"><BsFillCartFill/></button></li>
              </ul>
            </div>
       </div>
    </>
  )
}

export default Navbar