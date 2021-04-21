// Require
const mongoose = require('mongoose')

// Create Schema for message
const msgSchema = new mongoose.Schema({
    // Pseudo (string) required
    pseudo: {
        type: String,
        required: true
    },
    // Message (string) required
    msg: {
        type: String,
        required: true
    }
})

const Msg = mongoose.model('msg', msgSchema)
module.exports = Msg