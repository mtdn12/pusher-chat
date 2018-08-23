const Pusher = require('pusher')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// app.use(cors)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var pusher = new Pusher({
  appId: '583397',
  key: '6adc10843981b62e1553',
  secret: '601cb6d8c6063391e0b2',
  cluster: 'ap1',
  encrypted: true
});

app.post('/api/message', (req, res) => {
  const payload = req.body
  pusher.trigger(`chat`,`message-${payload.username}`, payload)
  res.send(payload)
})
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Listening at ' + PORT)
})
app.on('listening',() => {
  console.log("listenning")
})