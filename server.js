// Init require
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')
const Msg = require('./models/mesage')

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/live-chat', { useNewUrlParser: true, useUnifiedTopology: true })

// Test if connection is ready
const connection = mongoose.connection
connection.once('open', function() {
    console.log("Connexion à la base de donnée MongoDB réussie")
})

// New connection event
io.on('connection', (socket) => {
    // Request chat history in mongoDB and send into chathistory chanel
    Msg.find().then(chathistory => {
        socket.emit('chathistory', chathistory)
    })
    // Chanel livechat
    socket.on('livechat', msg => {
        // Store msg in message variable
        const message = new Msg({ msg: msg, pseudo: "Anonymous"})
        // Save in mongoDB and emit the message in the chanel (livechat)
        message.save().then(() => {
            io.emit('message', msg)
        })
    })

    // When user is deconnected, info will be write in log
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})