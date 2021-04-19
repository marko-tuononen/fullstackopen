import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-1234321' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = event => {
    event.preventDefault()
    if (persons.filter(person => person.name == newName).length) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    console.log('add person')
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id}>{person.name}&nbsp;{person.number}</p>)}
    </div>
  )
}

export default App