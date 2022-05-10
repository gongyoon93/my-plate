const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/Users');

//client에서 보낸 application/x-www-form-urlencoded를 분석해서 가져옴
app.use(bodyParser.urlencoded({extend: true}));

//application/json
app.use(bodyParser.json()); 

//mongoDB와 app을 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hi everyone')
})

app.post('/register', (req, res) => {

  // 회원가입시 필요한 정보들을 client에 서 가져오면
  // DB에 저장

    const user = new User(req.body);

    user.save((err, userInfo) => {
      if(err) return res.json({ successs: false, err});
      //request 요청 수행 완료(200)
      return res.status(200).json({
        success: true
      })
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  