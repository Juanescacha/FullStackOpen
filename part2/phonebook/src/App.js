import { useState, useEffect } from "react"
import personService from "./services/persons"
import "./app.css"

const Filter = ({ newSearchName, handleSearchName }) => (
  <>
    filter shown with{" "}
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
        {person.name} {person.number}{" "}
        <DeleteButton id={person.id} name={person.name} />
      </div>
    ))}
  </>
)

const DeleteButton = ({ id, persons, setPersons, name }) => {
  const handler = () => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .eliminate(id)
        .then(returnedPerson =>
          setPersons(persons.filter(person => person.id !== returnedPerson.id))
        )
    } else {
      console.log("no fue borrado nada")
    }
  }
  return <button onClick={handler}>delete</button>
}

const Notification = ({ message }) => {
  if (message[0] === "") {
    return null
  }
  const type = message[1] ? "success" : "error"

  return <div className={type}>{message[0]}</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearchName, setNewSearchName] = useState("")
  const [message, setMessage] = useState(["", true])

  const fetchHook = () => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }

  useEffect(fetchHook)

  const addPerson = event => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    let copy = false
    let id = 0

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === personObject.name) {
        copy = true
        id = i + 1
      }
    }
    if (copy) {
      //alert(`${newName} is already added to phonebook`)
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(id, personObject)
          .then(returnedPerson =>
            setPersons(
              persons.map(person =>
                person.id !== id ? person : returnedPerson
              )
            )
          )
      } else {
        console.log("no se realizo ningun reemplazo de numero")
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage([`Added ${returnedPerson.name}`, true])
        setTimeout(() => {
          setMessage(["", true])
        }, 5000)
      })
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
      <Notification message={message} />
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
      <Persons
        personsToShow={personsToShow}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
