const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.i2rin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(() => {
    console.log('connection successful!')
    console.log('')
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
      name: personName,
      number: personNumber,
    })

    if(personName || personNumber) {
      person.save().then(result => {
        console.log(`added ${personName} number ${personNumber} to the phonebook`, result)
        mongoose.connection.close()
      })
    }
    else {
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    }
  }).catch((er) => {console.log('connection failed with error message: ', er.errmsg)})