import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, onChange }) => {
  return (
    <div>filter shown with <input value={filter} onChange={onChange} /></div>
  )
}

const CountryRow = ({ country, onShow }) => {
  return (
    <div>
      {country.name}
      <button onClick={() => onShow(country)}>show</button>
    </div>
  )
}

const CountryInfo = ({ basic, weather }) => {
  return (
    <>
      {basic && (
        <div>
          <h1>{basic.name}</h1>
          <p>capital {basic.capital}</p>
          <p>population {basic.population}</p>
          <h2>languages</h2>
          <ul>
            {basic.languages.map(language => <li>{language.name}</li>)}
          </ul>
          <img src={basic.flag} width="500" />
          <h2>weather in {basic.capital}</h2>
          <p>temperature {weather && weather.current.temperature} celcius</p>
          <p>wind {weather && weather.current.wind_speed} mph direction {weather && weather.current.wind_dir}</p>
        </div>
      )}
    </>
  )
}

const FilteredList = ({ items, onShow }) => {
  if (items.length > 10) {
    return (<div>too many matches, please specify another filter</div>)
  } else if (items.length > 1) {
    return (
      <div>
        {items.map(item => <CountryRow key={item.alpha2Code} country={item} onShow={onShow} />)}
      </div>
    )
  } else if (items.length === 1) {
    return (<div />)
  } else {
    return (<div>no matches found, please specify another filter</div>)
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState(undefined)
  const [basic, setBasic] = useState(undefined)
  const [matchingCountries, setMatchingCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    const matching = countries.filter(country => country.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1)
    setMatchingCountries(matching)
    setBasic(matching.length === 1 ? matching[0] : undefined)
  }, [filter, countries])

  useEffect(() => {
    axios
      .get('/?access_key=' + process.env.REACT_APP_API_KEY + '&query=' + (basic && basic.capital))
      .then(response => setWeather(response.data))
  }, [basic])

  const handleFilterChange = event => setFilter(event.target.value)
  const handleShowCountry = country => setBasic(country)

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange} />
      <FilteredList
        items={matchingCountries}
        onShow={handleShowCountry}
      />
      <CountryInfo basic={basic} weather={weather} />
    </div>
  )
}

export default App