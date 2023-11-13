import React, {useState} from 'react'
import Modal from '../components/Modal'
import {useParams} from 'react-router-dom'

const Transactions = () => {
  const {userID} = useParams()
  const [open, setOpen] = useState(false)
  return (
    <div className='py-10'>
      <h1 className='font-bebas w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] bg-black text-5xl text-center py-5 text-[#FDF500] m-auto'>Transactions</h1>
      <div className='bg-zinc-800 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] h-[450px] sm:h-[500px] md:h-[600px] text-white overflow-auto m-auto'>
        <div className='bg-[#272932] flex items-center h-[75px] md:h-[100px] border-t-[1px] border-zinc-600'>
          <div className='flex items-center px-5 w-[80%] md:w-[85%] h-[75px] md:h-[100px] overflow-auto'>
            <div className='w-[150px] pr-2 md:pr-4 overflow-auto'>
              <p className='font-bebas text-lg md:text-xl'>420.69$</p>
              <p className='text-sm font-bebas pr-1'>Qty: 69</p>
            </div>
            <a href='' className='text-xs md:text-base font-mont'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</a>
          </div>
          <div className="w-[100px] md:w-[150px] border-t-[1px] border-zinc-600">
            <img className='object-cover w-full h-[75px] md:h-[100px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Transactions