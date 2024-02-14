import React from 'react'
import { useParams } from 'react-router-dom'
import { AiTwotoneEdit, AiTwotoneDelete, AiFillPlusSquare } from 'react-icons/ai'

const UserProducts = () => {
  const {userID} = useParams()
  return (
    <div>
      <div className='m-auto text-center pt-10 pb-10 md:pb-14 text-[#FDF500]'>
        <h1 className='font-bebas text-3xl md:text-5xl'>{userID}'s products</h1>
        <button className='text-[#37ebf3] hover:scale-105'>
          <AiFillPlusSquare className='m-auto mt-4 text-3xl md:text-5xl'/>
          <p className='font-mont text-xs md:text-sm'>Add</p>
        </button>
      </div>
      <div className='ms-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-3 gap-3'>
        {/* card */}
        <div className='font-mont font-bold h-[520px] bg-black text-white border-zinc-600 border-[1px]'>
          {/* overlay */}
          <div>
            <img className='w-full h-[300px] object-cover bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
            <div className='p-4 h-[100px] overflow-auto text-xs sm:text-sm'>
              <a href='detail/PRODUCT1'>Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080</a>
            </div>
            <div className='pl-4 pt-1 h-[45px] font-bebas text-2xl sm:text-3xl'>
              <h2>420.69$</h2>
            </div>
            <div className='py-4 h-[75px] text-sm sm:text-base flex justify-end border-t-[1px]'>
              <button className='flex text-center justify-center items-center text-black bg-[#FDF500] w-[100px] hover:scale-105'><AiTwotoneEdit className='mr-1 text-xl'/>Edit</button>
              <button className='flex text-center justify-center items-center text-white bg-[#710000] w-[100px] hover:scale-105 mx-4'><AiTwotoneDelete className='mr-1 text-xl'/>Delete</button>
            </div>
          </div>
        </div>

        {/* card */}
        <div className='font-mont font-bold h-[520px] bg-black text-white border-zinc-600 border-[1px]'>
          {/* overlay */}
          <div>
            <img className='w-full h-[300px] object-cover bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
            <div className='p-4 h-[100px] overflow-auto text-xs sm:text-sm'>
              <a href='detail/PRODUCT1'>Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080</a>
            </div>
            <div className='pl-4 pt-1 h-[45px] font-bebas text-2xl sm:text-3xl'>
              <h2>420.69$</h2>
            </div>
            <div className='py-4 h-[75px] text-sm sm:text-base flex justify-end border-t-[1px]'>
              <button className='flex text-center justify-center items-center text-black bg-[#FDF500] w-[100px] hover:scale-105'><AiTwotoneEdit className='mr-1 text-xl'/>Edit</button>
              <button className='flex text-center justify-center items-center text-white bg-[#710000] w-[100px] hover:scale-105 mx-4'><AiTwotoneDelete className='mr-1 text-xl'/>Delete</button>
            </div>
          </div>
        </div>

        {/* card */}
        <div className='font-mont font-bold h-[520px] bg-black text-white border-zinc-600 border-[1px]'>
          {/* overlay */}
          <div>
            <img className='w-full h-[300px] object-cover bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
            <div className='p-4 h-[100px] overflow-auto text-xs sm:text-sm'>
              <a href='detail/PRODUCT1'>Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080</a>
            </div>
            <div className='pl-4 pt-1 h-[45px] font-bebas text-2xl sm:text-3xl'>
              <h2>420.69$</h2>
            </div>
            <div className='py-4 h-[75px] text-sm sm:text-base flex justify-end border-t-[1px]'>
              <button className='flex text-center justify-center items-center text-black bg-[#FDF500] w-[100px] hover:scale-105'><AiTwotoneEdit className='mr-1 text-xl'/>Edit</button>
              <button className='flex text-center justify-center items-center text-white bg-[#710000] w-[100px] hover:scale-105 mx-4'><AiTwotoneDelete className='mr-1 text-xl'/>Delete</button>
            </div>
          </div>
        </div>

        {/* card */}
        <div className='font-mont font-bold h-[520px] bg-black text-white border-zinc-600 border-[1px]'>
          {/* overlay */}
          <div>
            <img className='w-full h-[300px] object-cover bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
            <div className='p-4 h-[100px] overflow-auto text-xs sm:text-sm'>
              <a href='detail/PRODUCT1'>Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080</a>
            </div>
            <div className='pl-4 pt-1 h-[45px] font-bebas text-2xl sm:text-3xl'>
              <h2>420.69$</h2>
            </div>
            <div className='py-4 h-[75px] text-sm sm:text-base flex justify-end border-t-[1px]'>
              <button className='flex text-center justify-center items-center text-black bg-[#FDF500] w-[100px] hover:scale-105'><AiTwotoneEdit className='mr-1 text-xl'/>Edit</button>
              <button className='flex text-center justify-center items-center text-white bg-[#710000] w-[100px] hover:scale-105 mx-4'><AiTwotoneDelete className='mr-1 text-xl'/>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProducts