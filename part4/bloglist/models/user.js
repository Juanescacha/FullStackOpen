const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3 },
  name: { type: String, required: true },
  password: { type: String, require: true, minLength: 3 },
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

module.exports = mongoose.model("User", userSchema)
