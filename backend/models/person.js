const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

console.log('connecting to url ', url)
mongoose.connect(url)
  .then(() => {
    console.log('connection to mongoDB successful')
  })
  .catch((err) => {
    console.log('error connecting to mongoDB: ', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type:String,
    minLength:8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)