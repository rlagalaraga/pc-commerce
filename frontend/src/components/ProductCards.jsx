import React from 'react'
import { useState } from 'react'
import {BsFillCartFill} from 'react-icons/bs'
import {AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai'

export const ProductCards = () => {
    const [dropdown, setDropdown] = useState(false)
    return (
        <div className='text-white'>
            <div>
                <div className='bg-black w-full max-h-[135px] p-6 flex text-lg'>
                    <div className='flex text-left w-full'>
                        <input className='text-black p-1 w-[200px]' type="text" />
                        <button className='font-bebas ml-2 bg-slate-500 text-black w-[100px] p-1 active:bg-[#FDF500]'>search</button>
                    </div>
                    <div className='font-bebas text-right w-full flex justify-end'>
                        <div className='block'>
                            <button className='text-black bg-slate-500 p-1 w-[100px] sm:w-[200px] flex justify-between' onClick={() => setDropdown((prev) => !prev)}>Category {!dropdown ? (<AiOutlineCaretDown size={20}/>) : (<AiOutlineCaretUp size={20}/>)}</button>
                            {dropdown && (
                                <div className='w-[100px] sm:w-[200px] bg-slate-500 absolute text-black text-center'>
                                    <ul>
                                        <li className='border-t-[1px] border-black py-1'><a className='hover:text-white' href="">Gaming PC</a></li>
                                        <li className='border-t-[1px] border-black py-1'><a className='hover:text-white' href="">Laptops</a></li>
                                        <li className='border-t-[1px] border-black py-1'><a className='hover:text-white' href="">GPU</a></li>
                                        <li className='border-t-[1px] border-black py-1'><a className='hover:text-white' href="">CPU</a></li>
                                        <li className='border-t-[1px] border-black py-1'><a className='hover:text-white' href="">PSU</a></li>
                                        <li className='border-t-[1px] border-black py-1'><a className='hover:text-white' href="">Storage</a></li>
                                        <li className='border-t-[1px] border-black py-1'><a className='hover:text-white' href="">Memory</a></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full ms-auto py-4 px-4 lg:pr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {/* card */}
                    <div className='font-mont font-bold h-[520px] bg-black text-white'>
                        {/* overlay */}
                        <div>
                            <img className='w-full h-[300px] object-cover' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
                            <div className='p-4 h-[100px] overflow-auto text-sm'>
                                <a href='detail/PRODUCT1'>Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080</a>
                            </div>
                            <div className='pl-4 pt-1 h-[45px] font-bebas text-3xl'>
                                <h2>420.69$</h2>
                            </div>
                            <div className='p-4 h-[75px]'>
                                <button className='flex p-2 text-[#FDF500] border-[1px] border-[#FDF500] w-auto '><BsFillCartFill className='pr-1 h-5 text-3xl'/>Add to cart</button>
                            </div>
                        </div>
                    </div>

                    {/* card */}
                    <div className='font-mont font-bold h-[520px] bg-black text-white'>
                        {/* overlay */}
                        <div>
                            <img className='w-full h-[300px] object-cover' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
                            <div className='p-4 h-[100px] overflow-auto text-sm'>
                                <h1>Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080</h1>
                            </div>
                            <div className='pl-4 pt-1 h-[45px] font-bebas text-3xl'>
                                <h2>420.69$</h2>
                            </div>
                            <div className='p-4 h-[75px]'>
                                <button className='flex p-2 text-[#FDF500] border-[1px] border-[#FDF500] w-auto '><BsFillCartFill className='pr-1 h-5 text-3xl'/>Add to cart</button>
                            </div>
                        </div>
                    </div>

                    {/* card */}
                    <div className='font-mont font-bold h-[520px] bg-black text-white'>
                        {/* overlay */}
                        <div>
                            <img className='w-full h-[300px] object-cover' src="https://cdn.originpc.com/img/gaming-desktops.jpg" />
                            <div className='p-4 h-[100px] overflow-auto text-sm'>
                                <h1>Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080 Sample Product Lorem Ipsum 9080</h1>
                            </div>
                            <div className='pl-4 pt-1 h-[45px] font-bebas text-3xl'>
                                <h2>420.69$</h2>
                            </div>
                            <div className='p-4 h-[75px]'>
                                <button className='flex p-2 text-[#FDF500] border-[1px] border-[#FDF500] w-auto '><BsFillCartFill className='pr-1 h-5 text-3xl'/>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCards