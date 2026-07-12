import { useState, useEffect } from "react"
import axios from "axios"
import Content from "./components/Content"
import CountryFilter from "./components/CountryFilter"
import getAllCountries from "./services/countries"

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    getAllCountries().then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilter(value)
    const countriesToShow = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(value.toLowerCase())
    })
    setFilteredCountries(countriesToShow)
  }

  const showCountry = (country) => {
    setFilteredCountries([country])
  }

  return (
    <div>
      <CountryFilter filter={filter} handleFilterChange={handleFilterChange} />
      <Content
        filteredCountries={filteredCountries}
        filter={filter}
        showCountry={showCountry}
      />
    </div>
  )
}

export default App
