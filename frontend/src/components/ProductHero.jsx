import React, {useEffect, useState} from 'react'
import gamingBg from '../assets/videos/fan.mp4'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {URL} from "../Api-constants";

export const ProductHero = () => {
  const { productType } = useParams()
  const [category, setCategory] = useState(null)

  useEffect(() => {
    if(productType){
      axios.get(URL.get_category + productType).then(function(res){
        setCategory(res.data)
      })
      .catch(function(error){
        console.log(error)
      })
    }
  }, [])

  useEffect(() => {
    console.log(category)
  },[category])

  return (
    <div className='text-white'>
        <div className='max-h[400px] bg-black bg-opacity-50 w-full items-center lg:flex'>
            <div className='w-full px-5 py-4 lg:w-[30%]'>
              <h1 className='font-bebas font-bold text-3xl'>{!productType ? ("Products"):(productType)}</h1>
              {productType && category ?(
                <>
                  <p className='font-cyber text-sm lg:text-base'>
                    {category.description}
                  </p>
                </>
              ):(
                <>
                  <p className='font-cyber text-sm lg:text-base'>
                    At our store, we're committed to providing high-quality components, accessories, and expert guidance, empowering you to build, customize, and optimize your PC setup for unmatched performance and reliability.
                  </p>
                </>
              )}
            </div>
            <video className="w-full max-h-[400px] object-cover lg:w-[70%]" src={gamingBg} autoPlay loop muted />
        </div>
    </div>
  )
}

export default ProductHero
