import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsFillCartFill } from 'react-icons/bs'
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri'
import Loading from './Loading'
import {URL, baseURL} from "../Api-constants";
import axios from 'axios'
import csrfToken from '../CSRFToken';

export const Detail = () => {
  const {productID} = useParams()
  const [slides, setSlides] = useState(null)
  const [product, setProduct] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reviews, setReviews] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

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

  useEffect(() => {
    axios.get(URL.get_product + productID + '/').then(function(res){
      setProduct(res.data)
      getReviews()
    })

    axios.get(URL.get_user).then(function(res){
      let user = res.data.user
      setCurrentUser(user)
      console.log("Logged in as " + user.email)
    })
      .catch(function(error){
      console.log("Not logged in")
    })
  },[])

  useEffect(() => {
    if(product){
      setSlides(product.images)
    }
  }, [product])

  function getReviews(){
    axios.get(URL.get_reviews + productID + '/').then(function(res){
      setReviews(res.data)
    })
  }

  function addToCart(id){
    axios.post(URL.add_to_cart + id + '/',null,
    {
        headers:{
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
    }
    ).then(function(res){
        alert("Item added to cart.")
    })
  }
  
  if(product && slides){
    return (
      <div>
        <div className='bg-black text-white w-full sm:w-[90%] m-auto'>
          <div className='bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 flex text-white border-b-[2px] border-[#FDF500]'>
            <button onClick={prevSlide} className='hover:bg-[#FDF500] hover:text-black bg-black text-white m-auto rounded-[50px] bg-opacity-30'>
              <RiArrowLeftDoubleLine className='text-5xl sm:text-7xl hover:cursor-pointer'></RiArrowLeftDoubleLine>
            </button>
            <img className=' object-scale-down bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 w-[70%] h-[250px] sm:h-[400px] md:h-[550px] lg:h-[600px] lg:w-[850px] duration-500' src={baseURL + slides[currentIndex].image} />
            {/* <div style={{ backgroundImage: `url(${baseURL + slides[currentIndex].image})`}} className=' bg-contain bg-center m-auto w-full h-[250px] sm:h-[400px] md:h-[550px] lg:h-[600px] lg:w-[850px] duration-500'></div> */}
            <button onClick={nextSlide} className='hover:bg-[#FDF500] hover:text-black bg-black text-white m-auto rounded-[50px] bg-opacity-30'>
              <RiArrowRightDoubleLine className='text-5xl sm:text-7xl hover:cursor-pointer'></RiArrowRightDoubleLine>
            </button>
          </div>
          <div className='p-4'>
            <p className='text-green-500 italic'>IN STOCK</p>
            <h1 className='font-bebas font-bold text-3xl py-4'>{product.name}</h1>
            <p className='font-cyber text-lg'>{product.description}</p>
            <div className='flex pt-10 pb-4 justify-between sm:justify-normal'>
              <div className='text-sm sm:text-base font-mont font-bold mr-4'>
                {currentUser && (
                  <button onClick={() => addToCart(product.id)} className='flex font-cyber text-lg p-2 text-[#FDF500] border-[1px] border-[#FDF500] w-auto active:text-black active:bg-[#FDF500]'><BsFillCartFill className='pr-1 h-5 text-3xl'/>Add to cart</button>
                )}
              </div>
              <p className='font-cyber font-bold text-3xl sm:text-4xl p-1'>{product.price}$</p>
            </div>
          </div>
        </div>

        <div>
          <div className='w-full sm:w-[90%] m-auto bg-[#272932] text-white'>
            {reviews && reviews.length > 0 &&(
              <>
                <div className='text-black bg-[#FDF500] text-center text-2xl font-bebas font-bold'>
                  Reviews
                </div>
                {reviews.map((review) => (  
                  <div key={review.id} className='border-b-[1px] p-4'>
                    <div className='flex justify-between'>
                      <h1 className='font-bebas text-lg'>{review.author_name}</h1>
                      <p className='text-xs font-mont'>{review.date_added}</p>
                    </div>
                    <div className='flex text-[#FDF500]'>
                      {Array.from(Array(5), (e, i) => {
                        if(i < review.rating){
                          return <TiStarFullOutline key={i}></TiStarFullOutline>
                        }
                        else{
                          return <TiStarOutline key={i}></TiStarOutline>
                        }
                      })}
                    </div>
                    <p className='my-3 font-cyber'>{review.comment}</p>
                  </div>                   
                ))}
              </>
            )}
          </div>
        </div>
                      
      </div>
    )
  }
  else{
    return(
      <>
        <Loading></Loading>
      </>
    )
  }
}

export default Detail