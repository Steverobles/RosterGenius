const Roster = require ('../../models/roster')
const Player = require('../../models/player')

exports.getAllRosters = async (req, res) => {
    try {
        const rosters = await Roster.find({user: req.user._id })
        res.json(rosters)
    } catch (error) {
        res.status(500).json({})
    }
}

exports.createRoster = async (req, res) => {
    try {
        const { name, selectedPlayers } = req.body;

        const newRoster = new Roster({
            user: req.user._id,
            name,
            selectedPlayers, 
        });

        await newRoster.save();
        res.json(newRoster);

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};



exports.getRosterById = async (req, res) => {
    try {
      const roster = await Roster.findById(req.params.id);
      if (!roster) {
        return res.status(404).json({});
      }
  
      const selectedPlayers = await Player.find({ _id: { $in: roster.selectedPlayers } });
  
      const rosterDetails = {
        _id: roster._id,
        name: roster.name,
        selectedPlayers: selectedPlayers,
      };
  
      res.json(rosterDetails);
    } catch (error) {
      res.status(500).json({});
    }
  };
  
  exports.updateRosterById = async (req, res) => {
    try {
      const updatedRoster = await Roster.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRoster) {
        return res.status(404).json({});
      }
      res.json(updatedRoster);
    } catch (error) {
      res.status(500).json({});
    }
  };

  exports.deleteRosterById = async (req, res) => {
    try {
      const deletedRoster = await Roster.findByIdAndRemove(req.params.id);
      if (!deletedRoster) {
        return res.status(404).json({  });
      }
      res.json({ message: 'Roster deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the roster.' });
    }
  };