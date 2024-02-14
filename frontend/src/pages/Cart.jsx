import React, {useState, useEffect} from 'react'
import Modal from '../components/Modal'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {URL, baseURL} from "../Api-constants";
import csrfToken from '../CSRFToken';

const Cart = () => {
  const {userID} = useParams()
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState(null)
  const [total, setTotal] = useState(0)
  const [subtotal, setSubtotal] = useState(null)

  useEffect(() => {
    getItems()
  },[])

  useEffect(() => {
    if(cart){
      const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalPrice);
    }
  },[cart])

  function getItems(){
    axios.get(URL.get_cart_items).then(function(res){
      setCart(res.data)
      console.log(res.data)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  function removeItem(id){
    if(id){
      axios.delete(URL.cart_item + id + '/',
      {
        headers:{
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      }
      ).then(function(res){
        getItems()
      })
    }
  }

  function changeQuantity(id, price, qty){
    if(qty > 0){
      axios.put(URL.cart_item + id + '/',
      {
        quantity: qty
      },
      {
        headers:{
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      }).then(function(res){
        console.log("quantity changed")
        getItems()
      })
    }
    else{
      alert("Quantity cannot be below 1!")
    }
  }

  function checkout(){
    if(cart){
      for (const itm of cart){
        setOpen(false)
        axios.post(URL.checkout + itm.id + '/',null,
        {
            headers:{
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': csrfToken,
            },
            withCredentials: true,
        }
        ).then(function(res){
          removeItem(itm.id)
        })
      }
    }
  }

  return (
    <div className='py-5'>
      <h1 className='font-bebas w-[90%] bg-black text-5xl text-center py-5 text-[#37ebf3] border-x-[1px] border-t-[1px] border-[#710000] m-auto'>CART</h1>
      <div className='bg-zinc-800 w-[90%] h-[450px] sm:h-[500px] md:h-[600px] border-x-[1px] border-[#710000] text-white overflow-auto m-auto'>
        {cart &&(
          <>
            {cart.map((item) => (
              <div key={item.id} className='bg-black/50 flex items-center h-[100px] border-t-[1px] border-[#710000]'>
                <div className='flex items-center w-[70%] md:w-[80%] h-full overflow-auto'>
                  <div className='flex justify-center items-center w-[80px] md:w-[150px] pr-2 md:pr-4 overflow-auto h-full border-r-[1px] border-[#710000]'>
                    <div className='w-full p-2'>
                      <p className='font-cyber text-xs md:text-base text-green-500'>$ {item.price}</p>
                      <label className='text-xs font-cyber pr-1'>Qty:</label>
                      <input type="number" onChange={(e) => changeQuantity(item.id, item.price, e.target.value)} defaultValue={item.quantity} min={1} className='w-[30px] bg-zinc-900 text-center text-xs md:py-1 font-cyber' />
                      <br />
                      <button onClick={() => removeItem(item.id)} className='font-cyber text-sm text-[#FDF500]'>Remove</button>
                    </div>
                  </div>
                  <a href='' className='text-xs sm:text-sm md:text-base lg:text-lg font-cyber m-auto text-[#37ebf3]'>{item.prod_name}</a>
                </div>
                <div className='flex justify-center items-center w-[30%] md:w-[20%] border-t-[1px] border-l-[1px] border-[#710000]'>
                  <img className='object-scale-down w-full h-[100px] p-2 bg-black/5' src={baseURL + item.images[0].image} />
                </div>
              </div>
            ))}
          </>
        )}

      </div>
      <div className='bg-black w-[90%] text-white m-auto p-4 border-x-[1px] border-y-[1px] border-[#710000]'>
        <div className='flex justify-center pb-2 font-bebas text-2xl'>
          <p className='text-green-500'><small className='font-cyber text-[#37ebf3]'>Total:</small> $ {total}</p>
        </div>
        <div className='flex justify-center'>
          <button onClick={() => setOpen(true)} className='bg-[#FDF500] text-black w-[50%] py-2 font-bebas font-bold text-2xl active:bg-[#37ebf3]'>Checkout</button>
        </div>
      </div> 
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='px-4 pt-4 w-[300px]'>
              <h1 className='pb-5 font-bebas text-2xl'>Confirm purchase?</h1>
              <br />
              <br />
              <div className='flex justify-between'>
                  <button className='font-bebas text-lg text-white bg-[#710000] py-1 px-4 w-[100px] hover:scale-105' onClick={() => setOpen(false)}>Cancel</button>
                  <button className='font-bebas text-lg text-black bg-[#FDF500] py-1 px-4 w-[100px] hover:scale-105' onClick={() => checkout()}>Confirm</button>
              </div>
          </div>
      </Modal> 
    </div>
  )
}

export default Cart