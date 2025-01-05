import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const handleInputChange = (evt) => { setNewName(evt.target.value) }
  const handlePhoneInputChange = (evt)  => { setNewNumber(evt.target.value) }
  const handleSearchInputChange = (evt) => { setSearchKey(evt.target.value) }
  
  const addToPhonebook = (evt) => {
    evt.preventDefault();
    const personObject = { name:newName, number:newNumber }
    const alreadyExists = persons.some(person=>person.name.toLowerCase()===newName.toLowerCase())
    if(alreadyExists) {
      if(confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)){
          const matchedId = persons.find(person=>person.name.toLowerCase()===newName.toLowerCase()).id
          personService
            .update(matchedId,personObject)
            .then(returnedPerson=> {
              setPersons(persons.map(person=>person.id===matchedId?returnedPerson:person))
              setNotificationMessage(`Updated phonebook entry for '${returnedPerson.name}`)
              setTimeout(() => {setNotificationMessage(null)}, 5000)
            })
            .catch(error => {
              setIsErrorMessage(true);
              setNotificationMessage(`Sorry! In the meanwhile, information of '${personObject.name}' has already been removed from server`)
              setTimeout(() => {setNotificationMessage(null)}, 5000)
              setPersons(persons.filter(person=>person.id!==matchedId))
            })
        }
    }
    else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)
        })
    }
    setNewName('');
    setNewNumber('');
  }

  const deleteHandler = (personObj) => {
    if(confirm(`delete ${personObj.name}?`))
    personService
      .deletePerson(personObj.id)
      .then(deletedObj=>setPersons(persons.filter(person=>person.id!==deletedObj.id)))
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <Notification message={notificationMessage} isErrorMessage={isErrorMessage}/>
      <h2>Phonebook</h2>
      <Filter handleSearchInputChange={(evt)=>handleSearchInputChange(evt)}/>
      <h4>Add a new contact:</h4>
      <PersonForm 
        addToPhonebook={(evt)=>addToPhonebook(evt)} 
        newName={newName} 
        handleInputChange={(evt)=>handleInputChange(evt)} 
        newNumber={newNumber}
        handlePhoneInputChange={(evt)=>handlePhoneInputChange(evt)} />
      <h4>Numbers</h4>
      <Persons persons={persons} searchKey={searchKey} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App