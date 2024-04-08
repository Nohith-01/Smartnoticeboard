const express = require('express')
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,logoutAdmin} = require('../controllers/admin.controller'); 
const { verifyJWT } = require('../middleware/auth.middleware');
  router.post('/register',registerAdmin)
  router.post('/login',loginAdmin)
  router.post('/logout',verifyJWT,logoutAdmin)
  
  module.exports = router;