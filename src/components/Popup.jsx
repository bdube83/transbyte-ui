import React, { useState } from 'react'
import './Popup.css'
import { PlacesTo } from ".";
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import Input from 'react-phone-number-input/input'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Popup(props) {
  const [cellNumber, setCellNumber] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();
  const [emailCheck, setEmailCheck] = useState();
  const [numberCheck, setNumberCheck] = useState();
  const [locationCheck, setLocationCheck] = useState();
  const [formData, setFormData] = useState({
    customer_cell: '',
    business_email: '',
    customer_notification: 'SMS and USSD',
    business_name: "My Local Delivery",
    driver_cell: "+27787676677",
    pickup_location: {
        street_or_building_name: "9 Malborough Way",
        area: "Parklands",
        town: "Blouberg"
    },
    drop_off_location: {
      street_or_building_name: "Augusta Rd",
      area: "Sunningdale",
      town: "Cape Town"
    },
    // Add more form fields as needed
  });
  const navigate = useNavigate();


  const handlePlaceChangeInput = (selected) => {  
    setLocationCheck(true);  
    setFormData({
        ...formData,
        to_longitude: selected.lng,
        to_latitude: selected.lat,
        to: selected.address,
    });
    setLocation(selected);
  };

  function isValidLocation(location) {
    if (location && location.lng && location.lat) {
      return true;
    }
    return false;
  }

  const handleOnChange = async (cellNumber) => {
    setNumberCheck(true);
    if (cellNumber) {
      setCellNumber(cellNumber);
      setFormData({
        ...formData,
        customer_cell: cellNumber,
      });
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmailCheck(true);
    setEmail(email);
    setFormData({
      ...formData,
      business_email: email,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      ...formData
    });
    console.log(formData);
    setNumberCheck(true);
    setEmailCheck(true);
    setLocationCheck(true);
    if (formData.business_email && formData.customer_cell && formData.to && isValidPhoneNumber(cellNumber) && isValidLocation(location) && isValidEmail(email)) {
      // Make the POST request using Axios
      axios.post('https://9xpzluvgd0.execute-api.eu-north-1.amazonaws.com/prod/send', formData)
      .then(response => {
        // Handle the response as needed
        console.log('POST successful:', response.data);
        props.setTrigger(false);
        props.setTriggerTwo(true);
        props.setCustomerData(formData);
        //navigate('/search', { state: response.data }); // Redirect to the search page
      })
      .catch(error => {
        // Handle errors
        console.error('Error posting data:', error);
        //navigate('/search', { state: 'Error searching data' }); // Redirect to the search page
      });
    }
  }


  return (props.trigger) ? (
    <div className='popup z-[10]'>
      <form onSubmit={handleSubmit}>
            <div class="w-[386px] h-[844px] relative bg-slate-950">
              <div class="w-[361px] h-[550px] left-[14px] top-[97px] absolute bg-white rounded-[3px] overflow-y-auto"></div>
              <div class="w-[361px] h-[59px] left-[14px] top-[97px] absolute">
                <div class="w-[361px] h-[59px] left-0 top-0 absolute bg-zinc-100 rounded-[3px]"></div>
                <div class="w-40 h-[22px] left-[188px] top-[7px] absolute text-right text-stone-950 text-xs">Delivery Checkout Demo</div>
                <div class="w-40 h-[22px] left-[187px] top-[29px] absolute text-right text-blue-500 text-[12px]">Transbyte</div>
              </div>
              <div class="w-[333px] h-[63px] left-[28px] top-[166px] absolute">
                <div class="w-[42px] h-4 absolute text-center text-black text-[12px]">Email</div>
                <div class="w-[332px] h-[38px] top-[32px] absolute text-neutral-500 text-xs">
                  <input
                    id="email"
                    type='email'
                    name='Email'
                    placeholder="test@mail.com"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  <div class="w-[279px] h-[30px] left-[118px] top-[50px] text-red-600 absolute text-opacity-60 text-xs">
                    { email ? (isValidEmail(email) ? undefined : 'Invalid email') : (emailCheck ? 'Email required' : undefined) }
                  </div>
                </div>
              </div>
              <div class="w-[332px] h-[60px] left-[28px] top-[267px] absolute">
                <div class="h-4 left-[3px] top-0 absolute text-center text-black text-[12px]">Cell number</div>
                <div class="w-[57px] h-[22px] top-[30px] absolute text-neutral-500">
                <input
                    value="+27" disabled
                    type="text"
                    id="name"
                    name="name"
                    placeholder="+27"
                    className="w-full rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="w-[279px] h-[30px] left-[54px] top-[30px] absolute text-black text-opacity-60 text-xs">
                  <Input
                    placeholder="076 123 1234"
                    value={cellNumber}
                    country='ZA'
                    onChange={handleOnChange}
                    error={cellNumber ? (isValidPhoneNumber(cellNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
                    className="w-full rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                   <div class="w-[279px] h-[30px] left-[38px] top-[50px] text-red-600 absolute text-opacity-60 text-xs">
                    { cellNumber ? (isValidPhoneNumber(cellNumber) ? undefined : 'Invalid phone number') : (numberCheck ? 'Phone number required' : undefined) }
                  </div>
                </div>
              </div>
              <div class="w-[332px] h-[38px] left-[28px] top-[396px] absolute">
                <div class="w-[103px] h-4 top-[-29px] absolute text-center text-black text-[12px]">Dropoff location</div>
                <PlacesTo name='2' onSelect={(selected) => handlePlaceChangeInput(selected)}/>
                <div class="w-[279px] h-[30px] left-[106px] top-[50px] text-red-600 absolute text-opacity-60 text-xs">
                    { location ? (isValidLocation(location) ? undefined : 'Invalid location') : (locationCheck ? 'Location is required' : undefined) }
                  </div>
              </div>

              <div class="w-[361.01px] h-[0px] left-[14px] top-[466px] absolute border border-zinc-300"></div>
              <div class="w-[361.01px] h-[0px] left-[14px] top-[541px] absolute opacity-40 border-4 border-zinc-300"></div>
              <div class="w-[338px] h-[63px] left-[23px] top-[472px] absolute">
                <div class="w-[60px] h-[22px] left-0 top-0 absolute text-neutral-400 text-xs">Fees</div>
                <div class="w-[60px] h-[22px] left-0 top-[41px] absolute text-slate-950 text-xs">Total</div>
                <div class="w-[76px] h-[22px] left-0 top-[19px] absolute text-neutral-400 text-[12px]">Delivery fees</div>
                <div class="w-[76px] h-[22px] left-[261px] top-[19px] absolute text-right text-neutral-400 text-[12px]">R 0,00</div>
                <div class="w-[76px] h-[22px] left-[262px] top-[41px] absolute text-right text-stone-950 text-[12px]">R 0,00</div>
              </div>
              <div class="w-[177px] h-[38px] left-[104px] top-[563px] absolute">
                <div class="w-[177px] h-[30px] left-0 top-[4px] absolute text-center text-white text-xs font-bold">
                  <button className="bg-blue-700 hover:bg-blue-500 text-white  py-4 px-5 rounded" styles={`font-weight:300`}>
                    Complete Order
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

export default Popup