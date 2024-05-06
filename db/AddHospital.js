const mongoose=require("mongoose");

const hospitalSchema= new mongoose.Schema({
    name:String,
    location:String,
    specialisation:String,
    available:String,
    staffs:Number,
    rooms:{
        type:Number,
    },
    beds:{
        type:Number,
    },
    labs:Number,
    doctors:String,
    image:String,
    adminId:String
});

module.exports= mongoose. model("addhospitals",hospitalSchema);
