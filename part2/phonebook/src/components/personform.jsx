const PersonForm = ({newPerson, handleFormChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input
          name="name"
          value={newPerson.name}
          onChange={handleFormChange}
        />
      </div>
      <div>
        number:{" "}
        <input
          name="number"
          value={newPerson.number}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
