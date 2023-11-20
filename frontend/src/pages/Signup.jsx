import React, {useEffect, useState} from 'react'
import axios from "axios";
import URL from '../Api-constants';

const Signup = () => {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    axios.get(URL.get_user).then(function(res){
      let response = res.data.user
      setCurrentUser(true)
      console.log("Logged in as " + response.first_name + " " + response.last_name)
    })
    .catch(function(error){
      setCurrentUser(false)
      console.log("Not logged in")
    })
  },[])

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      avatar: file,
    });
  };

  function registerUser(e){
    e.preventDefault();

    const userData = new FormData();
    userData.append('first_name', formData.first_name);
    userData.append('last_name', formData.last_name);
    userData.append('email', formData.email);
    userData.append('password', formData.password);
    userData.append('password2', formData.password2);
    if (formData.avatar) {
      userData.append('avatar', formData.avatar);
    }

    axios.post(
      URL.register,userData, 
      {
        headers:{
          'Content-Type': 'multipart/form-data',
        },
      }).then(function(res){
        console.log("Registered");
        axios.post(
          URL.login_user,
          {
              email: formData.email,
              password: formData.password
          }
        ).then(function(res){
            console.log('Logged in')
            window.location.href = '/'
            setCurrentUser(true)
        });

      }).catch(function(error){
        console.log("Failed to register")
      });

  }

  return (
    <div className='flex items-center justify-center p-5 text-white'>
      <div className='bg-black w-full md:w-[80%] lg:w-[50%] items-center text-center'>
        <h1 className='font-bebas text-4xl text-black bg-[#FDF500] pt-2'>SignUp</h1>
        <br />
        <form onSubmit={e => registerUser(e)} action='/'>
          <div className='text-left text-sm sm:text-base w-full md:w-[90%] lg:w-[80%] m-auto pl-[10%] pr-[5%] pt-5 pb-10'>
            <label className='pr-3 font-mont font-bold'>Email:</label>
            <input className='w-[70%] font-mont px-2 py-1 text-black' placeholder='Email' type="email" name="email" value={formData.email} onChange={handleChange} id="" required/>
            <br />
            <br />
            <label className='pr-3 font-mont font-bold'>Name:</label>
            <input className='w-[34%] font-mont mr-1 px-2 py-1 text-black' placeholder='Firstname' type="text" name="first_name" value={formData.first_name} onChange={handleChange} id="" required/>
            <input className='w-[34.5%] font-mont px-2 py-1 text-black' placeholder='Lastname' type="text" name="last_name" value={formData.last_name} onChange={handleChange} id="" required/>
            <br />
            <br />
            <label className='pr-3 font-mont font-bold'>Password:</label>
            <input className='w-[64%] font-mont px-2 py-1 text-black' placeholder='Password' type="text" name="password" value={formData.password} onChange={handleChange} id="" required/>
            <br />
            <br />
            <label className='pr-3 font-mont font-bold text-xs sm:text-base'>Confirm password:</label>
            <input className='w-[50%] font-mont px-2 py-1 text-black' placeholder='Confirm Password' type="text" name="password2" value={formData.password2} onChange={handleChange} id="" required/>
            <br />
            <br />
            <label className='pr-3 font-mont font-bold'>Profile picture:</label>
            <input className='w-[55%] font-mont px-2 py-1 bg-white text-black' type="file" accept="image/*" name="avatar" onChange={handleFileChange} id="" />
            <br />
            <br />
            <div className='border-t-[1px] pt-3 px-1 flex justify-end'>
              <button type='submit' className='font-bebas text-black bg-[#FDF500] px-5 py-1 text-xl hover:scale-110'>Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup