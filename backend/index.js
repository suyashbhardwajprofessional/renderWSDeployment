const express = require('express');
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.static('dist'))
app.use(express.json());

morgan.token('payload', function getBody (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))

app.get('/api/persons', (request, response) => {
	Person.find({}).then(result => {
    response.json(result);
  })
})

// app.get('/api/persons/:id', (request, response) => {
// 	const id = request.params.id;
// 	const match = persons.find(person=>person.id===id)
// 	if(match)	response.json(match)
// 	else 		response.status(404).end('not found')
// })

// app.delete('/api/persons/:id', (request, response) => {
// 	console.log('request to delete received')
// 	const id = request.params.id;
// 	persons = persons.filter(person=>person.id!==id);
// 	response.status(204).end(`absence of the phonebook entry of id ${id} now ensured.`)
// })

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('request body is ', request.body);
  if(!body.name) return response.status(400).json({error:'name is missing'})
  else if(!body.number) return response.status(400).json({error:'number is missing'})
  // else if(persons.find(person=>person.name===body.name)) return response.status(400).json({error:'already in phonebook! name must be unique'})

  const personObj = new Person({
    name: body.name,
    number: body.number,
  })
  
  personObj.save().then(result => {
    console.log(`added ${body.name} number ${body.number} to the phonebook`)
    response.json(result)
  })
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})