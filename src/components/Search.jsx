import { Places, PlacesTo, Counter } from ".";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const testData = {
      "status": true,
      "data": [
          {
              "id": 70,
              "product_id": 1,
              "unit": 1,
              "total_price": 126688,
              "total_distance_km": 13,
              "from_latitude": -33.819794,
              "from_longitude": 18.500566,
              "to_latitude": -33.933403,
              "to_longitude": 18.510883,
              "metadata": null,
              "created_at": "2023-07-09T09:13:51.000Z",
              "updated_at": "2023-07-09T09:13:51.000Z",
              "charge_url": "https://paystack.com/pay/x7lbbtd7gi",
              "state": "search",
              "product": {
                  "id": 1,
                  "provider_id": 1,
                  "name": "SAMEDAY EXPRESS",
                  "img_url": "https://thecourierguy.co.za/shipping",
                  "description": "MAJOR CENTRES, LOCAL AREAS",
                  "metadata": null,
                  "created_at": "2023-06-16T19:31:08.000Z",
                  "updated_at": "2023-06-28T21:58:21.000Z",
                  "product_type_id": 1,
                  "product_size_id": 2,
                  "price_per_km": 10000,
                  "currency": "ZAR",
                  "product_size": {
                      "id": 2,
                      "name": "Box 7",
                      "code": "7",
                      "description": null,
                      "size": "48 x 40 x 39cm",
                      "weight": 2500,
                      "weight_unit": "kg",
                      "metadata": null,
                      "created_at": "2023-06-28T20:40:51.000Z",
                      "updated_at": "2023-06-28T20:40:51.000Z",
                      "image_url": null
                  },
                  "product_type": {
                      "id": 1,
                      "name": "Appliance",
                      "code": "1",
                      "description": null,
                      "metadata": null,
                      "created_at": "2023-06-28T21:03:32.000Z",
                      "updated_at": "2023-06-28T21:05:51.000Z"
                  },
                  "provider": {
                      "id": 1,
                      "name": "The Courier Guy",
                      "business_url": "http://www.thecourierguy.co.za/",
                      "logo_url": "https://portal.thecourierguy.co.za/sites/tcg/logo.png?v=1",
                      "description": "The Courier Guy",
                      "metadata": null,
                      "created_at": "2023-06-14T23:49:41.000Z",
                      "updated_at": "2023-06-16T16:45:18.000Z"
                  }
              }
          },
          {
              "id": 71,
              "product_id": 2,
              "unit": 1,
              "total_price": 253377,
              "total_distance_km": 13,
              "from_latitude": -33.819794,
              "from_longitude": 18.500566,
              "to_latitude": -33.933403,
              "to_longitude": 18.510883,
              "metadata": null,
              "created_at": "2023-07-09T09:13:51.000Z",
              "updated_at": "2023-07-09T09:13:51.000Z",
              "charge_url": "https://paystack.com/pay/x7lbbtd7gi",
              "state": "search",
              "product": {
                  "id": 2,
                  "provider_id": 1,
                  "name": "OVERNIGHT COURIER",
                  "img_url": "https://thecourierguy.co.za/shipping",
                  "description": "MAJOR CENTRES, LOCAL AREAS",
                  "metadata": null,
                  "created_at": "2023-06-16T19:35:52.000Z",
                  "updated_at": "2023-06-28T21:58:22.000Z",
                  "product_type_id": 1,
                  "product_size_id": 2,
                  "price_per_km": 20000,
                  "currency": "ZAR",
                  "product_size": {
                      "id": 2,
                      "name": "Box 7",
                      "code": "7",
                      "description": null,
                      "size": "48 x 40 x 39cm",
                      "weight": 2500,
                      "weight_unit": "kg",
                      "metadata": null,
                      "created_at": "2023-06-28T20:40:51.000Z",
                      "updated_at": "2023-06-28T20:40:51.000Z",
                      "image_url": null
                  },
                  "product_type": {
                      "id": 1,
                      "name": "Appliance",
                      "code": "1",
                      "description": null,
                      "metadata": null,
                      "created_at": "2023-06-28T21:03:32.000Z",
                      "updated_at": "2023-06-28T21:05:51.000Z"
                  },
                  "provider": {
                      "id": 1,
                      "name": "The Courier Guy",
                      "business_url": "http://www.thecourierguy.co.za/",
                      "logo_url": "https://portal.thecourierguy.co.za/sites/tcg/logo.png?v=1",
                      "description": "The Courier Guy",
                      "metadata": null,
                      "created_at": "2023-06-14T23:49:41.000Z",
                      "updated_at": "2023-06-16T16:45:18.000Z"
                  }
              }
          }
      ],
      "message": "request successfully added"
  };
    event.preventDefault();
    // Make the POST request using Axios
    axios.post('https://9xpzluvgd0.execute-api.eu-north-1.amazonaws.com/prod/request', formData)
      .then(response => {
        // Handle the response as needed
        console.log('Post successful:', response.data);
        navigate('/search', { state: response.data }); // Redirect to the search page
      })
      .catch(error => {
        // Handle errors
        console.error('Error posting data:', error);
        navigate('/search', { state: 'Error searching data' }); // Redirect to the search page
      });
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
<form className="w-full" onSubmit={handleSubmit}>
  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Please select a pick up and drop off location</h3>
  <Places name='1' onSelect={(selected) => handlePlaceChangeInput(selected, "From")}/>
  <div className="ss:flex md:mr-4 mr-0">
      <br className="sm:block" />
  </div>
  <PlacesTo name='2' onSelect={(selected) => handlePlaceChangeInput(selected, "To")}/>
  <div className="ss:flex md:mr-4 mr-0">
      <br className="sm:block" />
  </div>
  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="6" id="clothing-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="clothing-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Clothing</label>
          </div>
      </li>
      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="1" id="appliance-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="appliance-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Appliance</label>
          </div>
      </li>
      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="2" id="document-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="document-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document</label>
          </div>
      </li>
      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="3" id="utensil-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="utensil-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Utensil</label>
          </div>
      </li>
      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="4" id="cosmetic-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="cosmetic-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cosmetic</label>
          </div>
      </li>
      <li className="w-full dark:border-gray-600">
        <div className="flex items-center px-3">
            <input onChange={handleCheckboxChange} name="5" id="other-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label htmlFor="other-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
        </div>
    </li>
  </ul>
  <div className="ss:flex md:mr-4 mr-0">
      <br className="sm:block" />
  </div>
  <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded">
    Search
  </button >
</form>
);
  }


export default Search;
