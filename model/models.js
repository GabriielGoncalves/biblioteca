const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String, 
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
})

const bookSchema = new mongoose.Schema({
    bookName:{
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    release:{
        type: Date,
        required: true,
    },
    publishingCompany: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

module.exports = {
    userSchema, 
    bookSchema
}