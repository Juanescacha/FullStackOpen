import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
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
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
