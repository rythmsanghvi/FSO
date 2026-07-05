import { useState } from "react"
import Persons from "./components/persons"
import Filter from "./components/filter"
import PersonForm from "./components/personform"

const App = () => {
  const [allPersons, setAllPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])

  const [filter, setFilter] = useState("")
  const [newPerson, setNewPerson] = useState({ name: "", number: "" })

  const addPerson = (event) => {
    event.preventDefault()
    const result = allPersons.find((person) => person.name === newPerson.name)
    if (result) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    } else {
      const personObj = {
        name: newPerson.name,
        number: newPerson.number,
        id: allPersons.length + 1,
      }
      setAllPersons(allPersons.concat(personObj))
      setNewPerson({ name: "", number: "" })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleFormChange = ({ target: { name, value } }) => {
    setNewPerson((newPerson) => ({
      ...newPerson,
      [name]: value,
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newPerson={newPerson}
        handleFormChange={handleFormChange}
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={allPersons} filter={filter} />
    </div>
  )
}

export default App
