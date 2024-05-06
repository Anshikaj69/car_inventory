
const express = require('express');
const router = express.Router()

const { getCars, createCar, updateCarPurchase, updateCarSales} = require('../controllers/carController')


router.route('/').get( getCars ).post( createCar)

router.route('/purchase/:car_id').put( updateCarPurchase )

router.route('/sell/:car_id').put( updateCarSales )


module.exports = router

