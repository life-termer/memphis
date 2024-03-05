import React, { useState, useRef, useEffect } from "react";
import { getLocalHour, getHour } from "../utils";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from "react-chartjs-2";
import WeatherImg from "./weather-img";
Chart.register(ChartDataLabels);

const LineChart = ({weather, activeDay}) => {

  const [weatherCodes, setWeatherCodes] = useState([
    weather.hourly.weatherCode[getLocalHour(weather) + 0*3],
    weather.hourly.weatherCode[getLocalHour(weather) + 1*3],
    weather.hourly.weatherCode[getLocalHour(weather) + 2*3],
    weather.hourly.weatherCode[getLocalHour(weather) + 3*3],
    weather.hourly.weatherCode[getLocalHour(weather) + 4*3],
    weather.hourly.weatherCode[getLocalHour(weather) + 5*3],
    weather.hourly.weatherCode[getLocalHour(weather) + 6*3],
    weather.hourly.weatherCode[getLocalHour(weather) + 7*3]
  ]);
  
  let labelsCurrent = [
    getHour(weather, getLocalHour(weather) + 0*3),
    getHour(weather, getLocalHour(weather) + 1*3),
    getHour(weather, getLocalHour(weather) + 2*3),
    getHour(weather, getLocalHour(weather) + 3*3),
    getHour(weather, getLocalHour(weather) + 4*3),
    getHour(weather, getLocalHour(weather) + 5*3),
    getHour(weather, getLocalHour(weather) + 6*3),
    getHour(weather, getLocalHour(weather) + 7*3),
  ];
  let labels = ["01:00", "04:00", "07:00", "10:00", "13:00", "16:00", "19:00", "22:00"];
  const [dataSet, setDataSet] = useState([
    parseInt(weather.hourly.temperature2m[getLocalHour(weather) + 0*3].toFixed(0)),
    parseInt(weather.hourly.temperature2m[getLocalHour(weather) + 1*3].toFixed(0)),
    parseInt(weather.hourly.temperature2m[getLocalHour(weather) + 2*3].toFixed(0)),
    parseInt(weather.hourly.temperature2m[getLocalHour(weather) + 3*3].toFixed(0)),
    parseInt(weather.hourly.temperature2m[getLocalHour(weather) + 4*3].toFixed(0)),
    parseInt(weather.hourly.temperature2m[getLocalHour(weather) + 5*3].toFixed(0)),
    parseInt(weather.hourly.temperature2m[getLocalHour(weather) + 6*3].toFixed(0)),
    parseInt(weather.hourly.temperature2m[getLocalHour(weather) + 7*3].toFixed(0))
  ]);

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "C",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(0, 0, 0)",
        data: dataSet,
        tension: 0.5,
        radius: 2,
      },
    ],
  })
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
          display: false // This hides all text in the legend and also the labels.
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: '#000',
        align : 'top',
        font: {
          size: 15
        },
      }
    },
    tooltipTemplate: "<%= value %>",
    scales: {
      
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false
        },
      },
      y: {
        border: {
          display: false,
        },
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      }
    },
    layout: {
      padding: {
          top: 30,
          bottom: 10,
      }
  }
  }

  useEffect(() => {
    let tempData = [];
    let newCodes = [];
    for (let i = 0; i < 8; i++) {
      let temp = parseInt(weather.hourly.temperature2m[activeDay * 24 + 1 + i * 3].toFixed(0));
      let tempCode = weather.hourly.weatherCode[activeDay * 24 + 1 + i * 3];
      tempData.push(temp);
      newCodes.push(tempCode);
    }
    setWeatherCodes(newCodes);
    setData({
      labels: activeDay === 0 ? labelsCurrent : labels,
      datasets: [
        {
          label: "C",
          backgroundColor: "rgb(0, 0, 0)",
          borderColor: "rgb(0, 0, 0)",
          data: activeDay === 0 ? dataSet : tempData,
          tension: 0.5,
          radius: 2,
        },
      ],
    })
  }, [activeDay]);

  return (
    <div className="d-flex w-100 line-chart">
      <Line data={data} options={options} />
      <div className="d-flex line-chart-images">
        {weatherCodes.map((code, i) => {
          return(
            <React.Fragment key={i}>
              <div className="image-wrapper">
                <WeatherImg weather={weather} code={code} />
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  );
};
export default LineChart;