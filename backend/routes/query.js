const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const {createQuery} = require('../controllers/queries')
router.post('/',protectRoute,createQuery)
module.exports = router;