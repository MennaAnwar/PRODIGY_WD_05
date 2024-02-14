import { useState, useEffect } from "react";
import Context from "../Context";
import SearchCity from "./SearchCity";
import WeatherCard from "./WeatherCard";
import "../styles.css";
import Loader from "./Loader/loader";
import axios from "axios";

export default function Main() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Alexandria&appid=ca261c971d5638db9d4d6cbccc1f093d`;

    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get(url);
          setWeather(response.data);
          setCity("Alexandria");
          setLoading(false);
        }, 4000);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Context.Provider
      value={{ city, setCity, weather, setWeather, loading, setLoading }}
    >
      <SearchCity />
      <WeatherCard />
    </Context.Provider>
  );
}
