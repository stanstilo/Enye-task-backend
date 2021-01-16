const router = require('express').Router()

const getExchangeRates = require('../controllers/ratesController')

router.get('/rates', getExchangeRates )

module.exports = router