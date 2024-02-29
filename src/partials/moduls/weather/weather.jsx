import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { weatherData } from "./api/openmeteo";
import { citiesList } from "../../template/cities";
import Api from "./api/openmeteo";
import { getCurrentHour, getCurrentTemp, getCurrentDay, getCurrentWeather, weatherImages } from "./utils";
gsap.registerPlugin(Draggable);

export default function Weather({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const [maximized, setMaximized] = useState(false);
  const dragInstance = useRef();
  const dragWindow = useRef();

  const [currentCity, setCurrenCity] = useState(citiesList[0]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentHour = getCurrentHour();
  let imgUrl = "";
  
  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-weather",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
    
  }, []);

  const setMaximizeWindow = () => {
    setMaximized((ref) => !ref);
  };
  const toggleMaximizeWindow = (event) => {
    //event.detail to get the current click count. It's the number of time the mouse's been clicked in the same area in a short time
    switch (event.detail) {
      case 2:
        setMaximized((ref) => !ref);
        break;
    }
  };
  var classMax = maximized ? " maximized " : "";

  {
    return (
      <div
        id="25"
        className={
          "window weather windows-box-shadow " +
          items[1].programList[4].active +
          " " +
          items[1].programList[4].minimized +
          classMax
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div className="header drag-target-weather" onClick={toggleMaximizeWindow}>
          <div>Weather</div>
          <div className="header-buttons">
            <div
              id="min-25"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div
              className="maximize windows-box-shadow"
              onClick={setMaximizeWindow}
            ></div>
            <div
              id="close-25"
              className="close windows-box-shadow"
              onClick={setCloseProgram}
            >
              X
            </div>
          </div>
        </div>
        <div className="line">
          <Api
            currentCity={currentCity}
            setCurrenCity={setCurrenCity}
            weather={weather}
            setWeather={setWeather}
            setLoading={setLoading}
          />
        </div>
        
        <div className="content d-block">
          <div className="row mb-5 g-0 line p-3">
            <div className="col-6 h-100">
              {!loading ? 
              <React.Fragment>
                <h2 className='text-start'>Current City {!loading ? currentCity.name : ""}</h2>
                <div className="d-flex align-items-center">
                  <div className="image-wrapper">
                    {<img src={weatherImages[weather.hourly.weatherCode[currentHour]]} alt="" />}
                  </div>
                  <p className="temp">{getCurrentTemp(weather)}<span>&#176;C</span></p>
                  <div className="d-flex flex-column ms-2 fs-xsm">
                    <p className='text-start'>
                      Precipitation: {weather.hourly.precipitationProbability[currentHour]}%
                    </p>
                    <p className='text-start'>
                      Humidity: {weather.hourly.relativeHumidity2m[currentHour]}%
                    </p>
                    <p className='text-start'>
                      Wind: {weather.hourly.windSpeed10m[currentHour].toFixed(1)} km/h
                    </p>
                  </div>
              </div>
              </React.Fragment>
              :<div></div>
              }
            </div>
            <div className="col-6 h-100">
            {!loading ? 
            <React.Fragment>
              <h2 className="text-end">Weather</h2>
              <p className="text-end">{getCurrentDay() + " " + getCurrentHour() + ":00"}</p>
              <p className="text-end">{getCurrentWeather(weather)}</p>
            </React.Fragment>
            :<div></div>
            }
            </div>
          </div>
          {!loading ? 
          <React.Fragment>
            {/* <div>DATE: {weather.hourly.time[0].toISOString()}</div>  */}
            <div>TEMP: {weather.hourly.temperature2m[currentHour]}</div>
            <div>HUMID: {weather.hourly.relativeHumidity2m[currentHour]}</div>
            <div>PART: {weather.hourly.precipitationProbability[currentHour]}</div>
            <div>CODE: {weather.hourly.weatherCode[currentHour]}</div>
            <div>WIND: {weather.hourly.windSpeed10m[currentHour]}</div>
          </React.Fragment>
          :<div>Loading....</div>
          }
          {loading ? <div className="loader-wrapper"><span className="loader"></span></div> : "" }
        </div>
      </div>
    );
  }
}
