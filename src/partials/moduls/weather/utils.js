import daySunny from "../../../assets/images/icons/weather/wi-day-sunny.svg";
import dayCloudy from "../../../assets/images/icons/weather/wi-day-cloudy.svg";
import cloudy from "../../../assets/images/icons/weather/wi-cloudy.svg";
export const weatherImages = [daySunny, dayCloudy, dayCloudy, cloudy];

export const getCurrentHour = () => {
  const today = new Date();
  return today.getHours();
}
export const getCurrentDay = () => {
  const today = new Date();
  let day =  today.getDay();
  switch (day) {
    case 1: 
      return "Monday";
    case 2: 
      return "Tuesday";
    case 3: 
      return "Wednesday";
    case 4: 
      return "Tuesday";
    case 5: 
      return "Friday";
    case 6: 
      return "Saturday";
    case 0: 
      return "Sunday";
    default:
      return "";
  }
}

export const getCurrentTemp = (weather) => {
  return Math.round(weather.hourly.temperature2m[getCurrentHour()]);
}

export const getCurrentWeather = (weather) => {
  let weatherCode = weather.hourly.weatherCode[getCurrentHour()];
  switch (weatherCode) {
    case 0:
      return "Sunny";
    case 1:
      return "Mainly Sunny";
    case 2:
      return "Partly Cloudy";
    case 3:
      return "Cloudy";
    default:
      return weatherCode;
  }
}
const isDay = () => {
  if (getCurrentHour() > 6 && getCurrentHour() < 22 ) return true;
  else return false;
}

