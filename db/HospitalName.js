const mongoose=require("mongoose");

const hospitalSchema=new mongoose.Schema({
     hospital_id:String,

    hospital_name:String,
       
    category: String,
    specialization:  String,
    
    rating: Number,
    
    location:String,
    
    availability:String,
    
    contact_number:String,
    staffs:Number,
    rooms:{
        type:Number},
    beds:{
        type:Number},
    labs:Number,
    doctors:String,
    adminId:String,
});

module.exports=mongoose.model('hospitalsnames',hospitalSchema);
