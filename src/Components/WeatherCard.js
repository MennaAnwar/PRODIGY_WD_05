import "../styles.css";
import Context from "../Context";
import { useContext } from "react";

export default function WeatherCard() {
  const { weather } = useContext(Context);

  const spitOutCelcius = (kelvin) => {
    const celcius = Math.round(kelvin - 273.15);
    return celcius;
  };

  const getWeatherIcon = (iconParameter) => {
    const icon = `https://openweathermap.org/img/wn/${iconParameter}@2x.png`;
    return <img src={icon} alt="" />;
  };
  console.log(weather);
  return (
    <div className="card  back-card">
      <div className="card-top text-center">
        <div className="city-name ">
          <p>{weather.name}</p>
          <span>...</span>
        </div>
      </div>

      <div className="card-body ">
        <div className="card-mid">
          <div className="col-8 text-center temp">
            <span>{spitOutCelcius(weather.main.temp)} &deg;C</span>
          </div>
          <div className="col-4 condition-temp">
            <p className="condition">{weather.weather[0].description}</p>
            <p className="high">
              Max: {spitOutCelcius(weather.main.temp_max)}&deg;C
            </p>
            <p className="low">
              Min: {spitOutCelcius(weather.main.temp_min)}&deg;C
            </p>
          </div>
        </div>

        <div className="icon-container">
          {getWeatherIcon(weather.weather[0].icon)}
        </div>
        <div className="card-bottom px-5 py-4 row">
          <div className="col text-center">
            <p>{spitOutCelcius(weather.main.feels_like)} &deg;C</p>
            <span>Feels Like</span>
          </div>
          <div className="col text-center">
            <p>{weather.main.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
