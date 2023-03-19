const express = require('express');
const router = express.Router();
const land_controller = require("../controllers/landController");

/* GET home page. */
router.get('/', land_controller.index);

/* GET land parcel page*/
router.get('/land', land_controller.land_parcels);

module.exports = router;
