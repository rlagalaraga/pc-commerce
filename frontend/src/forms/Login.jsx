import React, {useState} from 'react'
import Modal from '../components/Modal'

const Login = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='items-center text-center py-2 px-10'>
            <h1 className='font-bebas text-3xl'>LOGIN</h1>
            <div className='text-black font-mont'>
                <input className='py-2 px-3 my-3' type="text" placeholder='Email' />
                <br />
                <input className='py-2 px-3 ' type="text" placeholder='Password' />
            </div>
            <br />
            <button className='font-bebas hover:bg-[#FDF500] hover:text-black active:scale-90 text-xl bg-black w-[60%] py-1'>LOGIN</button>
            <br />
            <a href="/signup"><button className='font-bebas hover:bg-[#FDF500] hover:text-black active:scale-90 text-xl bg-black w-[60%] py-1 mt-2'>Sign up</button></a>
        </div>
  )
}

export default Login