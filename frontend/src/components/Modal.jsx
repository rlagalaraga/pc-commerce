import React from 'react'
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({open, onClose, children}) => {
  return (
    <>
        {/* backdrop */}
        <div className={`text-white flex fixed inset-0 justify-center items-center text-center z-30 transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
          {/* modal */}
          <div className={`bg-[#272932] transition-all shadow p-6 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
            <button onClick={onClose} className='absolute top-2 right-2 p-1 hover:text-[#FDF500] hover:scale-110'>
              <AiOutlineClose/>
            </button>
            {children}
          </div>
        </div>  
    </>
  )
}

export default Modal