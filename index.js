//Importing the module

const fs=require('fs');
const path=require("path");
const http=require('http');
const express=require('express');
const app=express();
const pug=require('pug');
const port=80;
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
//Express related stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())
// app.use(express.urlencoded());

//Mongoose related stuff

mongoose.connect('mongodb://localhost/contactdance',{useNewUrlParser: true
});
//making monggose schema
const contactSchema = new mongoose.Schema({
   name: String,
   name2: String,
   number: String,
   email: String,
   desc: String
 });
//  converting schema into model
 const Contact = mongoose.model('contact', contactSchema);
//  const bodyparser = require("body-parser");
 

//Pug related stuff
app.set('view engine','pug');  //Set the template engine as PUG
app.set('/views',path.join(__dirname,'views')); //Set the views directory

//Set the endpoints
app.get('/',(req,res)=>
{
   res.render('home.pug');
})
app.get('/contact',(req,res)=>
{
   res.render('contact.pug');
})
app.post('/contact', (req, res)=>{
   var myData = new Contact(req.body);
   myData.save().then(()=>{
   res.send("This item has been saved to the database")
   }).catch(()=>{
   res.status(400).send("item was not saved to the database")
})
})
//Listen on the ports
app.listen(port,(req,res)=>
{
    console.log(`The port is running successfully on ${port}`);
})
