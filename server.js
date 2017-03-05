const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
var app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials')
// path to folder we want to serve
app.set('view_engine','hbs')
app.use((req,res,next)=>{
  var now  = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`
  fs.appendFile('server.log',log + '\n', (e)=> {if (e){
    console.log('unable to append server to log')
  }});
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     welcomeMessage: 'Please bear with us',
//   });
// });

app.use(express.static(__dirname +'/public'));


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    err: 'unable to handle request'
  });
});

app.listen(port, () => {console.log(`server is up on port ${port}`);});
