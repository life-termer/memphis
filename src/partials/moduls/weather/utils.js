import daySunny from "../../../assets/images/icons/weather/wi-day-sunny.svg";
import dayCloudy from "../../../assets/images/icons/weather/wi-day-cloudy.svg";
import cloudy from "../../../assets/images/icons/weather/wi-cloudy.svg";
import fog from "../../../assets/images/icons/weather/wi-fog.svg";
export const weatherImages = [];

export const getLocalHour = (weather) => {
  return weather.current.time.getHours() + (weather.current.time.getTimezoneOffset() / 60);
}
export const getHour = (weather, index) => {
  let hour = weather.hourly.time[index].getHours() + (weather.current.time.getTimezoneOffset() / 60);
  if(hour == -1) return "23:00";
  else return hour < 10 ? "0" + hour + ":00" : hour + ":00"; 
}
export const getCurrentDay = (weather) => {
  const today = weather.current.time;
  let day =  today.getDay();
  switch (day) {
    case 1: 
      return "Monday";
    case 2: 
      return "Tuesday";
    case 3: 
      return "Wednesday";
    case 4: 
      return "Thursday";
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

export const getCurrentDayShort = (day) => {
  switch (day) {
    case 1: 
      return "Mon";
    case 2: 
      return "Tue";
    case 3: 
      return "Wed";
    case 4: 
      return "Thu";
    case 5: 
      return "Fri";
    case 6: 
      return "Sat";
    case 0: 
      return "Sun";
    default:
      return "";
  }
}

// export const getCurrentTemp = (weather) => {
//   return Math.round(weather.hourly.temperature2m[getCurrentHour()]);
// }

export const getCurrentWeather = (weather, isDay) => {
  let weatherCode = weather.current.weatherCode;
  switch (weatherCode) {
    case 0:
      if(weather.current.isDay) return "Sunny"; else return "Clear";
    case 1:
      if(weather.current.isDay) return "Mainly Sunny"; else return "Mainly Clear";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Cloudy";
    case 45:
    case 48:
      return "Fog";
    case 51:
      return "Light drizzle";
    case 53:
      return "Drizzle";
    case 55:
      return "Dense drizzle";
    case 56:
    case 57:
      return "Freezing drizzle";
    case 61:
      return "Light rain";
    case 63:
      return "Rain";
    case 65:
      return "Heavy rain";
    case 66:
    case 67:
      return "Freezing rain";
    case 71:
      return "Slight snow";
    case 73:
      return "Snow";
    case 75:
      return "Heavy snow";
    case 75:
      return "Snow grains";
    case 80:
      return "Slight rain showers";
    case 81:
      return "Rain showers";
    case 82:
      return "Violent rain showers";
    case 85:
      return "Snow showers";
    case 86:
      return "Heavy snow showers";
    case 95:
      return "Thunderstorm";
    case 96:
      return "Thunderstorm with hail";
    case 99:
      return "Thunderstorm with heavy hail";
    default:
      return "";
  }
}


