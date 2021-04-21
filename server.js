// Init require
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/live-chat', {useNewUrlParser: true, useUnifiedTopology: true})

// Test if connection is ready
const connection = mongoose.connection
connection.once('open', function() {
    console.log("Connexion à la base de donnée MongoDB réussie")
})