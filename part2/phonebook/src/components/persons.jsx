const Persons = ({ persons, filter, removePerson }) => {
  const filteredPersons = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      )
  return (
    <div>
      {filteredPersons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>delete</button>
          </p>
        )
      })}
    </div>
  )
}

export default Persons
