import Person from './Person'
import personService from '../services/persons'
const Persons = ({ persons, searchKey, deleteHandler }) => {
  
  return(<>
    { persons.filter(person=>
        person.name.toLowerCase().indexOf(searchKey)!=-1
      ).map(res=><Person key={res.id} personObj={res} deleteEntry={()=>deleteHandler(res)}/>) }
  </>)
}

export default Persons