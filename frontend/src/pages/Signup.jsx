import React from 'react'

const Signup = () => {
  return (
    <div className='flex items-center justify-center p-5 text-white'>
        <div className='bg-black w-full md:w-[80%] lg:w-[50%] items-center text-center'>
            <h1 className='font-bebas text-4xl text-black bg-[#FDF500] pt-2'>SignUp</h1>
            <br />
            <div className='text-left text-sm sm:text-base w-full md:w-[90%] lg:w-[80%] m-auto pl-[10%] pr-[5%] pt-5 pb-10'>
                <label className='pr-3 font-mont font-bold'>Email:</label>
                <input className='w-[70%] font-mont px-2 py-1 text-black' placeholder='SampleEmail@email.com' type="text" name="" id="" required/>
                <br />
                <br />
                <label className='pr-3 font-mont font-bold'>Name:</label>
                <input className='w-[34%] font-mont mr-1 px-2 py-1 text-black' placeholder='Firstname' type="text" name="" id="" required/>
                <input className='w-[34.5%] font-mont px-2 py-1 text-black' placeholder='Lastname' type="text" name="" id="" required/>
                <br />
                <br />
                <label className='pr-3 font-mont font-bold'>Password:</label>
                <input className='w-[64%] font-mont px-2 py-1 text-black' placeholder='Password' type="text" name="" id="" required/>
                <br />
                <br />
                <label className='pr-3 font-mont font-bold text-xs sm:text-base'>Confirm password:</label>
                <input className='w-[50%] font-mont px-2 py-1 text-black' placeholder='Confirm Password' type="text" name="" id="" required/>
                <br />
                <br />
                <label className='pr-3 font-mont font-bold'>Profile picture:</label>
                <input className='w-[55%] font-mont px-2 py-1 bg-white text-black' type="file" name="" id="" />
                <br />
                <br />
                <div className='border-t-[1px] pt-3 px-1 flex justify-end'>
                  <button className='font-bebas text-black bg-[#FDF500] px-5 py-1 text-xl hover:scale-110'>Register</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup