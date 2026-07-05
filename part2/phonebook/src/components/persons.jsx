const Persons = ({ persons, filter }) => {
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
          </p>
        )
      })}
    </div>
  )
}

export default Persons
