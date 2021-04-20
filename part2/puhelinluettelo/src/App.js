import React, { useState, useEffect } from 'react'
import personService from './services/persons'
// start json-server
//   npx json-server --port=3001 --watch db.json

const Filter = ({filter, onChange}) => {
  return (
    <div>filter shown with <input value={filter} onChange={onChange}/></div>
  )
}
const PersonForm = ({name, number, onNameChange, onNumberChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
        name: <input value={name} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const PersonList = ({persons, nameFilter}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toUpperCase().indexOf(nameFilter.toUpperCase()) !== -1)
        .map(person => <p key={person.id}>{person.name}&nbsp;{person.number}</p>)}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => personService.getAll().then(data => setPersons(data)), [])

  const addPerson = event => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
  
    personService.create(personObject).then(data => console.log(data))
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleNameFilterChange = event => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} onChange={handleNameFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <PersonList persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App