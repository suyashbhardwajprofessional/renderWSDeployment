const express = require('express');
var morgan = require('morgan')
const cors = require('cors')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const app = express();
// app.use(morgan('tiny'))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// log only 4xx and 5xx responses to console
/*app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))*/

app.use(cors())
morgan.token('payload', function getBody (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))

app.get('/api/test', (request,response)=>{
	response.send('hey there!');
})

app.get('/api/persons', (request, response) => {
	response.json(persons);
})

app.get('/info', (request, response) =>{
	response.send(`<div><p>phonebook has information for ${persons.length} people.</p>${new Date()}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	const match = persons.find(person=>person.id===id)
	if(match)	response.json(match)
	else 		response.status(404).end('not found')
})

app.delete('/api/persons/:id', (request, response) => {
	console.log('request to delete received')
	const id = request.params.id;
	persons = persons.filter(person=>person.id!==id);
	response.status(204).end(`absence of the phonebook entry of id ${id} now ensured.`)
})

app.use(express.json());
app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('request body is ', request.body);
  if(!body.name) return response.status(400).json({error:'name is missing'})
  else if(!body.number) return response.status(400).json({error:'number is missing'})
  else if(persons.find(person=>person.name===body.name)) return response.status(400).json({error:'already in phonebook! name must be unique'})

  const personObj = {
    name: body.name,
    number: body.number,
    id: String(Math.ceil(Math.random()*999+1))
  }

  persons = persons.concat(personObj)
  response.json(personObj)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})