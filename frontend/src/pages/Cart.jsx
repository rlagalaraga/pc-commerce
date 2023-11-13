import React, {useState} from 'react'
import Modal from '../components/Modal'
import {useParams} from 'react-router-dom'

const Cart = () => {
  const {userID} = useParams()
  const [open, setOpen] = useState(false)
  return (
    <div className='py-10'>
      <h1 className='font-bebas w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] bg-black text-5xl text-center py-5 text-[#FDF500] m-auto'>CART</h1>
      <div className='bg-zinc-800 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] h-[450px] sm:h-[500px] md:h-[600px] text-white overflow-auto m-auto'>
        <div className='bg-[#272932] flex items-center h-[75px] md:h-[100px] border-t-[1px] border-zinc-600'>
          <div className='border-r-[1px] border-zinc-600 flex items-center h-full text-center px-4 md:px-7'>
            <input type="checkbox" />
          </div>
          <div className='flex items-center px-5 w-[70%] md:w-[80%] h-[75px] md:h-[100px] overflow-auto'>
            <div className='w-[150px] pr-2 md:pr-4 overflow-auto'>
              <p className='font-bebas text-lg md:text-xl'>420.69$</p>
              <label className='text-sm font-bebas pr-1'>Qty:</label>
              <input type="number" defaultValue={1} min={1} className='w-[50px] bg-zinc-900 text-center text-xs md:py-1 font-bebas' />
            </div>
            <a href='' className='text-xs md:text-base font-mont'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</a>
          </div>
          <div className='w-[100px] md:w-[150px] border-t-[1px] border-zinc-600'>
            <img className='object-cover w-full h-[75px] md:h-[100px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
          </div>
        </div>

      </div>
      <div className='bg-black w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] text-white m-auto p-4'>
        <div className='flex justify-between pb-2 font-bebas text-2xl'>
          <p>Subtotal:</p>
          <p>420.69$</p>
        </div>
        <button onClick={() => setOpen(true)} className='bg-[#FDF500] text-black w-full py-2 font-bebas font-bold text-2xl active:bg-[#37ebf3]'>Checkout</button>

      </div> 
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='px-4 pt-4 w-[300px]'>
              <h1 className='pb-5 font-bebas text-2xl'>Confirm purchase?</h1>
              <br />
              <br />
              <div className='flex justify-between'>
                  <button className='font-bebas text-lg text-white bg-[#710000] py-1 px-4 w-[100px] hover:scale-105' onClick={() => setOpen(false)}>Cancel</button>
                  <button className='font-bebas text-lg text-black bg-[#FDF500] py-1 px-4 w-[100px] hover:scale-105' onClick={() => setOpen(false)}>Confirm</button>
              </div>
          </div>
      </Modal> 
    </div>
  )
}

export default Cart