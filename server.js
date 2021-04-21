// Init require
const { join } = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', function (req, res) {
   res.sendFile(join(__dirname, 'index.html'))
})

const mongoose = require('mongoose')
const Msg = require(join(__dirname, 'models', 'message.js'))

// Connect to mongoDB and if connection is ready
mongoose.connect('mongodb://localhost:27017/live-chat', { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', function() {
    console.log("Connexion à la base de donnée MongoDB réussie")
})

// Create connection link
io.on('connection', (socket) =>{
   console.log(`Connecté au client ${socket.id}`)
   // Request chat history in mongoDB and send into historychat channel
    Msg.find().then(historychat => {
        console.log(historychat)
        socket.emit('historychat', historychat)
    })

    // channel livechat
    socket.on('livechat', res => {
        // Store res in message variable
        const message = new Msg({ pseudo: res.pseudo, msg: res.msg })
        // Save in mongoDB and emit the message in the channel (livechat)
        console.log(message)
        message.save().then(() => {
            io.emit('message', { pseudo: res.pseudo, msg: res.msg })
        })
    })

    // When user is deconnected, info will be write in log
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(3000, function () {
    console.log('Live-Chat disponible sur localhost:3000 !')
})