const fs=require('fs');
const csv = require("fast-csv");
const path=require('path');
const fileHelper=require('../util/file');

const Datamodel=require('../models/csvData');

exports.postUpload= async (req,res,next)=>{
    try {
        if (req.file == undefined) {
          return res.status(400).send("Please upload a CSV file!");
        }
    
        let rowdata= [];
        let localpath=path.join(__dirname,"../", '/assets/') + req.file.filename;
        fs.createReadStream(localpath)
          .pipe(csv.parse({ headers: true }))
          .on("error", (error) => {
            throw error;
          })
          .on("data", (row) => {
            rowdata.push(row);
          })
          .on("end", () => {
            Datamodel.insertMany(rowdata)
              .then(()=>{
                
                res.status(200).send({
                  message:"Uploaded the file successfully: " + req.file.originalname
                });
                fileHelper.deletefile(localpath);
              })
              .catch((error) => {
                res.status(500).send({
                  message: "Fail to import data into database!",
                  error: error.message,
                });
              });
          });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Could not upload the file: " + req.file.originalname,
        });
      }
      
};

exports.createCsvData=(req,res,next)=>{
  const newData=new Datamodel();
  newData.Username=req.body.Username;
  newData.Identifier=req.body.Identifier;
  newData.First_name=req.body.First_name;
  newData.Last_name=req.body.Last_name;
  newData.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating data.",
      });
    });
};

exports.readCsvData=(req,res,next)=>{
  Datamodel.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.updateCsvData=(req,res,next)=>{
  const namefilter=req.body.name;
  Datamodel.findOne({Username:namefilter})
  .then(newData =>{
    if(!newData){
      const error=new Error('Data with that id not found');
      error.statusCode=401;
      throw error;
    }
    console.log(newData);
    newData.Username=req.body.updatedvalue;
    return newData.save()
  })
    .then((data) => {
      res.send({data,message:'Updated Successfully'});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating data.",
      });
    });
};

exports.deleteCsvData=(req,res,next)=>{
  Datamodel.deleteMany()
    .then((data) => {
      res.send({message:"Delete Operation Sucessful"});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleteing data.",
      });
    });
};