import { useState, useContext } from "react";
import Context from "../Context";
import "../styles.css";

export default function SearchCity() {
  const [errors, setErrors] = useState({});
  const { city, setCity, weather, setWeather, loading, setLoading } =
    useContext(Context);

  function handleBlur(event) {
    const { name, value } = event.target;
    let newErrors = { ...errors };

    if (name === "city" && value.length < 3) {
      newErrors = {
        ...newErrors,
        city: "input must be at least 3 characters length",
      };
    } else {
      newErrors = {
        ...newErrors,
        [name]: "",
      };
    }

    setErrors(newErrors);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca261c971d5638db9d4d6cbccc1f093d`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      alert("City not found. Please try again with a different city.");
    }
  };

  return (
    <div className="weather-search">
      <form onSubmit={handleSubmit}>
        <input
          name="city"
          type="text"
          placeholder="Search for city "
          onChange={(e) => setCity(e.target.value)}
          onBlur={handleBlur}
        />
        {errors.city && <p>{errors.city}</p>}
      </form>
    </div>
  );
}
