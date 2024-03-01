import { fetchWeatherApi } from 'openmeteo';
import { useEffect } from 'react';
import { citiesList } from '../../../template/cities';


// export interface IApi {
//   currentCity: any;
//   setCurrenCity: any;
//   weather: any;
//   setWeather: any;
// 	setLoading: any;
// }

export default function Api({currentCity, setCurrenCity, weather, setWeather, setLoading, setActiveDay}) {
	
	const url = "https://api.open-meteo.com/v1/forecast";
	var responses = [];

	// Helper function to form time ranges
	const range = (start,stop, step) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

	const fetchScore = async (city) => {
		const params = {
			"latitude": city.latitude,
			"longitude": city.longitude,
			"current": ["temperature_2m", "relative_humidity_2m", "is_day", "precipitation", "weather_code", "wind_speed_10m"],
			"hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "weather_code", "wind_speed_10m"],
			"daily": ["weather_code", "temperature_2m_max", "temperature_2m_min"],
			"timezone": "auto"
		};

		responses = await fetchWeatherApi(url, params);
		// Process first location. Add a for-loop for multiple locations or weather models
		const response = responses[0];

		// Attributes for timezone and location
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const timezone = response.timezone();
		const timezoneAbbreviation = response.timezoneAbbreviation();
		const latitude = response.latitude();
		const longitude = response.longitude();

		const current = response.current();
		const hourly = response.hourly();
		const daily = response.daily();

		// Note: The order of weather variables in the URL query and the indices below need to match!
		const weatherData = {
			current: {
				time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
				temperature2m: current.variables(0).value(),
				relativeHumidity2m: current.variables(1).value(),
				isDay: current.variables(2).value(),
				precipitation: current.variables(3).value(),
				weatherCode: current.variables(4).value(),
				windSpeed10m: current.variables(5).value(),
			},
			hourly: {
				time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				temperature2m: hourly.variables(0).valuesArray(),
				relativeHumidity2m: hourly.variables(1).valuesArray(),
				precipitationProbability: hourly.variables(2).valuesArray(),
				weatherCode: hourly.variables(3).valuesArray(),
				windSpeed10m: hourly.variables(4).valuesArray(),
			},
			daily: {
				time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				weatherCode: daily.variables(0).valuesArray(),
				temperature2mMax: daily.variables(1).valuesArray(),
				temperature2mMin: daily.variables(2).valuesArray(),
			},
		
		};

		setWeather(weatherData);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}
	


	const	handleCityClick = (city) => {
		setActiveDay(0);
		setCurrenCity(city);
		setLoading(true);
		fetchScore(city);
	}

	useEffect(() => {
		fetchScore(currentCity);
	}, []);

	{
		return (
			<div className="row w-100 g-0">
				<div className="col-8 position-relative px-5 py-2">
					<div className="weather-nav-prev nav">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
						</svg>
					</div>
					<swiper-container 
						slides-per-view="4" 
						speed="500" 
						loop="true" 
						space-between="10" 
						navigation-next-el=".weather-nav-next"
						navigation-prev-el=".weather-nav-prev"
					>
					{citiesList.map((city) => {
						return (
						<swiper-slide key={city.id}>
							<div className="btn-city active-button"
								onClick={() => {
									handleCityClick(city)
								}}
								>{city.name}</div>
						</swiper-slide>
						)
					})}
					</swiper-container>
					<div className="weather-nav-next nav">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
						</svg>
					</div>
      	</div>
				<div className="col-4 search d-flex align-items-center active ps-3">
					<input className="form-control me-2 disabled" type="search" placeholder="Search" aria-label="Search"/>
				</div>
			</div>
			
		);
	}
}

// `weatherData` now contains a simple structure with arrays for datetime and weather data
// for (let i = 0; i < weatherData.hourly.time.length; i++) {
// 	console.log(
// 		weatherData.hourly.time[i].toISOString(),
// 		weatherData.hourly.temperature2m[i],
// 		weatherData.hourly.relativeHumidity2m[i],
// 		weatherData.hourly.precipitationProbability[i],
// 		weatherData.hourly.weatherCode[i],
// 		weatherData.hourly.windSpeed10m[i]
// 	);
// }
// for (let i = 0; i < weatherData.daily.time.length; i++) {
// 	console.log(
// 		weatherData.daily.time[i].toISOString(),
// 		weatherData.daily.weatherCode[i],
// 		weatherData.daily.temperature2mMax[i],
// 		weatherData.daily.temperature2mMin[i]
// 	);
// }