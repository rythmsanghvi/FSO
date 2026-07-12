const CountryFilter = ({ filter, handleFilterChange }) => {
  return (
    <p>
      Find Countries
      <input value={filter} onChange={handleFilterChange}></input>
    </p>
  )
}

export default CountryFilter
