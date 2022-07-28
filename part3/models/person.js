const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose
  .connect(url)
  .then(result => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message)
  })

const validator = num => {
  return /^\d{2,3}-\d+$/.test(num)
}

const numValidatorError = [
  validator,
  "Error, please enter the phone number with the format xxx-xxxx",
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: numValidatorError,
  },
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Person", personSchema)
