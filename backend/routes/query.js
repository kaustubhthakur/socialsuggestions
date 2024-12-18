const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const {createQuery,getQueries} = require('../controllers/queries')
router.post('/create',protectRoute,createQuery)
router.get('/',getQueries);
module.exports = router;