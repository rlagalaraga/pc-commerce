import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export const Reviews = () => {
  return (
    <div>
        <div className='w-full sm:w-[90%] m-auto bg-zinc-900 text-white'>
            <div className='text-black bg-[#FDF500] text-center text-2xl font-bebas font-bold'>
                Reviews
            </div>
            <div className='border-b-[1px] p-4'>
                <div className='flex justify-between'>
                    <h1 className='font-bebas text-lg'>TESS TICKLES</h1>
                    <p className='text-xs font-mont'>31/07/2077</p>
                </div>
                <div className='flex text-[#FDF500]'>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiOutlineStar></AiOutlineStar>
                </div>
                <p className='my-3'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non recusandae, commodi repudiandae exercitationem, architecto assumenda nobis doloribus, 
                    deleniti obcaecati quaerat at quam! Rerum vitae quam culpa! Voluptates dolore sint.
                </p>
            </div>
            <div className='border-b-[1px] p-4'>
                <div className='flex justify-between'>
                    <h1 className='font-bebas text-lg'>HUGH G. RECTION</h1>
                    <p className='text-xs font-mont'>28/01/2077</p>
                </div>
                <div className='flex text-[#FDF500]'>
                    <AiFillStar></AiFillStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                </div>
                <p className='my-3'>
                    Not very huge
                </p>
            </div>
            <div className='border-b-[1px] p-4'>
                <div className='flex justify-between'>
                    <h1 className='font-bebas text-lg'>Barry McKockiner</h1>
                    <p className='text-xs font-mont'>10/09/2077</p>
                </div>
                <div className='flex text-[#FDF500]'>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                </div>
                <p className='my-3'>
                    Yes
                </p>
            </div>
        </div>
    </div>
  )
}

export default Reviews
