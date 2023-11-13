import React from 'react'
import { useState } from 'react'
import {BsFillCartFill} from 'react-icons/bs'
import {AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai'
import {useParams} from 'react-router-dom'

export const ProductCards = () => {
    const { productType } = useParams()
    const [dropdown, setDropdown] = useState(false)
    return (
        <div className='text-white'>
            <div>
                <div className='bg-black w-full max-h-[135px] p-6 flex text-lg'>
                    <div className='flex text-left w-full pr-[4px] text-sm sm:text-lg'>
                        <input className='text-black p-1 w-[110px] sm:w-[200px]' type="text" />
                        <button className='font-bebas ml-2 bg-zinc-500 text-black w-[50px] sm:w-[100px] p-1 hover:scale-105 active:bg-[#FDF500]'>search</button>
                    </div>
                    <div className='font-bebas text-right w-full flex justify-end text-sm sm:text-lg'>
                        <div className='block'>
                            <button className='text-black bg-zinc-500 p-1 w-[70px] sm:w-[200px] flex justify-between' onClick={() => setDropdown((prev) => !prev)}>Category {!dropdown ? (<AiOutlineCaretDown size={20}/>) : (<AiOutlineCaretUp size={20}/>)}</button>
                            {dropdown && (
                                <div className='w-[70px] sm:w-[200px] bg-zinc-500 absolute text-black text-center'>
                                    <ul>
                                        <a className='hover:text-white' href="/products/"><li className='border-t-[1px] border-black'>All</li></a>
                                        <a className='hover:text-white' href="/products/Gaming PC"><li className='border-t-[1px] border-black'>Gaming PC</li></a>
                                        <a className='hover:text-white' href="/products/Laptops"><li className='border-t-[1px] border-black'>Laptops</li></a>
                                        <a className='hover:text-white' href="/products/GPU"><li className='border-t-[1px] border-black'>GPU</li></a>
                                        <a className='hover:text-white' href="/products/CPU"><li className='border-t-[1px] border-black'>CPU</li></a>
                                        <a className='hover:text-white' href="/products/PSU"><li className='border-t-[1px] border-black'>PSU</li></a>
                                        <a className='hover:text-white' href="/products/Storage"><li className='border-t-[1px] border-black'>Storage</li></a>
                                        <a className='hover:text-white' href="/products/Memory"><li className='border-t-[1px] border-black'>Memory</li></a>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full ms-auto py-4 px-4 lg:pr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
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
                            <div className='p-4 h-[75px] text-sm sm:text-base'>
                                <button className='flex p-2 text-[#FDF500] border-[1px] border-[#FDF500] w-auto active:text-black active:bg-[#FDF500]'><BsFillCartFill className='pr-1 h-5 text-3xl'/>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCards