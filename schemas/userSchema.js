const validator =require('validator')
const mongoose= require('mongoose')

let UserSchema= new mongoose.Schema(
    {
        firstname:{type:String,required:true},
        lastname:{type:String,required:true},
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        password:{type:String,required:true},
        role:{type:String,default:'Employee'},
        createdAt:{type:Date,default:Date.now}

    },

    {
        collection:'crm',
        versionKey:false

    }
)

let UserModel= mongoose.model('crm',UserSchema)

module.exports={UserModel}