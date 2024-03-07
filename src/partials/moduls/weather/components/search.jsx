import React, { useState, useRef, useEffect } from "react";
import cities from 'cities.json';

export default function Search({handleCityClick}) {
  const [filteredCity, setFilteredCity] = useState([]);
  const inputRef = useRef(null);

  const handleOnChange = (event) => {
    let value = event.target.value.toLowerCase();
    let filtered =[];
    if(value.length > 2) {
      filtered = cities.filter(city => city.name.toLowerCase().includes(value));
    } else filtered =[];
    setFilteredCity(filtered);
  }

  return (
    <div className="search">
      <input ref={inputRef} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleOnChange} />
      <div className="results">
      {filteredCity.map((city, i) => {
        return(
          i <= 5 ? <p onClick={
            () => {handleCityClick(city)
              inputRef.current.value = ""
              setFilteredCity([])
            }} key={i}>{city.name}, {city.country}</p> : ""
        )
      })}
        
      </div>
    </div>
  );
}