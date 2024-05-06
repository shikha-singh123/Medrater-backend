const express=require('express');
require('./db/config');
const cors= require('cors');

const Jwt=require("jsonwebtoken");
const User=require('./db/User');
const Hospital=require('./db/AddHospital')
const AddHospital=require('./db/AddHospital')
const HospitalName=require('./db/HospitalName')
const jwtKey='medrater';
const Admin=require('./db/AdminSchema');
const app=express();

app.use(express.json());
app.use(cors());

app.post('/register',async(req,res)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},
            (err,token)=>{
                if(err){
                 res.send({result:"something went wrong,Please try after some time"});
                
             }
                res.send({result,auth:token})
            })
});

app.post('/login',async(req,res)=>{
    if(req.body.password && req.body.email){

        let user= await User.findOne(req.body).select('-password');
        
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},
            (err,token)=>{
                if(err){
                 res.send({result:"something went wrong,Please try after some time"});
                
             }
                res.send({user,auth:token})
            })
            
        }else{
            res.send({result:'No user found'})
        }
    }else{
        res.send({result:'No user found'});
    }
})

app.post("/adminlogin", async (req, res) => {
    if(req.body.email && req.body.password){
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Request body is empty" });
        }
        const admin = await Admin.findOne(req.body).select('-password');
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ error: "Admin not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}else{
    res.status(404).json({ error: "Admin not found" });
}
});


app.post("/addhospitals",async(req,res)=>{
    let addHospital= new Hospital(req.body);
    let result= await addHospital.save();
    res.send(result);
   })

   app.get("/addhospitals/:id",async(req,res)=>{
    let result=await  AddHospital.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send({result:"No record found."})
    }
  })
   //   Update a hospital by ID
  app.put('/addhospitals/:id', async (req, res) => {
    try {
        const hospitalId = req.params.id;
        const { staffs,rooms ,beds, labs, doctors,image } = req.body;

        // Update the hospital document in the database
        const result = await AddHospital.findByIdAndUpdate(hospitalId, {
            staffs,
            rooms,
            labs,
            beds,
            doctors,
            image
        }, { new: true });

        if (!result) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        res.json(result);
    } catch (error) {
        console.error("Error updating hospital:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/hospitalsnames",async(req,res)=>{
    let hospitalnames= await HospitalName.find();
    if(hospitalnames.length>0){
        res.send(hospitalnames)
    }else{
        res.send({result:"No hospitals found"});
    }

});




app.listen(5000);

