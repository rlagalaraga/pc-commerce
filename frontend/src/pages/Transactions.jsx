import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {URL, baseURL} from "../Api-constants";
import axios from 'axios'

const Transactions = () => {
  const {userID} = useParams()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(null)

  useEffect(() => {
    getItems()
  },[])

  function getItems(){
    axios.get(URL.list_transactions).then(function(res){
      setItems(res.data)
      console.log(res.data)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='w-full max-w-[1000px] bg-zinc-800 text-white overflow-auto'>
        <h1 className='font-bebas bg-black text-5xl text-center py-5 text-[#37ebf3] m-auto'>Transactions</h1>
        {items && (
        <>
          {items.map((item) => (
            <div key={item.id} className='bg-[#272932] flex items-center h-[100px] border-t-[1px] border-zinc-600'>
              <div className='flex flex-col px-2 py-4 w-[20%] md:w-[20%] h-full bg-black'>
                <p className='font-cyber text-xs'>{item.checkout_date}</p>
                <p className='text-xs text-[#FDF500] md:text-sm font-bebas pr-1'>Qty: 69</p>
                <p className='font-cyber text-green-500 text-sm md:text-xl'>420.69$</p>
              </div>
              <div className='h-full w-full flex items-center text-center'>
                  <a href='' className='text-xs md:text-base font-cyber w-full'>{item.prod_name}</a>
              </div>
              <div className="w-[150px] border-t-[1px] h-full border-zinc-600">
                <img className='object-scale-down w-full h-full p-2  bg-black' src={baseURL + item.images[0].image} />
              </div>
            </div>
          ))}
        </>
        )}
      </div>
    </div>
  )
}

export default Transactions