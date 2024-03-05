import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { citiesList } from "../../template/cities";
import Api from "./api/openmeteo";
import { getLocalHour, getCurrentDay, getCurrentWeather, weatherImages } from "./utils";
import WeatherImg from "./components/weather-img";
import WeekList from "./components/week-list";
import TempList from "./components/temp-list";
import LineChart from "./components/line-chart";
import cities from 'cities.json';
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
  const [activeDay, setActiveDay] = useState(0);
  // const currentHour = getCurrentHour(weather);
  
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
    console.log(cities);
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
            setActiveDay={setActiveDay}
          />
        </div>
        
        <div className="content d-block">
          <div className="row mb-3 g-0 line p-3">
            <div className="col-9 h-100">
              {!loading ? 
              <React.Fragment>
                <h2 className='text-start result'>Results for <span className="fw-bold">{!loading ? currentCity.name : ""}</span></h2>
                <div className="d-flex align-items-center">
                  <div className="image-wrapper">
                    <WeatherImg weather={weather} />
                  </div>
                  <p className="temp">{weather.current.temperature2m.toFixed(0)}<span>&#176;C</span></p>
                  <div className="d-flex flex-column ms-2 fs-xsm">
                    <p className='text-start'>
                      Precipitation: {weather.current.precipitation.toFixed(1)} mm
                    </p>
                    <p className='text-start'>
                      Humidity: {weather.current.relativeHumidity2m}%
                    </p>
                    <p className='text-start'>
                      Wind: {weather.current.windSpeed10m.toFixed(1)} km/h
                    </p>
                  </div>
              </div>
              </React.Fragment>
              :<div></div>
              }
            </div>
            <div className="col-3 h-100">
            {!loading ? 
            <React.Fragment>
              <h2 className="text-end">Weather</h2>
              <p className="text-end">{getCurrentDay(weather) + " " + getLocalHour(weather) + ":00"}</p>
              <p className="text-end">{getCurrentWeather(weather)}</p>
            </React.Fragment>
            :<div></div>
            }
            </div>
          </div>
          <div className="d-flex w-100 g-0 line mb-3 pb-3 card-daily-wrapper">
          {!loading ?
            <WeekList
              weather={weather}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
            />
            : ""}
          </div>
          <div className="d-flex w-100 g-0 mb-3 pb-3 hourly-temp-wrapper flex-column">
          {!loading ?
            <LineChart
              weather={weather}
              activeDay={activeDay}
              setActiveDay={setActiveDay} 
            />
            : ""}
          </div>
          {/* {!loading ? 
          <React.Fragment>
            <div>LOC_T {weather.current.time.toISOString()}</div>
            <div>TEMP: {weather.hourly.temperature2m[currentHour]}</div>
            <div>HUMID: {weather.hourly.relativeHumidity2m[currentHour]}</div>
            <div>PART: {weather.current.precipitation}</div>
            <div>CODE: {weather.current.weatherCode}</div>
            <div>WIND: {weather.current.windSpeed10m}</div>
            <div>IS-DAY: {}</div>
          </React.Fragment>
          :<div></div>
          } */}
          {loading ? <div className="loader-wrapper"><span className="loader"></span></div> : "" }
        </div>
      </div>
    );
  }
}
