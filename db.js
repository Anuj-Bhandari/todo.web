const mongoose = require('mongoose')

const Schema = mongoose.Schema ;

const ObjectId = mongoose.Types.ObjectId ;

const userSchema = new Schema({
    email: {type : String , unique :true},
    password: String,
    name: String
})

const TodoSchema = new Schema({
    title : String,
    description: String,
    status : String, 
    userId: ObjectId,
})

const todoModel = mongoose.model("todo" , TodoSchema)
const userModel = mongoose.model("user" , userSchema)

module.exports = {
    todoModel,
    userModel
};