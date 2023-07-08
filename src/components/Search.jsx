import { Places, PlacesTo, Counter } from ".";
import { useState } from "react";
import axios from 'axios';

function Search() {
  const [formData, setFormData] = useState({
    checkboxes: [],
    productCounter: [],
    product_type: [],
    product_size: [],
    from_longitude: 0,
    from_latitude: 0,
    to_longitude: 0,
    to_latitude: 0,
    // Add more form fields as needed
  });

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
    event.preventDefault();

    // Make the POST request using Axios
    axios.post('https://9xpzluvgd0.execute-api.eu-north-1.amazonaws.com/prod/request', formData)
      .then(response => {
        // Handle the response as needed
        console.log('Post successful:', response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error posting data:', error);
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
      });
    } else if (name === 'To') {
      setFormData({
        ...formData,
        to_longitude: selected.lng,
        to_latitude: selected.lat,
      });
    }
  };

  return (
<form class="w-full" onSubmit={handleSubmit}>
  <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Please select a pick up and drop off location</h3>
  <Places name='1' onSelect={(selected) => handlePlaceChangeInput(selected, "From")}/>
  <div className="ss:flex md:mr-4 mr-0">
      <br className="sm:block" />
  </div>
  <PlacesTo name='2' onSelect={(selected) => handlePlaceChangeInput(selected, "To")}/>
  <div className="ss:flex md:mr-4 mr-0">
      <br className="sm:block" />
  </div>
  <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Please select product type</h3>
  <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="6" id="clothing-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="clothing-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Clothing</label>
          </div>
      </li>
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="1" id="appliance-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="appliance-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Appliance</label>
          </div>
      </li>
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="2" id="document-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="document-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document</label>
          </div>
      </li>
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="3" id="utensil-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="utensil-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Utensil</label>
          </div>
      </li>
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center px-3">
              <input onChange={handleCheckboxChange} name="4" id="cosmetic-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label for="cosmetic-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cosmetic</label>
          </div>
      </li>
      <li class="w-full dark:border-gray-600">
        <div class="flex items-center px-3">
            <input onChange={handleCheckboxChange} name="5" id="other-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label for="other-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
        </div>
    </li>
  </ul>
  <div className="ss:flex md:mr-4 mr-0">
      <br className="sm:block" />
  </div>
  <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Please select product size</h3>
  <div className="ss:flex md:mr-4 mr-0">
      <br className="sm:block" />
  </div>

  <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class=" items-center px-3">
              <label for="document-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Envelope</label>
              <Counter name="1" onChange={(count) => handleCounterChangeInput(count, "1")}/>
            </div>
        </li>
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class=" items-center px-3">
              <label for="document-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Box</label>
              <Counter name="7" onChange={(count) => handleCounterChangeInput(count, "7")}/>
            </div>
        </li>
  </ul>
  <div className="ss:flex md:mr-4 mr-0">
      <br className="sm:block" />
  </div>
  <button class="bg-blue-700 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded">
    Search
  </button >
</form>
);
  }


export default Search;
