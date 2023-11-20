import React, {useState, useEffect} from 'react'
import axios from 'axios';
import URL from '../Api-constants';

const getCsrfToken = () => {
  const csrfCookie = document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='));

  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

// Use the function to get the CSRF token
const csrfToken = getCsrfToken();

const EditProfile = ({user}) => {

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
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

  function updateUser(e){
    e.preventDefault();

    const userData = new FormData();
    userData.append('first_name', formData.first_name);
    userData.append('last_name', formData.last_name);
    userData.append('email', formData.email);

    if (formData.avatar) {
      userData.append('avatar', formData.avatar);
    }

    axios.post(
      URL.update_user + user.id + '/',userData, 
      {
        headers:{
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      }).then(function(res){
        console.log("Updated");
        window.location.href = '/profile/' + user.id
      }).catch(function(error){
        console.log("Failed to register")
      });

  }

  return (
    <>
      <div className='text-left text-sm sm:text-base w-full md:w-[90%] lg:w-[80%] m-auto pl-[10%] pr-[5%] pt-5 pb-10'>
          <form onSubmit={e => updateUser(e)}>
            <label className='pr-3 font-mont font-bold'>Email:</label>
            <input className='w-[70%] font-mont px-2 py-1 text-black' placeholder='Email' type="email" name="email" value={formData.email} onChange={handleChange} id="" required/>
            <br />
            <br />
            <label className='pr-3 font-mont font-bold'>Name:</label>
            <input className='w-[34%] font-mont mr-1 px-2 py-1 text-black' placeholder='Firstname' type="text" name="first_name" value={formData.first_name} onChange={handleChange} id="" required/>
            <input className='w-[34.5%] font-mont px-2 py-1 text-black' placeholder='Lastname' type="text" name="last_name" value={formData.last_name} onChange={handleChange} id="" required/>
            <br />
            <br />
            <label className='pr-3 font-mont font-bold text-sm'>Profile picture:</label>
            <input className='w-[55%] font-mont px-2 py-1 bg-white text-black' type="file" name="avatar" onChange={handleFileChange} id="" />
            <br />
            <br />
            <div className='border-t-[1px] pt-3 px-1 flex justify-end'>
              <button type='submit' className='font-bebas text-black bg-[#FDF500] px-5 py-1 text-xl hover:scale-110'>Submit</button>
            </div>
          </form>
        </div>
    </>
  )
}

export default EditProfile