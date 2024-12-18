const express = require('express')
const router = express.Router();
const {getUser} = require('../controllers/users');
const protectRoute = require('../utils/protectRoute');
router.get('/profile/:id',protectRoute,getUser)
module.exports = router;