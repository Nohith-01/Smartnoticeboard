const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const dataSchema = Schema({
  category:{
    type:String,
    required:true
  },
  text:{
   type:String,
   
  },
  dispUrl:{
    type:String,
    required:true

  },
  fileType:{
    type:String,
    required:true
  }

},{timestamps :true})

module.exports = mongoose.model('others',dataSchema);