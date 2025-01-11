const Filter = ({ handleSearchInputChange }) => {
  return(<>
    <table>
      <thead></thead>
      <tbody>
      <tr>
        <td>filter with: </td>
        <td><input type="text" onChange={handleSearchInputChange} /></td>
      </tr>
      </tbody>
    </table>
  </>)
}

export default Filter