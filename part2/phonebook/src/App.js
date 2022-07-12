import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearchName, setNewSearchName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    let copy = false;

    for (let i = 0; i < persons.length; i++) {
      // this is for check if all the object is the same
      // if (JSON.stringify(persons[i]) === JSON.stringify(personObject)) {
      //   copy = true;
      // }
      // this is to check only if the name is the same
      if (persons[i].name === personObject.name) {
        copy = true;
      }
    }
    if (copy) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setNewSearchName(event.target.value);
  };

  const personsToShow =
    !newSearchName || newSearchName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newSearchName.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{" "}
      <input value={newSearchName} onChange={handleSearchName} />
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
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
