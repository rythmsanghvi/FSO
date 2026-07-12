const Countries = ({ filteredCountries, showCountry }) => {
  return (
    <div>
      {filteredCountries.map((country) => {
        return (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>show</button>
          </p>
        )
      })}
    </div>
  )
}

export default Countries
