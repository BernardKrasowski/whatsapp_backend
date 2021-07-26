//zmpRTMfAt9FGT1MG
//mongodb+srv://admin:<password>@cluster0.d1y1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1240869",
  key: "2bee353bd9703247b60b",
  secret: "f8c1e02d92917be8cc8c",
  cluster: "eu",
  useTLS: true
});


//middleware
app.use(express.json())
//DB config
const password = 'zmpRTMfAt9FGT1MG';
const connection_url = `mongodb+srv://admin:${password}@cluster0.d1y1e.mongodb.net/mywhatsapp?retryWrites=true&w=majority`;

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//????


// api routes
app.get('/', (req, res) => res.status(200).send('hellow world'))

app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {

    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

//listener
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))