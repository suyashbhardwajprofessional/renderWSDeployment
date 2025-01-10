const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

console.log('connecting to url ', url);
mongoose.connect(url)
	.then(()=> {
		console.log('connection to mongoDB successful');
	})
	.catch((err) => {
		console.log('error connecting to mongoDB: ', err.message);
	})

const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)