const express = require('express')
const router = express.Router()
const Roster = require('../../models/roster')


router.get('/', async (req, res) => {
    try {
      const rosters = await Roster.find(); 
      res.json(rosters);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { userId, selectedPlayerIds } = req.body;
      const roster = await Roster.create({ userId, selectedPlayerIds });
      res.status(201).json(roster);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  module.exports = router
