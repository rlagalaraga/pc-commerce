import React from 'react'
import { useParams } from 'react-router-dom'
import { BsFillCartFill } from 'react-icons/bs'
import { useState } from 'react'
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri'

export const Detail = () => {
  const {productID} = useParams()
  const slides = [
    "https://cdn.originpc.com/img/gaming-desktops.jpg",
    "https://cdn.originpc.com/img/gaming-desktops-2.jpg",
    "https://cdn.originpc.com/img/pdp/gaming/desktops/chronos/chronos-v3-performance-mobile.jpg"
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div>
      <div className='bg-black text-white w-full sm:w-[90%] m-auto'>
        <div className='bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 flex text-white border-b-[1px] border-[#FDF500]'>
          <button onClick={prevSlide} className='hover:bg-[#FDF500] hover:text-black bg-black text-white m-auto rounded-[50px] bg-opacity-30'>
            <RiArrowLeftDoubleLine className='text-5xl sm:text-7xl hover:cursor-pointer'></RiArrowLeftDoubleLine>
          </button>
          {/* <img className='object-contain m-auto w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[650px] duration-500' src={slides[currentIndex]} alt="" /> */}
          <div style={{ backgroundImage: `url(${slides[currentIndex]})`}} className='bg-cover bg-center m-auto w-full h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] lg:w-[1000px] duration-500'></div>
          <button onClick={nextSlide} className='hover:bg-[#FDF500] hover:text-black bg-black text-white m-auto rounded-[50px] bg-opacity-30'>
            <RiArrowRightDoubleLine className='text-5xl sm:text-7xl hover:cursor-pointer'></RiArrowRightDoubleLine>
          </button>
        </div>
        <div className='p-4'>
          <p className='text-green-500 italic'>IN STOCK</p>
          <h1 className='font-bebas font-bold text-3xl py-4'>{productID}</h1>
          <p className='font-mont text-sm'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non recusandae, commodi repudiandae exercitationem, architecto assumenda nobis doloribus, 
            deleniti obcaecati quaerat at quam! Rerum vitae quam culpa! Voluptates dolore sint. Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Non recusandae, commodi repudiandae exercitationem, architecto assumenda nobis doloribus, deleniti obcaecati quaerat at quam! Rerum vitae quam culpa! 
            Voluptates dolore sint.
          </p>
          <div className='flex pt-10 pb-4 justify-between sm:justify-normal'>
            <div className='text-sm sm:text-base font-mont font-bold mr-4'>
              <button className='flex p-2 text-[#FDF500] border-[1px] border-[#FDF500] w-auto active:text-black active:bg-[#FDF500]'><BsFillCartFill className='pr-1 h-5 text-3xl'/>Add to cart</button>
            </div>
            <p className='font-bebas text-3xl sm:text-4xl p-1'>
              $420.69
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail