const express=require('express');
const mongoose=require('mongoose');
const uri = "mongodb+srv://Tazim:qwertyuiop1234567890@cluster0.oxjfe.mongodb.net/CSV_API";


const app=express();

const routesCsv=require('./routes/csvroutes');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(routesCsv);
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(afterconnecting=>{
  app.listen(4200,()=>{console.log('Server Up and Running')});
}).catch(err=>{console.log(err)});

