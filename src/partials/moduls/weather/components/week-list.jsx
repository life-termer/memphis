import React, { useState, useRef, useEffect } from "react";
import { getCurrentDayShort } from "../utils";
import WeatherImg from "./weather-img";

export default function WeekList({weather}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      {/* Float32Array#map() expects the callback to return a number, and the method itself returns a Float32Array */}
      {Array.from(weather.daily.weatherCode).map((code, i) => {
        return(
          <div className={"d-flex flex-column w-100 justify-content-center align-items-center card-daily" + (index == i ? " active" : "")} key={i}
            onClick={() => setIndex(i) }
          >
            <p className="day-daily">{getCurrentDayShort(weather.daily.time[i].getDay())}</p>
            <div className="image-wrapper list">
              <WeatherImg 
                weather={weather}
                id={i}
              />
            </div>
            <div>
              <p className="temp-daily text-center">
                {weather.daily.temperature2mMax[i].toFixed(0)}&#176;
                <span className="ms-1">{weather.daily.temperature2mMin[0].toFixed(0)}&#176;</span>
              </p>
            </div>
          </div>
        )
      })}
    </React.Fragment>
  );
}