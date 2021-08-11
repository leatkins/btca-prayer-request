const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const prayerRequest = require('./models/request');
require('dotenv').config();
const bodyParser = require('body-parser'); 

app.set('view engine' , 'ejs'); 



const database = process.env.DATABASE_CONNECTION_STRING; 
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(8000, () => {console.log("The Express server is listening on Port: 8000")}))
.catch((err) => console.log(err)); 

app.use((req, res, next) => {
    console.log("host: ", req.hostname); 
    console.log('method: ',  req.method); 
    next(); 
});

app.use(express.urlencoded({extended: true})); 

app.post('/add-request', (req, res) => {
    console.log(req.body); 
    const request = new prayerRequest({ 
        name: req.body.name, 
        request: req.body.request
    }); 
    request.save()
        .then((result) =>{
            res.redirect('/thank-you')
            //res.render('thank-you', {prayerRequest:result})
            //res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-request', (req, res) => {
    prayerRequest.find()
    .then((result) =>{
        res.render(prayer-request) 
        //res.send(result)
    })
    .catch((err) =>{
        console.log(err);
    }); 
})

app.get('/', (req, res) => {
    prayerRequest.find().sort({createdAt: -1})
    .then((result) =>{
    res.render('prayer-request', {prayerRequest:result})
    })
    .catch((err) =>{
        console.log(err); 
    }); 
}); 

app.get('/thank-you', (req, res) => {
    prayerRequest.find().sort({createdAt: -1})
    .then((result) =>{
    res.render('thank-you', {prayerRequest:result})
    })
    .catch((err) =>{
        console.log(err); 
    }); 
});