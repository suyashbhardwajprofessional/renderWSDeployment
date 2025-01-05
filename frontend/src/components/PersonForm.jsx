const PersonForm = ({ addToPhonebook, newName, handleInputChange, newNumber, handlePhoneInputChange }) => {
  return(<>
    <form onSubmit={addToPhonebook}>
      <div>
        name: <input value={newName} onChange={handleInputChange} /><br/>
        number: <input value={newNumber} onChange={handlePhoneInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>    
  </>)
}

export default PersonForm