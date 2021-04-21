// Init require
const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', function (req, res) {
   res.sendFile('index.html', { root: __dirname })
})

const mongoose = require('mongoose')
const Msg = require('./models/mesage')

// Connect to mongoDB and if connection is ready
mongoose.connect('mongodb://localhost:27017/live-chat', { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', function() {
    console.log("Connexion à la base de donnée MongoDB réussie")
})

app.get('/json', function (req, res) {
    res.status(200).json({"message":"ok"})
})

// Create connection link
io.on('connection', (socket) =>{
   console.log(`Connecté au client ${socket.id}`)
   io.emit('news','Voici un nouvel élément envoyé par le serveur')
})

server.listen(3000, function () {
    console.log('Votre app est disponible sur localhost:3000 !')
})

// // New connection event
// io.on('connection', (socket) => {
//     // Request chat history in mongoDB and send into chathistory chanel
//     Msg.find().then(chathistory => {
//         socket.emit('chathistory', chathistory)
//     })
//     // Chanel livechat
//     socket.on('livechat', msg => {
//         // Store msg in message variable
//         const message = new Msg({ msg: msg, pseudo: "Anonymous"})
//         // Save in mongoDB and emit the message in the chanel (livechat)
//         message.save().then(() => {
//             io.emit('message', msg)
//         })
//     })

//     // When user is deconnected, info will be write in log
//     socket.on('disconnect', () => {
//         console.log('User disconnected')
//     })
// })