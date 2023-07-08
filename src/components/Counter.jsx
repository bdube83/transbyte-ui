import CounterInput from "react-counter-input";
import { useState } from "react";

export default function Counter({onChange}) {
      return <CounterButton onChange={onChange}/>;
}

function CounterButton({onChange}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value) => {
        setInputValue(value);
        onChange(value); // Call the parent component's handleCounterChangeInput function with the data

    };

    return (
        <CounterInput
            min={0}
            max={3}
            onCountChange={handleInputChange}
        >
        {({
          decrement,
          handleChangeInput,
          handleBlur,
          increment,
          state: { inputValue },
          
        }) => (
          <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 py-2">
            <div class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none" onClick={decrement}>-</div>
            <input
              type="text"
              value={inputValue}
              onChange={handleChangeInput}
              onBlur={handleBlur}
              class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
            />
            <div class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer" onClick={increment}>+</div>
          </div>
        )}
      </CounterInput>
      );
  }