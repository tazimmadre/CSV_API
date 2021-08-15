const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    Username:{
        type:String
    },
    Identifier:{
        type:String
    },
    First_name:{
        type:String
    },
    Last_name:{
        type:String
    }
});

module.exports=mongoose.model('CSV_Data',productSchema);