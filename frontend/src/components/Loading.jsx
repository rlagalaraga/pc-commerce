import React from 'react'
import {PulseLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex justify-center items-center text-center fixed inset-0 z-40 bg-black/20'>
        <div className='flex py-2 w-[200px] items-center text-center justify-center font-cyber border-[2px] border-[#710000] bg-black/30 text-[#37ebf3] text-3xl'>
            <h1>Loading</h1>
            <PulseLoader
            color='#37ebf3'
            size={10}
            />
        </div>
    </div>
  )
}

export default Loading