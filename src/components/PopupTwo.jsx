import React, { useState } from 'react'
import './Popup.css'
import 'react-phone-number-input/style.css'
import { useNavigate } from 'react-router-dom';

function PopupTwo(props) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/search', { state: 'test' }); // Redirect to the search page
  }


  return (props.trigger) ? (
    <div className='popup z-[10]'>
      <form onSubmit={handleSubmit}>
            <div class="w-[386px] h-[844px] relative bg-slate-950">
              <div class="w-[361px] h-[350px] left-[14px] top-[97px] absolute bg-white rounded-[3px]"></div>
              <div class="w-[361px] h-[59px] left-[14px] top-[97px] absolute">
                <div class="w-[361px] h-[59px] left-0 top-0 absolute bg-zinc-100 rounded-[3px]"></div>
                <div class="w-40 h-[22px] left-[188px] top-[7px] absolute text-right text-stone-950 text-xs">Delivery Demo</div>
                <div class="w-40 h-[22px] left-[187px] top-[29px] absolute text-right text-blue-500 text-[12px]">Transbyte</div>
              </div>
              <div class="w-[333px] h-[63px] left-[28px] top-[166px] absolute">
                <div class="w-[332px] h-4 absolute text-center text-black text-[12px]">
                  <h2 className="font-bold text-[14px]">
                  Order Complete
                  </h2>
                  <p className="font-poppins text-[14px] leading-[23.4px]">
                  An SMS has been sent to the below number. Track your demo order using this number:
                  </p>
                </div>

              </div>
              <div class="w-[332px] h-[60px] left-[28px] top-[267px] absolute">
                <div class="h-4 left-[3px] top-0 absolute text-center text-black text-[12px]">Cell number</div>
                <div class="w-[332px] h-[22px] top-[30px] absolute text-neutral-500">
                <input
                    value={props.customerData ? props.customerData.customer_cell : 'Hahah'} disabled
                    type="text"
                    id="name"
                    name="name"
                    placeholder="+27"
                    className="w-full rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="w-[177px] h-[38px] left-[104px] top-[373px] absolute">
                <div class="w-[177px] h-[30px] left-0 top-[4px] absolute text-center text-white text-xs font-bold">
                  <button className="bg-blue-700 hover:bg-blue-500 text-white  py-4 px-5 rounded" styles={`font-weight:300`} >
                    Done
                  </button >
                </div>
              </div>
              <img class="w-9 h-8 left-[27px] top-[112px] absolute" src="/transbytecourier.svg" />
              <div class="w-[15px] h-[15px] exit-button hover:bg-red-500 rounded-full left-[14px] top-[77px] absolute" role='button' onClick={() => props.setTrigger(false)}>
              </div>
            </div>
            { props.children }
      </form>
    </div>
  ) : "";
}

export default PopupTwo