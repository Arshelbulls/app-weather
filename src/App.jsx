
import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import WeatherCard from './components/WeatherCard'

function App() {


  const [coords, setCoords] = useState()
  const [wheather, setWheather] = useState()
  const [temp, setTemp] = useState()

  const success = position => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords) {

      const API_KEY = "96d58f3b93c854916afadb4d3c380a18"
      const { lat, lon } = coords

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

      axios.get(url)
        .then(res => {
          setWheather(res.data)

          const obj = {
            celcius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
          }

          setTemp(obj)
        })

        .catch(err => console.log(err))
    }
  }, [coords])

  console.log(wheather);

  return (
    <div className='app'>
      <WeatherCard
        weather={wheather}
        temp={temp}
      />
    </div>
  )
}

export default App
