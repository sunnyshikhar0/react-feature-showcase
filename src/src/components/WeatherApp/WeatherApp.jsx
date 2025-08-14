import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState(""); // User input for city
  const [weather, setWeather] = useState(null); // Weather data
  const [error, setError] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch weather data from WeatherAPI
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${city}&aqi=yes`,
      );
      if (!response.ok) {
        throw new Error("City not found.");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Weather App</h2>
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={fetchWeather}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Weather
      </button>
      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weather && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {weather.location.name}, {weather.location.country}
          </h3>
          <p>Region: {weather.location.region}</p>
          <p>Local Time: {weather.location.localtime}</p>
          <p>
            Temperature: {weather.current.temp_c}°C / {weather.current.temp_f}°F
          </p>
          <p>Condition: {weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="inline-block"
          />
          <p>Cloud: {weather.current.cloud}</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>
            Wind Speed: {weather.current.wind_kph} kph /{" "}
            {weather.current.wind_mph} mph
          </p>
          <p>Wind Direction: {weather.current.wind_dir}</p>
          <p>
            Air Quality Index (AQI):{" "}
            {weather.current.air_quality["us-epa-index"]}
          </p>
        </div>
      )}
    </div>
  );
}2

/*
Code Explanation
State Management:

city: Stores the user input for the city name.
weather: Stores the weather data fetched from the API.
error: Stores error messages (e.g., invalid city name).
loading: Indicates whether the API call is in progress.
API Call:

The fetchWeather function makes a GET request to the OpenWeatherMap API.
It handles errors (e.g., invalid city name) and updates the state accordingly.
UI Feedback:

Displays a loading message while fetching data.
Shows error messages for invalid input or API errors.
Displays weather details when data is successfully fetched.
*/
