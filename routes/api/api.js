const express = require('express');
const router = express.Router();
const Roster = require('../../models/roster'); // Adjust the path as needed

// Route to get all rosters
router.get('/', async (req, res) => {
  try {
    const rosters = await Roster.find();
    res.json(rosters);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching rosters.' });
  }
});

// Route to get roster details by ID
router.get('/:id', async (req, res) => {
  try {
    const roster = await Roster.findById(req.params.id);
    if (!roster) {
      return res.status(404).json({ error: 'Roster not found.' });
    }
    // Return the roster details
    res.json(roster);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching roster details.' });
  }
});

module.exports = router;
