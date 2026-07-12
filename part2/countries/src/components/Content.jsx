import Country from "./Country"
import Countries from "./Countries"

const Content = ({ filteredCountries, filter, showCountry }) => {
  if (filter.trim().length === 0) {
    return <p>Search for a country above</p>
  }

  if (filteredCountries.length > 10) {
    return <p> Too many matches, specify another filter </p>
  }

  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <Countries
        filteredCountries={filteredCountries}
        showCountry={showCountry}
      />
    )
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return <Country country={country} />
  }

  return <p> No matches found </p>
}

export default Content
