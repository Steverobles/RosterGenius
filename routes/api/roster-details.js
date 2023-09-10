const express = require('express');
const router = express.Router();
const rosterDetailsController = require('../../controllers/api/roster-details');

router.get('/:rosterId/details', rosterDetailsController.getRosterDetails);

module.exports = router;
