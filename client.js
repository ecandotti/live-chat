const socket = io('http://localhost:3000')
const messages = document.getElementById('messages')
const msgForm = document.getElementById('msgForm')

// Connect to message chanel, to listen incoming message (display first in log)
socket.on('message', data => {
    console.log(data)
    appendMessages(data)
})

// Connect to chathistory chanel to get previous message and append in DOM
socket.on('chathistory', data => {
    console.log(data)
    if (data.length) {
        data.forEach(message => {
            appendMessages(message.msg)
        })
    }
})

// When submit, value has been emit in livechat chanel and alert in console.log
msgForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('livechat', msgForm.msg.value)
    console.log('Submit from msgFrom', msgForm.msg.value)
    msgForm.msg.value = ''


})

// Simple function that add part of html message block
function appendMessages(message) {
    const html = `<div>${message}</div>`
    messages.innerHTML += html
}