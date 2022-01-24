const express = require('express')
const router = express.Router()

const {
    ndtv, 
    indianExpress,
    businessStandard
    } = require('../controllers/newsControllerIndex')

router.get('/ndtv',ndtv)
router.get('/indian-express',indianExpress)
router.get('/business-standard', businessStandard)
module.exports = router