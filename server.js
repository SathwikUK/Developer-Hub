const express = require('express');
const mongoose = require('mongoose');
const devuser=require('./devuserModel');
const jwt=require('jsonwebtoken')
const middleware = require('./middleware')
const review=require('./reviewmodel')
const cors=require('cors')
const app = express();

// Ensure the password is URL-encoded if it contains special characters
const encodedPassword = encodeURIComponent('Sath@projects123');
const dbURI = `mongodb+srv://SathwikUK:${encodedPassword}@projects.7zbjzgv.mongodb.net/projects?retryWrites=true&w=majority`;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection successful');
}).catch((err) => {
    console.error('Database connection error:', err.message);
});
app.use(express.json());
app.use(cors({origin:"*"}))

app.get('/', (req, res) => {
    return res.send('Hello world!');
});

app.post('/register', async (req,res)=>{
    try{
        const {fullname,email,mobile,skill,password,confirmPassword}=req.body;
        const exist = await devuser.findOne({email})
        if(exist){
            return res.status(400).send("User Already Registered")
        }
        if(password!=confirmPassword){
            return res.status(403).send("password doesn't match")
        }
        let newuser= new devuser({
            fullname,email,mobile,skill,password,confirmPassword
        })
        newuser.save();
        return res.status(200).send('Registered Successfully')


    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.post('/login', async (req,res)=>{
    try{
        const {email,password}=req.body
        const exist = await devuser.findOne({email})
        if(!exist){
            return res.status(400).send("no user found")
        }
        if(exist.password != password){
            return res.status(400).send("Invalid password")
        }
        let payload = {
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},(err,token)=>{
            if(err) throw err
            return res.json({token})
        })

    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
})


app.get('/allprofiles',middleware,async (req,res)=>{
    try{
        const allprofiles=await devuser.find();
        return res.json(allprofiles)
 
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let user=await devuser.findById(req.user.id)
        return res.json(user)


    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.post('/addreview',middleware,async(req,res)=>{
    try{
        const {taskworker,rating}=req.body
        const exist = await devuser.findById(req.user.id)
        let newreview = new review({
            taskprovider:exist.fullname,
            taskworker,rating

        }
            
        )
        newreview.save()
        return res.status(200).send('Review added Successfully')

    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.get('/myreview',middleware,async(req,res)=>{
    try{
        let allreviews= await review.find()
        let myreviews=allreviews.filter(review => review.taskworker === req.user.id.toString())
        return res.status(200).json(myreviews)


    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
})



app.listen(5000, () => {
    console.log('Server running on port 5000');
});
