import { useState, useEffect } from "react"
import Persons from "./components/persons"
import Filter from "./components/filter"
import PersonForm from "./components/personform"
import axios from "axios"
import numberService from "./services/numbers"
import Notification from "./components/notification"

const App = () => {
  const [allPersons, setAllPersons] = useState([])
  const [filter, setFilter] = useState("")
  const [newPerson, setNewPerson] = useState({ name: "", number: "" })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    numberService.getAll().then((numbers) => {
      setAllPersons(numbers)
    })
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const addPerson = (event) => {
    event.preventDefault()
    const result = allPersons.find((person) => person.name === newPerson.name)
    if (result) {
      if (result.number !== newPerson.number) {
        console.log("result")
        if (
          window.confirm(
            `${newPerson.name} is already added to phonebook, replace the old number with a new one?`,
          )
        ) {
          const updatedPerson = { ...result, number: newPerson.number }
          numberService
            .update(result.id, updatedPerson)
            .then((returnedPerson) => {
              setAllPersons(
                allPersons.map((person) => {
                  return person.id !== result.id ? person : returnedPerson
                }),
              )
              setNewPerson({ name: "", number: "" })
              setMessage({
                type: "success",
                message: `Updated ${returnedPerson.name}`,
              })
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                setMessage({
                  type: "error",
                  message: `Information of ${result.name} has already been removed from the server`,
                })
              } else {
                setMessage({
                  type: "error",
                  message: error.response?.data?.error || "An error occurred",
                })
              }
            })
        }
      } else {
        alert(`${newPerson.name} is already added to phonebook`)
      }
    } else {
      const personObj = {
        name: newPerson.name,
        number: newPerson.number,
        id: allPersons.length + 1,
      }
      numberService.create(personObj).then((createdPerson) => {
        setAllPersons(allPersons.concat(createdPerson))
        setNewPerson({ name: "", number: "" })
        setMessage({ type: "success", message: `Added ${createdPerson.name}` })
      })
    }
  }

  const removePerson = (id) => {
    const person = allPersons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      numberService
        .remove(id)
        .then(() => {
          setAllPersons(allPersons.filter((person) => person.id !== id))
          setMessage({
            type: "success",
            message: `Removed ${person.name}`,
          })
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            setAllPersons(allPersons.filter((person) => person.id !== id))
            setMessage({
              type: "error",
              message: `Information of ${person.name} has already been removed from the server`,
            })
          } else {
            setMessage({
              type: "error",
              message: error.response?.data?.error || "An error occurred",
            })
          }
        })
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
      <h1>Phonebook</h1>
      <Notification notification={message} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newPerson={newPerson}
        handleFormChange={handleFormChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={allPersons}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
