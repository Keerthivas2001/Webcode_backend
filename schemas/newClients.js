const validator =require('validator')
const mongoose= require('mongoose')

let UserSchemas= new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        password:{type:String,required:true},
        createdAt:{type:Date,default:Date.now}

    },

    {
        collection:'newclients',
        versionKey:false

    }
)

let Userclient= mongoose.model('newclients',UserSchemas)

module.exports={Userclient}