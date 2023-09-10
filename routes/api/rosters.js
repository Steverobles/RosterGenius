const express = require('express')
const router = express.Router()
const rostersControllers = require('../../controllers/api/rosters')

router.get('/', rostersControllers.getAllRosters)
router.post('/', rostersControllers.createRoster)
router.get('/:id', rostersControllers.getRosterById)
router.put('/:id', rostersControllers.updateRosterById)
router.delete('/:id', rostersControllers.deleteRosterById)

module.exports = router