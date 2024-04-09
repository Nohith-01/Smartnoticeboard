const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marqueeSchema = new Schema({
  first:{
    type:String,
    required:true
  },
  second:{
    type:String,
    required:true,
  },
  endDate:{
    type:String,
    required:true
  }
},{timestamps : true})

module.exports = mongoose.model('marquee',marqueeSchema);