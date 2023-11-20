import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import defaultAvatar from '../assets/images/defaultAvatar.png'
import { AiFillEdit } from 'react-icons/ai'
import Modal from '../components/Modal'
import EditProfile from '../forms/EditProfile'
import axios from 'axios'
import URL from '../Api-constants'
import Loading from '../components/Loading'

const baseURL = "http://127.0.0.1:8000/"

const Profile = () => {
    const [open, setOpen] = useState(false)
    const {userID} = useParams()
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get(URL.get_user + userID + '/').then(function(res){
            setUser(res.data)
            console.log('User found!')
        })
        .catch(function(error){
            console.log("User not found!")
        })
      },[])

    useEffect(() => {
        axios.get(URL.get_user).then(function(res){
            setCurrentUser(res.data.user)
        })
    },[])

    
    if(user){

        return (
            <>
                <div className="p-4 sm:py-16 sm:px-32">
                    <div className="m-auto p-6 sm:p-8 bg-black shadow mt-24 text-white">
                        
                        <div>
                            <div className="relative">
                                <div className="w-40 h-40 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                    {user.avatar ? 
                                        (<img className="object-cover mx-auto rounded-full w-40 h-40 bg-white" src={baseURL + user.avatar}/>):
                                        (<img className="object-cover mx-auto rounded-full w-40 h-40 bg-white" src={defaultAvatar}/>)
                                    }
                                </div>
                            </div>           
                        </div>

                        <div className='grid grid-cols-2'>
                            <div className="space-x-8 flex mt-32 lg:mt-0 justify-center text-center font-bebas">
                                <div>
                                    <p className="font-bold text-2xl">10</p>
                                    <p className="text-lg">Transactions</p>
                                </div>
                            </div>
                            <div className="space-x-8 flex mt-32 lg:mt-0 justify-center text-center font-bebas">
                                <div>
                                    <p className="font-bold text-2xl">10</p>
                                    <p className="text-lg">Items in cart</p>
                                </div>
                            </div>           
                        </div>

                        <div className="mt-20 text-center border-[#710000] border-b-[2px] pb-12">
                            <h1 className="text-4xl font-medium font-bebas">{user.first_name + " " + user.last_name}</h1>
                            <p className="my-3 font-mont">{user.email}</p>
                            {currentUser && currentUser.id == user.id && (
                                <button onClick={() => setOpen(true)} className="text-black text-center p-2 uppercase text-2xl rounded-[50%] bg-[#FDF500] font-medium shadow hover:shadow-lg transition transform hover:-translate-y-0.5">
                                    <AiFillEdit/>
                                </button>
                            )}
                            <br />
                            <br />
                        </div>

                    </div>
                </div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    {currentUser &&(
                        <EditProfile user={currentUser}/>
                    )}
                </Modal>  
            </>
        )
    }
    else{
        return(
        <>
            <Loading/>
        </>

        )
        
    }
}

export default Profile