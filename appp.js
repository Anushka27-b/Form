const express = require("express")
const path = require("path")

const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/Register', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

//define mongoose schema
const regSchema = new mongoose.Schema({
    name: String,
    
    email: String,
  });
  const Form = mongoose.model('Form', regSchema);

//Express stuff

app.use('/static',express.static('static'))
app.use(express.urlencoded())

//Pug stuff
app.set('view engine','pug')//set template
app.set('views',path.join(__dirname,'views'))//set view directory

app.get('/' ,(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
})
app.get('/contact' ,(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
})
app.post('/contact' ,(req,res)=>{

   var myData = new Form(req.body);
   myData.save().then(()=>{
       res.send("This item has been saved to database");
   }).catch(()=>{
       res.status(400).send("Item was not saved to database")
   })
    // res.status(200).render('contact.pug')
})
app.listen(port,()=>{
    console.log(`the port has started successfully on port ${port}`)
})