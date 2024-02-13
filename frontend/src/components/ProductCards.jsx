import React, { useState, useEffect } from 'react'
import {BsFillCartFill} from 'react-icons/bs'
import {AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {URL, baseURL} from "../Api-constants";
import csrfToken from '../CSRFToken'

export const ProductCards = () => {
    const { productType } = useParams()
    const [dropdown, setDropdown] = useState(false)
    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState(null)
    const [currentUser, setCurrentUser] = useState();

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

    useEffect(() => {
        axios.get(URL.get_categories).then(function(res){
            setCategories(res.data)
        })
        .catch(function(error){
            console.log("No categories found!")
        })

        axios.get(URL.get_user).then(function(res){
            let user = res.data.user
            setCurrentUser(user)
            console.log("Logged in as " + user.email)
        })
            .catch(function(error){
            setCurrentUser(null)
            console.log("Not logged in")
        })
    },[])

    useEffect(() => {
        let url = URL.get_products;
        if(productType){
            url = url + productType + "/"
        }
        
        axios.get(url).then(function(res){
            setProducts(res.data)
        })

    },[])

    useEffect(() => {
        if(products){
            console.log(products)
        }
    },[products])

    return (
        <div className='text-white'>
            <div>
                <div className='bg-black w-full max-h-[135px] p-6 flex text-lg'>
                    <div className='flex text-left w-full pr-[4px] text-sm sm:text-lg'>
                        <input className='text-black p-1 w-[110px] sm:w-[200px]' type="text" />
                        <button className='font-bebas ml-2 border-[2px] border-[#710000] text-white w-[50px] sm:w-[100px] p-1 hover:bg-[#37ebf3] hover:text-black active:text-black active:bg-[#FDF500]'>search</button>
                    </div>
                    <div className='font-bebas text-right w-full flex justify-end text-sm sm:text-lg'>
                        <div className='block'>
                            <button className='text-white hover:text-[#37ebf3] border-[2px] border-[#710000] bg-transparent p-1 w-[70px] sm:w-[200px] flex justify-between' onClick={() => setDropdown((prev) => !prev)}>Category {!dropdown ? (<AiOutlineCaretDown size={20}/>) : (<AiOutlineCaretUp size={20}/>)}</button>
                            {dropdown && (
                                <div className='w-[70px] sm:w-[200px] bg-black/25 absolute text-center'>
                                    <ul className='text-white'>
                                        <a className='hover:text-[#37ebf3]' href="/products/"><li className='border-[1px] border-[#710000] hover:bg-black'>All</li></a>
                                        {categories && (
                                            <>
                                                {categories.map((category) => (
                                                    <a key={category.id} className='hover:text-[#37ebf3]' href={"/products/" + category.name + "/"}><li className='border-[1px] border-[#710000] hover:bg-black'>{category.name}</li></a>
                                                ))}
                                            </>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full ms-auto py-4 px-4 lg:pr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                    {products &&(
                        <>
                            {products.map((product) => (
                                <div key={product.id} className='font-cyber font-bold h-[570px] bg-black text-white border-zinc-600 border-[1px]'>
                                    <div>
                                        <img className='w-full h-[350px] object-scale-down bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800' src={baseURL + product.images[0].image} />
                                        <div className='p-4 h-[100px] overflow-auto text-lg sm:text-xl'>
                                            <a href={'/product/' + product.id + '/'}>{product.name}</a>
                                        </div>
                                        <div className='pl-4 pt-1 h-[45px] text-green-600 text-xl sm:text-2xl'>
                                            <h2>{product.price}$</h2>
                                        </div>
                                        <div className='p-4 h-[75px] text-base sm:text-lg'>
                                            {currentUser && (
                                                <button onClick={() => addToCart(product.id)} className='flex p-2 text-[#FDF500] border-[1px] border-[#FDF500] w-auto active:text-black active:bg-[#FDF500]'><BsFillCartFill className='pr-1 h-5 text-3xl'/>Add to cart</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCards