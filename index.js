const express = require('express')
const app = express()
const port = 5000

//mongoDB와 app을 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://gongyoon:abcd1234@cluster0.emgti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

