import { Places, PlacesTo, Counter } from ".";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from "./Popup";
import PopupTwo from "./PopupTwo";

function Search() {
  const [formData, setFormData] = useState({
    checkboxes: [],
    productCounter: [],
    product_type: [],
    product_size: [{code: "1", quantity: 1}, {code: "7", quantity: 1}],
    from_longitude: 0,
    from_latitude: 0,
    to_longitude: 0,
    to_latitude: 0,
    // Add more form fields as needed
  });
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupTwo, setButtonPopupTwo] = useState(false);
  const [parsedData, setParsedData] = useState();

  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    let updatedProductType = [...formData.checkboxes]; // Create a copy of the checkboxes array
  
    if (checked) {
      updatedProductType.push(name); // Add the checkbox name to the array if checked
    } else {
      updatedProductType = updatedProductType.filter((checkbox) => checkbox !== name); // Remove the checkbox name from the array if unchecked
    }
    const productType = updatedProductType.map((code) => {
      return { code };
    });

    setFormData({
      ...formData,
      checkboxes: updatedProductType,
      product_type: productType,
    });
  };

  const handleSubmit = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const testFormData = {
    "business_name": "My Local Delivery",
    "business_email": "bdube83@gmail.com",
    "pickup_location": {
        "street_or_building_name": "9 Malborough Way",
        "area": "Parklands",
        "town": "Blouberg"
    }
  }
    event.preventDefault();
    // Make the POST request using Axios
    setButtonPopup(true);
  };

  const handleCounterChangeInput = (count, code) => {    
    let recordExists = false;

    const updatedList = [...formData.product_size].map((item) => {
      if (item.code === code) {
        recordExists = true;
        return { ...item, quantity: count }; // Merge the updated data with the matched record
      }
      return item; // Return the original record if no match
    });

    if (!recordExists) {
      // If record doesn't exist, add a new record to the list
      updatedList.push({ code, quantity: count });
    }
    console.log(updatedList);

    setFormData({
      ...formData,
      product_size: updatedList,
    });
  };

  const handlePlaceChangeInput = (selected, name) => {    
    console.log(selected);
    console.log(name);

    if (name === 'From') {
      setFormData({
        ...formData,
        from_longitude: selected.lng,
        from_latitude: selected.lat,
        from: selected.address,
      });
    } else if (name === 'To') {
      setFormData({
        ...formData,
        to_longitude: selected.lng,
        to_latitude: selected.lat,
        to: selected.address,
      });
    }
  };

  return (
<div className="w-full" onSubmit={handleSubmit}>
  <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded" onClick={() => setButtonPopup(true)}>
    Launch Demo
  </button >
  <div className="bg-gray-200 rounded-lg">
    <Popup trigger={buttonPopup} setTrigger={setButtonPopup} setTriggerTwo={setButtonPopupTwo} setCustomerData={setParsedData}>
    </Popup>
    <PopupTwo trigger={buttonPopupTwo} setTrigger={setButtonPopupTwo} customerData={parsedData}>
    </PopupTwo>
  </div>
</div>
);
  }


export default Search;
