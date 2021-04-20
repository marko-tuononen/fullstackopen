import React, { useState, useEffect } from 'react'
import personService from './services/persons'
// start json-server
//   npx json-server --port=3001 --watch db.json

const Notification = ({ message }) => {
  const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  return (<div style={notificationStyle}>{message}</div>)
}
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
const PersonList = ({persons, nameFilter, handleRemove}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toUpperCase().indexOf(nameFilter.toUpperCase()) !== -1)
        .map(person => 
          <p key={person.id}>
            {person.name}&nbsp;{person.number}&nbsp;<button onClick={handleRemove} value={person.id}>remove</button>
          </p>
        )
      }
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => personService.getAll().then(data => setPersons(data)), [])

  const addPerson = event => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      if (!window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        return 
      }
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.find(person => person.name === newName).id,        
      }
      personService.update(personObject.id, personObject).then(data => {
        setPersons(persons.map(person => person.id !== personObject.id ? person : data))        
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Updated '${data.name}'`)
        setTimeout(() => setNotificationMessage(null), 5000)
      })
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }  
      personService.create(personObject).then(data => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')  
        setNotificationMessage(`Added '${data.name}'`)
        setTimeout(() => setNotificationMessage(null), 5000)
      })      
    }
  }

  const removePerson = event => {
    event.preventDefault()
    const idToRemove = parseInt(event.target.value)
    const personToRemove = persons.find(person => person.id === idToRemove)
    if (window.confirm(`Remove ${personToRemove.name}?`)) {
      personService.remove(idToRemove).then(data => {
        setPersons(persons.filter(person => person.id !== idToRemove))
        setNotificationMessage(`Removed '${personToRemove.name}'`)
        setTimeout(() => setNotificationMessage(null), 5000)
      })
    }
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleNameFilterChange = event => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
      <PersonList persons={persons} nameFilter={nameFilter} handleRemove={removePerson} />
    </div>
  )
}

export default App