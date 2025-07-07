import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const apiKey = "5a6d27fbbd1b4e69b89132620250707"; // Replace with your WeatherAPI key

  const getWeather = async () => {
    if (!city) return;
    setError("");
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`
      );
      setCurrent(res.data.current);
      setForecast(res.data.forecast.forecastday);
    } catch (err) {
      console.error("Weather API error:", err);
      setError("City not found or invalid API key.");
      setCurrent(null);
      setForecast([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") getWeather();
  };

  return (
    <div className="app fade-in">
      <h1 className="title">🌦️ Weather Forecast</h1>
      <div className="search-box slide-in">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {error && <p className="error shake">{error}</p>}

      {current && (
        <div className="weather-info zoom-in">
          <h2>{city}</h2>
          <p>{current.condition.text}</p>
          <img src={current.condition.icon} alt="icon" />
          <p>🌡️ {current.temp_c}°C</p>
          <p>💧 Humidity: {current.humidity}%</p>
          <p>🌬️ Wind: {current.wind_kph} kph</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast fade-in">
          <h3>5-Day Forecast</h3>
          <div className="forecast-grid">
            {forecast.map((day, index) => (
              <div className="day card slide-up" key={index}>
                <p>{day.date}</p>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
                <p>{day.day.condition.text}</p>
                <p>🌡️ {day.day.avgtemp_c}°C</p>
                <p>Min: {day.day.mintemp_c}°C / Max: {day.day.maxtemp_c}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;