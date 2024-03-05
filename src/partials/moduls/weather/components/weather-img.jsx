import React, { useState, useRef, useEffect } from "react";
import daySunny from "./../../../../assets/images/icons/weather/wi-day-sunny.svg";
import nightClear from "./../../../../assets/images/icons/weather/wi-night-clear.svg";
import dayCloudy from "./../../../../assets/images/icons/weather/wi-day-cloudy.svg";
import nightCloudy from "./../../../../assets/images/icons/weather/wi-night-alt-cloudy.svg";
import cloudy from "./../../../../assets/images/icons/weather/wi-cloudy.svg";
import fog from "./../../../../assets/images/icons/weather/wi-fog.svg";
import sprinkle from "./../../../../assets/images/icons/weather/wi-sprinkle.svg";
import sleet from "./../../../../assets/images/icons/weather/wi-sleet.svg";
import rain from "./../../../../assets/images/icons/weather/wi-rain.svg";
import snow from "./../../../../assets/images/icons/weather/wi-snow.svg";
import snowWind from "./../../../../assets/images/icons/weather/wi-snow-wind.svg";
import showers from "./../../../../assets/images/icons/weather/wi-showers.svg";
import thunderstorm from "./../../../../assets/images/icons/weather/wi-thunderstorm.svg";
import stormShowers from "./../../../../assets/images/icons/weather/wi-storm-showers.svg";

export default function WeatherImg({weather, id, code}) {
  const [weatherImages, setWeatherImages] = useState();
  const currentWeatherCode = id ? weather.daily.weatherCode[id] : code ? code : weather.current.weatherCode;
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
      case 48:
        setWeatherImages(fog);
        break;
      case 51:
      case 53:
      case 55:
        setWeatherImages(sprinkle);
        break;
      case 56:
      case 57:
        setWeatherImages(sleet);
        break;
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        setWeatherImages(rain);
        break;
      case 71:
      case 73:
      case 75:
      case 77:
        setWeatherImages(snow);
        break;
      case 80:
      case 81:
      case 82:
        setWeatherImages(showers);
        break;
      case 85:
      case 86:
        setWeatherImages(snowWind);
        break;
      case 95:
        setWeatherImages(thunderstorm);
        break;
      case 96:
      case 99:
        setWeatherImages(stormShowers);
        break;
      default:
        setWeatherImages();
    }
  }, [code]);

  return (
    <img src={weatherImages} alt="" />
  );
}