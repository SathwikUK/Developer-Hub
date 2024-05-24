const { Long } = require('mongodb')
const mongoose = require('mongoose')

const devuser= mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true

    },
    skill:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('devUser',devuser)