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

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
  .then(person => {

      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

    .catch(error => {
      return next(error);
    })
})

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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error('From the - AllErrorsHandledAtSinglePlace handler', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'the malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})