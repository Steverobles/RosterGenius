const mongoose = require ('mongoose')

const rosterSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true,
    },
    selectedPlayers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        },
    ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
})

const Roster = mongoose.model ('Roster', rosterSchema)

module.exports = Roster