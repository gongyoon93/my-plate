const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        minLength: 5
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function(next){
    let user = this;

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        //salt를 생성
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) 
                return next(err);
            //salt로 암호화
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) 
                    return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }

});

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword 와 암호화된 DB상 비밀번호 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })

}

userSchema.methods.findByToken = function(token, cb) {
    var user = this;
    
    //토큰을 decode 함
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 ID를 이용해 유저를 찾은 뒤
        //client에서 가져온 token과 DB에 보관된 token이 일치하는지 확인

        //findOne mongoDB method
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        });

    });
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};