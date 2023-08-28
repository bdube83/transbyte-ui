import { useState, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { debounce } from 'lodash';

export default function Places({onSelect}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA6HE4QEVGhnXtdSQsu5I3I2jIU_NjREiU", //process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    region: "ZA",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map onSelect={onSelect}/>;
}

function Map({onSelect}) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} selected={selected} onSelect={onSelect} />
      </div>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected, selected, onSelect }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    cacheKey: 'za',
    requestOptions: {
      componentRestrictions: { country: ["za"] },
    },
    debounce: 300,
  });
  const inputRef = useRef(null);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng, address });
    onSelect({ lat, lng, address });
  };

  const handleInputBlur = debounce(() => {
    if (value && document.activeElement !== inputRef.current && !selected) {
      // Clear the value only if it was manually entered and not from autocomplete
      setValue('');
    }
  }, 500); // Adjust the debounce delay as needed`

  const handleOnChange = async (e) => {
    setValue(e.target.value)
    setSelected(null);
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        ref={inputRef}
        onChange={handleOnChange}
        onBlur={handleInputBlur}
        disabled={!ready}
        className="combobox-input"
        placeholder="From"
        class="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
      />
      <ComboboxPopover className="z-[11]">
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};