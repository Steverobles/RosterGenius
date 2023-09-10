const Roster = require('../../models/roster');
const Player = require('../../models/player');

exports.getRosterDetails = async (req, res) => {
  try {
    const { rosterId } = req.params;

    // Fetch the roster details
    const roster = await Roster.findById(rosterId).populate('selectedPlayers');
    if (!roster) {
      return res.status(404).json({ error: 'Roster not found' });
    }

    // Retrieve selected player IDs from the roster
    const selectedPlayerIds = roster.players;

    // Fetch the details of selected players
    const selectedPlayers = await Player.find({ _id: { $in: selectedPlayerIds } });

    // Return roster details along with selected player details
    res.json({ roster, selectedPlayers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching roster details' });
  }
};
