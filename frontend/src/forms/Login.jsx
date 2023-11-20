import React, {useState} from 'react'
import Modal from '../components/Modal'
import axios from 'axios'
import URL from '../Api-constants';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false)

    function submitLogin(e){
        e.preventDefault();
        axios.post(
            URL.login_user,
            {
                email: email,
                password: password
            }
        ).then(function(res){
            window.location.reload(false);
        });

    }
    return (
        <div className='items-center text-center py-2 px-10'>
            <h1 className='font-bebas text-3xl'>LOGIN</h1>
            <form onSubmit={e => submitLogin(e)}>
                <div className='text-black font-mont'>
                    <input className='py-2 px-3 my-3' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                    <br />
                    <input className='py-2 px-3 ' type="text" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <br />
                <button type='submit' className='font-bebas hover:bg-[#FDF500] hover:text-black active:scale-90 text-xl bg-black w-[60%] py-1'>LOGIN</button>
            </form>
            <br />
            <a href="/signup"><button className='font-bebas hover:bg-[#FDF500] hover:text-black active:scale-90 text-xl bg-black w-[60%] py-1 mt-2'>Sign up</button></a>
            <Modal open={open} onClose={() => setOpen(false)}>
                <h1 className='font-bebas text-5xl'>Login Successful</h1>
            </Modal>
        </div>
  )
}

export default Login