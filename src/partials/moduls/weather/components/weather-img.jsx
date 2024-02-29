import React, { useState, useRef, useEffect } from "react";
import daySunny from "./../../../../assets/images/icons/weather/wi-day-sunny.svg";
import nightClear from "./../../../../assets/images/icons/weather/wi-night-clear.svg";
import dayCloudy from "./../../../../assets/images/icons/weather/wi-day-cloudy.svg";
import nightCloudy from "./../../../../assets/images/icons/weather/wi-night-alt-cloudy.svg";
import cloudy from "./../../../../assets/images/icons/weather/wi-cloudy.svg";
import fog from "./../../../../assets/images/icons/weather/wi-fog.svg";
import sprinkle from "./../../../../assets/images/icons/weather/wi-sprinkle.svg";
import rain from "./../../../../assets/images/icons/weather/wi-rain.svg";
import showers from "./../../../../assets/images/icons/weather/wi-showers.svg";



export default function WeatherImg({weather, id}) {
  const [weatherImages, setWeatherImages] = useState();
  const currentWeatherCode = id ? weather.daily.weatherCode[id] : weather.current.weatherCode;
  const isDay = id ? true : weather.current.isDay;

  useEffect(() => {
    
    switch (currentWeatherCode) {
      case 0:
        isDay ? setWeatherImages(daySunny) : setWeatherImages(nightClear);
        break;
      case 1:
      case 2:
        isDay ? setWeatherImages(dayCloudy) : setWeatherImages(nightCloudy);
        break;
      case 3:
        setWeatherImages(cloudy);
        break;
      case 45:
        setWeatherImages(fog);
        break;
      case 51:
      case 53:
      case 55:
        setWeatherImages(sprinkle);
        break;
      case 61:
      case 63:
      case 65:
        setWeatherImages(rain);
        break;
      case 80:
        setWeatherImages(showers);
        break;
      default:
        setWeatherImages();
    }
  }, [weather]);

  return (
    <img src={weatherImages} alt="" />
  );
}