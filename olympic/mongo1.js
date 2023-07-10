const express = require('express')
var bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const db_name = 'Olympic';
const app = express()
const port = 2204
const nodemailer = require('nodemailer');
const alert = require('alert');


app.use(express.static("Asset"));

//static path:the entire public directory is made static
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})
app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/signup.html')

})
app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/login.html')

})
app.get('/fixture.html', (req, res) => {
    res.sendFile(__dirname + '/fixture.html')

})

app.get('/fifa-world-cup.json', (req, res) => {
    res.sendFile(__dirname + '/fifa-world-cup.json')

})
app.get('/fixture.js', (req, res) => {
    res.sendFile(__dirname + '/fixture.js')

})




app.use(bodyParser.urlencoded({
    extended: true
}));
const db = client.db(db_name)
app.post('/signup.html', function (req, res) {
   
    const email = req.body.email
    
    const name = req.body.name
    const pass = req.body.password
    const confrm_pass = req.body.confrm_passwd
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sdivyanshu5561@gmail.com',
            pass: 'rllqpkstuoejbugo'
        }
    })

    var mailoptions = {
        from: 'sdivyanshu5561@gmail.com',
        to: req.body.email,
        subject: 'Welcome to Geeks olympics ' ,
        html: "Welcome to geeks Olympics"


    };

    transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            // res.send("Thanks for registering you will recieve confirmation mail Shortly..");
            // res.alert("Confirmation mail will be sent to you Shortly!! Thankyou.")
            // res.redirect('/');
            console.log("success")
            res.redirect("/");
        }

    })

    var data = {
        
        "name":name,
        "email": email,
        "password": pass,
        "confrm_passwd": confrm_pass
    }
    db.collection('Signup').insertOne(data, function (err, collection) {
        if (err) console.log(err)
        else console.log("Record inserted")
    })

})


app.post('/login.html',async(req,res)=>{

    try{
        const login_user=req.body.email
        const password=req.body.password
        const useremail=await db.collection('Signup').findOne({email:login_user});
        // res.send(useremail);
        // console.log(useremail);
        if(useremail.password==password){
            console.log("Login Successfully");
        
 
            alert('Logged In Successfully')
            res.redirect("/");
            
        }
        else{
            console.log("Invalid Login Details")
            alert('Invalid Login Details')
        }
        
    
    }
    
    catch(error){
             console.log("Invalid login details");
              alert('Invalid Login Details')
             
    }
})



app.post('/contact.html', function (req, res) {
   
    const email = req.body.email
    
    const phone = req.body.number
    const name = req.body.name
    const message = req.body.msg
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sdivyanshu5561@gmail.com',
            pass: 'rllqpkstuoejbugo'
        }
    })

    var mailoptions = {
        from: 'sdivyanshu5561@gmail.com',
        to: req.body.email,
        subject: 'Welcome to Edureka ' ,
        html: "Thanks For Contacting Us!! Our Executive Will Contact You Within 24 hours <br> Thankyou!! <br> EDUREKA"


    };

    transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
        
            console.log("success")
            res.redirect("/");
        }

    })

    var data = {
        "Name": name,
        "email": email,
        "Phone number": phone,

        "Message": message
        
    }
    db.collection('Contact').insertOne(data, function (err, collection) {
        if (err) console.log(err)
        else console.log("Record inserted")
    })

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
}) 