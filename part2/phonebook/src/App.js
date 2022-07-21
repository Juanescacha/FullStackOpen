import { useState, useEffect } from "react"
import axios from "axios"

const Filter = ({ newSearchName, handleSearchName }) => (
  <>
    filter shown with
    <input value={newSearchName} onChange={handleSearchName} />
  </>
)

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ personsToShow }) => (
  <>
    {personsToShow.map(person => (
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    ))}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearchName, setNewSearchName] = useState("")

  const fetchHook = () => {
    const eventHandler = response => {
      setPersons(response.data)
    }
    axios.get("http://localhost:3001/persons").then(eventHandler)
  }

  useEffect(fetchHook, [])

  const addPerson = event => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    let copy = false

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === personObject.name) {
        copy = true
      }
    }
    if (copy) {
      alert(`${newName} is already added to phonebook`)
    } else {
      axios
        .post("http://localhost:3001/persons/", personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
      //setPersons(persons.concat(personObject))
    }
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = event => {
    setNewSearchName(event.target.value)
  }

  const personsToShow =
    !newSearchName || newSearchName === ""
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(newSearchName.toLowerCase())
        )

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        newSearchName={newSearchName}
        handleSearchName={handleSearchName}
      />
      <h1>Add a new</h1>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h1>Numbers</h1>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
