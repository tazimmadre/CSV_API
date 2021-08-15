const express=require('express');
const router=express.Router();
const csvController=require('../controllers/csvUpload');
const upload = require("../middleware/upload");

router.post('/uploadCsv',upload,csvController.postUpload);

router.post('/createCsvData',upload,csvController.createCsvData);

router.get('/readCsvData',csvController.readCsvData);

router.post('/updateCsvData',csvController.updateCsvData);

router.get('/deleteCsvData',csvController.deleteCsvData);

module.exports=router;