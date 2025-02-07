let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let stdSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    }
});

let stdModel=mongoose.model('students',stdSchema);
module.exports=stdModel;