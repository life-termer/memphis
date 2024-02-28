import { fetchWeatherApi } from 'openmeteo';
import { useEffect } from 'react';
import { citiesList } from '../../../template/cities';
import { getCurrentHour } from '../utils';

export interface IApi {
  currentCity: any;
  setCurrenCity: any;
  weather: any;
  setWeather: any;
	setLoading: any;
}

export default function Api({currentCity, setCurrenCity, weather, setWeather, setLoading}: IApi) {
	
	const url = "https://api.open-meteo.com/v1/forecast";
	var responses:any = [];

	// Helper function to form time ranges
	const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

	const fetchScore = async (city:any) => {
		const params = {
			"latitude": city.latitude,
			"longitude": city.longitude,
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

		const hourly = response.hourly()!;
		const daily = response.daily()!;

		// Note: The order of weather variables in the URL query and the indices below need to match!
		const weatherData = {

			hourly: {
				temperature2m: hourly.variables(0)!.valuesArray()!,
				relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
				precipitationProbability: hourly.variables(2)!.valuesArray()!,
				weatherCode: hourly.variables(3)!.valuesArray()!,
				windSpeed10m: hourly.variables(4)!.valuesArray()!,
			},
			daily: {
				time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				weatherCode: daily.variables(0)!.valuesArray()!,
				temperature2mMax: daily.variables(1)!.valuesArray()!,
				temperature2mMin: daily.variables(2)!.valuesArray()!,
			},

		};

		setWeather(weatherData);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}
	


	const	handleCityClick = (city: any) => {
		setCurrenCity(city);
		setLoading(true);
		fetchScore(city);
	}

	useEffect(() => {
		fetchScore(currentCity);
	}, []);

	{
		return (
			<div className="row w-100">
				<div className="col-6 result d-flex align-items-center active">
					<p className='text-start'>
						Results for {currentCity.name}
					</p>
					
				</div>
				<div className="col-6">
				{citiesList.map((city, index) => {
					return (
					<div key={city.id} className="">
						<div className={city.name}
							onClick={() => {
								handleCityClick(city)
							}}
							>{city.name}</div>
						</div>
					)
				})}
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
//    weatherData.hourly.relativeHumidity2m[i],
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