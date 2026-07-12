import getWeather from "../services/weather"
import { useEffect, useState } from "react"

const Weather = ({ name, lat, lon }) => {
  const [weather, setWeather] = useState()
  useEffect(() => {
    getWeather(lat, lon).then((weather) => {
      setWeather(weather)
    })
  }, [lat, lon])

  return (
    <div>
      <h2>Weather in {name}</h2>

      {weather && (
        <div>
          <p>Temperature: {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Weather
