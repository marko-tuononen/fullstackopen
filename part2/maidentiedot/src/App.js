import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, onChange}) => {
  return (
    <div>filter shown with <input value={filter} onChange={onChange}/></div>
  )
}
const FilteredList = ({items, filter}) => {
  const matchingItems = items.filter(filter)
  if (matchingItems.length > 10) {
    return (
      <div>
        too many matches, please specify another filter
      </div>
    )
  } else if (matchingItems.length > 1) {
    return (
      <div>
        {matchingItems.map(item => <p key={item.alpha2Code}>{item.name}</p>)}
      </div>
    )
  } else if (matchingItems.length === 1) {
    return (
      <div>
        <h1>{matchingItems[0].name}</h1>
        <p>capital {matchingItems[0].capital}</p>
        <p>population {matchingItems[0].population}</p>
        <h2>languages</h2>
        <ul>
          {matchingItems[0].languages.map(language => <li>{language.name}</li>)}
        </ul>
        <img src={matchingItems[0].flag} width="500"/>
      </div>
    )
  } else {
    return (
      <div>
        no matches found, please specify another filter
      </div>
    )
  }
}
// 
const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = event => setFilter(event.target.value)

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange} />
      <FilteredList items={countries} filter={country => country.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1} />
    </div>
  )
}

export default App