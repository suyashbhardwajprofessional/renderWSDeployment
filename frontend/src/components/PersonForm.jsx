const PersonForm = ({ addToPhonebook, newName, handleInputChange, newNumber, handlePhoneInputChange }) => {
  return(<>
    <form onSubmit={addToPhonebook}>
      <div>
        <table>
          <thead></thead>
          <tbody>
          <tr>
            <td>name:</td>
            <td><input value={newName} onChange={handleInputChange} /></td>
          </tr>
          <tr>
            <td>number:</td>
            <td><input value={newNumber} onChange={handlePhoneInputChange} /></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>    
  </>)
}

export default PersonForm