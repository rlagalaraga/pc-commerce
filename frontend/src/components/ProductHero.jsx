import React from 'react'
import gamingBg from '../assets/videos/fan.mp4'
import {useParams} from 'react-router-dom'

export const ProductHero = () => {
  const { productType } = useParams()
  return (
    <div className='text-white'>
        <div className='max-h[400px] bg-black bg-opacity-50 w-full items-center lg:flex'>
            <div className='w-full px-5 py-4 lg:w-[30%]'>
              <h1 className='font-bebas font-bold text-3xl'>{!productType ? ("Products"):(productType)}</h1>
              <p className='font-cyber text-sm lg:text-base'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non recusandae, commodi repudiandae exercitationem, architecto assumenda nobis doloribus, deleniti obcaecati quaerat at quam! Rerum vitae quam culpa! Voluptates dolore sint. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non recusandae, commodi repudiandae exercitationem, architecto assumenda nobis doloribus, deleniti obcaecati quaerat at quam! Rerum vitae quam culpa! Voluptates dolore sint.
              </p>
            </div>
            <video className="w-full max-h-[400px] object-cover lg:w-[70%]" src={gamingBg} autoPlay loop muted />
        </div>
    </div>
  )
}

export default ProductHero
