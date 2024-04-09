const express = require('express')

const router = express.Router();
const {getData,postData,getDelData, deleteData, getSportsData, deleteSportsData, getOthersData, getPlacementsData, getEventsData, getCircularsData, deleteOthersData, deletePlacementsData, deleteEventsData, deleteCircularsData, marqueeData, getMarqueeData} = require('../controllers/dataControllers');



router.get('/vignan',getData)
router.get('/delete/sports',getSportsData)
router.get('/delete/circulars',getCircularsData)
router.get('/delete/events',getEventsData)
router.get('/delete/placements',getPlacementsData)
router.get('/delete/others',  getOthersData)
router.get('/upload',getMarqueeData)
router.delete('/delete/sports/:id',deleteSportsData)
router.delete('/delete/circulars/:id',deleteCircularsData)
router.delete('/delete/events/:id',deleteEventsData)
router.delete('/delete/placements/:id',deletePlacementsData)
router.delete('/delete/others/:id',deleteOthersData)
router.post('/upload',marqueeData)
router.post('/vignan/upload',postData);

module.exports = router;