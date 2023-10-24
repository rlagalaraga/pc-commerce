import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import defaultAvatar from '../assets/images/defaultAvatar.png'
import { AiFillEdit } from 'react-icons/ai'
import Modal from '../components/Modal'
import EditProfile from '../forms/EditProfile'

const Profile = () => {
    const [open, setOpen] = useState(false)
    const {userID} = useParams()
    return (
        <>
            <div className="p-4 sm:py-16 sm:px-32">
                <div className="m-auto p-6 sm:p-8 bg-black shadow mt-24 text-white">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="grid grid-cols-2 text-center order-last lg:order-first mt-20 lg:mt-0 font-bebas">
                            <div>
                                <p className="font-bold text-2xl">22</p>
                                <p className="text-lg">Transactions</p>
                            </div>
                            <div>
                                <p className="font-bold text-2xl">10</p>
                                <p className="text-lg">Products</p>
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
                            <button className="text-black py-2 px-4 bg-[#37EBF3] font-bebas text-xl hover:scale-110">
                                Transactions
                            </button>
                            <button className="text-black py-2 px-4 bg-[#FDF500] font-bebas text-xl hover:scale-110">
                                Products
                            </button>
                        </div>
                    </div>

                    <div className="mt-20 text-center border-[#710000] border-b-[2px] pb-12">
                        <h1 className="text-4xl font-medium font-bebas">{userID}</h1>
                        <p className="my-3 font-mont">liame@email.com</p>
                        <button onClick={() => setOpen(true)} className="text-black text-center p-2 uppercase text-2xl rounded-[50%] bg-[#FDF500] font-medium shadow hover:shadow-lg transition transform hover:-translate-y-0.5">
                            <AiFillEdit/>
                        </button>
                        <br />
                        <br />
                    </div>

                </div>
            </div>

            <Modal open={open} onClose={() => setOpen(false)}>
                <EditProfile/>
            </Modal>  
        </>
    )
}

export default Profile