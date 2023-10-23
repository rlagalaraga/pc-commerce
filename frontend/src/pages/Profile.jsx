import React from 'react'
import { useParams } from 'react-router-dom'
import defaultAvatar from '../assets/images/defaultAvatar.png'
import { AiFillEdit } from 'react-icons/ai'

const Profile = () => {
    const {userID} = useParams()
    return (
        <>
            <div className="p-4 sm:p-16">
                <div className="m-auto p-6 sm:p-8 bg-black shadow mt-24 text-white">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="grid grid-cols-2 text-center order-last lg:order-first mt-20 lg:mt-0">
                            <div>
                                <p className="font-bold text-xl">22</p>
                                <p className="">Products</p>
                            </div>
                            <div>
                                <p className="font-bold text-xl">10</p>
                                <p className="">Transactions</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="w-40 h-40 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg> */}
                                <img src={defaultAvatar}/>
                            </div>
                        </div>

                        <div className="space-x-8 flex mt-32 lg:mt-0 justify-center">
                            <button className="text-white py-2 px-4 uppercase bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Transactions
                            </button>
                            <button className="text-white py-2 px-4 uppercase bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Products
                            </button>
                        </div>
                    </div>

                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium">{userID}</h1>
                        <p className="font-light my-3">liame@email.com</p>
                        <button className="text-black text-center p-2 uppercase text-2xl rounded-[50%] bg-[#FDF500] font-medium shadow hover:shadow-lg transition transform hover:-translate-y-0.5">
                            <AiFillEdit/>
                        </button>
                        <br />
                        <br />
                    </div>

                    <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non recusandae, commodi repudiandae exercitationem, architecto assumenda nobis doloribus, 
                            deleniti obcaecati quaerat at quam! Rerum vitae quam culpa! Voluptates dolore sint. Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Non recusandae, commodi repudiandae exercitationem, architecto assumenda nobis doloribus, deleniti obcaecati quaerat at quam! Rerum vitae quam culpa! 
                            Voluptates dolore sint.
                        </p>
                        <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
                            Show more
                        </button>
                    </div>

                </div>
            </div>  
        </>
    )
}

export default Profile