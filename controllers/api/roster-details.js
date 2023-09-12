const Roster = require('../../models/roster');
const Player = require('../../models/player');

exports.getRosterDetails = async (req, res) => {
  try {
    const { rosterId } = req.params;

    const roster = await Roster.findById(rosterId).populate('selectedPlayers');
    if (!roster) {
      return res.status(404).json({ error: 'Roster not found' });
    }

    const selectedPlayerIds = roster.players;

    const selectedPlayers = await Player.find({ _id: { $in: selectedPlayerIds } });

    res.json({ roster, selectedPlayers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching roster details' });
  }
};
