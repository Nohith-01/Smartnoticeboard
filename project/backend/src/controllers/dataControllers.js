const express = require('express');
const dataModel = require('../models/dataModel');
const sportsData = require('../models/sportsData');
const circulars = require('../models/circulars');
const placements = require('../models/placements');
const events = require('../models/events');
const others = require('../models/others');
const { default: mongoose } = require('mongoose');
const marquee = require('../models/marquee');
const moment = require('moment-timezone');



const getData = async (req, res) => {
  try {
    
    const utcTime = moment.utc();
    const istTime = utcTime.tz('Asia/Kolkata');
    const hour = istTime.hour();
    let data = [];
    console.log(hour)
    if (hour >= 8 && hour < 10) {
      data = await placements.find({});
    } else if (hour >= 10 && hour < 11) {
      data = await circulars.find({});
    } else if (hour >= 11 && hour < 12) {
      data = await others.find({});
    } else if (hour >= 12 && hour < 14) {
      data = await circulars.find({});
    } else if (hour >= 14 && hour < 16) {
      data = await events.find({});
    } else if (hour >= 16 && hour < 18) {
      data = await others.find({});
    } else {
      data = await dataModel.find({});
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getDelData = async(req,res) =>{
  const delData = await dataModel.find({});
  console.log(delData);
  res.json(delData);
  
}
//its not working
const deleteData = async (req,res)=>{
 
  const {id} = req.params.id;
  
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such workout"})
  }

  const workout = await sportsData.findOneAndDelete({_id: id})
  console.log(workout)

  if(!workout){
    return res.status(404).json({error:"No such workout"})
  }

  res.status(200).json(workout)


}

const getSportsData = async (req,res) =>{
  const sportData = await sportsData.find({});
  res.status(200).json(sportData);
}

const getCircularsData = async (req,res) =>{
  const circularData = await circulars.find({});
  res.status(200).json(circularData);
}


const getEventsData = async (req,res) =>{
  const eventsData = await events.find({});
  res.status(200).json(eventsData);
}



const getPlacementsData = async (req,res) =>{
  const placementsData = await placements.find({});
  res.status(200).json(placementsData);
}

const getOthersData = async (req,res) =>{
  const othersData = await others.find({});
  res.status(200).json(othersData);
}


const deleteSportsData = async(req,res) =>{
  const id = req.params.id; 
  console.log(id);
  const response = await sportsData.findByIdAndDelete(id);
  res.status(200).json("sprorts data deleted sucessfully");
}


const deleteCircularsData = async(req,res) =>{
  const id = req.params.id; 
  console.log(id);
  const response = await circulars.findByIdAndDelete(id);
  res.status(200).json("circulars data deleted sucessfully");
}


const deleteEventsData = async(req,res) =>{
  const id = req.params.id; 
  console.log(id);
  const response = await events.findByIdAndDelete(id);
  res.status(200).json("events data deleted sucessfully");
}


const deletePlacementsData = async(req,res) =>{
  const id = req.params.id; 
  console.log(id);
  const response = await placements.findByIdAndDelete(id);
  res.status(200).json("placements data deleted sucessfully");
}


const deleteOthersData = async(req,res) =>{
  const id = req.params.id; 
  console.log(id);
  const response = await others.findByIdAndDelete(id);
  res.status(200).json("others data deleted sucessfully");
}

const marqueeData = async (req,res) =>{
  const {first,second,endDate} = req.body;
  const resp = marquee.create({first,second,endDate});
  res.status(200).json("data upload succesful");

}

const getMarqueeData = async(req, res) => {
  try {
    const latestData = await marquee.find({}).sort({ createdAt: -1 }).limit(1);
    res.status(200).json(latestData);
  } catch (error) {
    res.status(500).json({ message: "Failed to get latest data" });
  }
};




const postData = async (req, res) => {
  const { category, text, secure_url, fileType, endDate  } = req.body;
  if (category === 'sports') {
    sportsData.create({ category, text, dispUrl: secure_url, fileType, endDate });
  } else if (category === 'circulars') {
    circulars.create({ category, text, dispUrl: secure_url, fileType, endDate  });
  } else if (category === 'placements') {
    placements.create({ category, text, dispUrl: secure_url, fileType, endDate  });
  } else if (category === 'events') {
    events.create({ category, text, dispUrl: secure_url, fileType, endDate  });
  } else if (category === 'others') {
    others.create({ category, text, dispUrl: secure_url, fileType, endDate  });
  }
  else{
    dataModel.create({category, text, dispUrl: secure_url, fileType, endDate });
  }
};

module.exports = {
  getData,
  postData,
  getDelData,
  deleteData,
  getSportsData,
  deleteSportsData,
  getCircularsData,
  getEventsData,
  getPlacementsData,
  getOthersData,
  deleteCircularsData,
  deleteEventsData,
  deletePlacementsData,
  deleteOthersData,
  marqueeData,
  getMarqueeData
};
