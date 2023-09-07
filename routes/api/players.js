const express = require('express')
const router = express.Router()
const PlayerCtrl = require('../../controllers/api/players')

router.get('/', PlayerCtrl.index)
router.get('/:id',PlayerCtrl.show)

module.exports = router