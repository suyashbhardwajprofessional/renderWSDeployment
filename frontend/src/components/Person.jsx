const Person = ({personObj, deleteEntry}) => {
  return(<>
    <span>{personObj.name} {personObj.number}</span>
    <button onClick={deleteEntry}>deleteMe</button>
    <br/>
  </>)
}

export default Person