const mongoose= require ('mongoose');
const emp=mongoose.Schema({
    name:String,
    position:String,
    location:String,
    salary:Number,
    email : String,
    password:String
})
const employeeData=mongoose.model('employesdatas',emp);
module.exports=employeeData;