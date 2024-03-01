import React, { useState, useRef, useEffect } from "react";
import { getLocalHour, getHour } from "../utils";
import { getCurrentDayShort } from "../utils";
import WeatherImg from "./weather-img";
import LineChart from "./line-chart";

export default function TempList({weather, activeDay, setActiveDay}) {
  const [index, setIndex] = useState(0);
  const [tempList, setTempList] = useState([]);

  const graphStyle = (temp) => ({
    width: `100%`,
    height: temp*10 +`px`,
    backgroundColor: `#a8a8a8`,
  });

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
    <div className="d-flex w-100 g-0">
      {
      activeDay == 0 ? Array.from(weather.hourly.temperature2m).map((temp, i) => {
        return(
          
          i < 8 ? 
          <React.Fragment>
            <div className="d-flex w-100 justify-content-end flex-column hourly-temp" key={i}>
              <p>{weather.hourly.temperature2m[getLocalHour(weather) + i*3].toFixed(0)}</p>
              {/* <div className="graph w-100" style={graphStyle(weather.hourly.temperature2m[getLocalHour(weather) + i*3].toFixed(0))}></div> */}
              <p>{getHour(weather, getLocalHour(weather) + i*3)}</p>
            </div>

          </React.Fragment>
          : ""
        )
      }) : 
        <div></div>
      }
      
    </div>
    <LineChart />
    </React.Fragment>
  );
}