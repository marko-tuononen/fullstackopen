import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, onChange}) => {
  return (
    <div>filter shown with <input value={filter} onChange={onChange}/></div>
  )
}

const ItemRow = ({item, setFilter}) => {
  return (
    <div>
      {item.name}
      <button onClick={() => setFilter(item.name)}>show</button>
    </div>
  )
}

const ItemDetails = ({item}) => {
  return (
    <div>
      <h1>{item.name}</h1>
      <p>capital {item.capital}</p>
      <p>population {item.population}</p>
      <h2>languages</h2>
      <ul>
        {item.languages.map(language => <li>{language.name}</li>)}
      </ul>
      <img src={item.flag} width="500"/>
    </div>
  )
}

const FilteredList = ({items, filter, setFilter}) => {
  const matchingItems = items.filter(filter)
  if (matchingItems.length > 10) {
    return (<div>too many matches, please specify another filter</div>)
  } else if (matchingItems.length > 1) {
    return (
      <div>
        {matchingItems.map(item => <ItemRow key={item.alpha2Code} item={item} setFilter={setFilter} />)}
      </div>
    )
  } else if (matchingItems.length === 1) {
    return (<ItemDetails item={matchingItems[0]} />)
  } else {
    return (<div>no matches found, please specify another filter</div>)
  }
}

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
      <FilteredList 
        items={countries} 
        filter={country => country.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1} 
        setFilter={setFilter}
      />
    </div>
  )
}

export default App