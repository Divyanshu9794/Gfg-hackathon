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
    res.sendFile(__dirname + '/login.html')

})
app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/signup.html')

})
app.get('/badmintons.html', (req, res) => {
    res.sendFile(__dirname + '/badmintons.html')

})
app.get('/softball.html', (req, res) => {
    res.sendFile(__dirname + '/softball.html')

})

app.get('/archerys.html', (req, res) => {
    res.sendFile(__dirname + '/archerys.html')

})
app.get('/atheletes.html', (req, res) => {
    res.sendFile(__dirname + '/atheletes.html')

})
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html')

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

app.get('/ticket_generator.html', (req, res) => {
    res.sendFile(__dirname + '/ticket_generator.html')

})
app.get('/payment.html', (req, res) => {
    res.sendFile(__dirname + '/payment.html')

})
app.get('/archery.html', (req, res) => {
    res.sendFile(__dirname + '/archery.html')

})
app.get('/atheletes.html', (req, res) => {
    res.sendFile(__dirname + '/atheletes.html')

})
app.get('/badminton.html', (req, res) => {
    res.sendFile(__dirname + '/badminton.html')

})
app.get('/boxing.html', (req, res) => {
    res.sendFile(__dirname + '/boxing.html')

})
app.get('/hockey.html', (req, res) => {
    res.sendFile(__dirname + '/hockey.html')

})
app.get('/tennis.html', (req, res) => {
    res.sendFile(__dirname + '/tennis.html')

})
app.get('/weightlifting.html', (req, res) => {
    res.sendFile(__dirname + '/weightlifting.html')

})
app.get('/wrestling.html', (req, res) => {
    res.sendFile(__dirname + '/wrestling.html')

})
app.get('/predictedresult.html', (req, res) => {
    res.sendFile(__dirname + '/predictedresult.html')

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
        subject: ' Welcome to the Olympic Website Community!' ,
        html: "Dear User,<br>Congratulations! You have successfully signed up for our Olympic Website.<br> Welcome to our vibrant community where you can dive into the world of sports and stay updated on all the thrilling Olympic events. Start exploring and enjoy the journey with us!<br><br>Best regards,<br><br> Olympic Website Community"


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
            res.redirect("/index.html");
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
app.post('/payment.html', (req, res) => {
    // Extract the form data
    const name = req.body.name
    const email = req.body.email
    
  
    // Generate a random room number
    const roomNumber = Math.floor(Math.random() * 100) + 1;
  
    // Create the email message
    const message = `
      Dear ${name},\n\n Congratulations! Your payment for the Olympic Stadium seat booking has been successfully processed. Your reservation is confirmed, and you're all set to enjoy the thrilling events and  Your seat number is ${roomNumber}.Thank you for choosing us, and we look forward to hosting you at the Olympics!

Best regards,
Olympics Event Organization;
`
  
    // Set up the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Enter the email service you are using (e.g., Gmail)
      auth: {
          user: 'sdivyanshu5561@gmail.com',
          pass: 'rllqpkstuoejbugo'
      }
    });
  
    // Set up the email options
    const mailOptions = {
      from: 'sdivyanshu5561@gmail.com',
      to: email,
      subject: 'Successful Payment Confirmation for Your Olympic Stadium Seat Booking',
      text: message
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log("booking Successfully");
        
 
            alert('booked Successfully');
            res.redirect("/index.html");
      }
    });
  });


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
            res.redirect("/index.html");
            
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






app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
}) 