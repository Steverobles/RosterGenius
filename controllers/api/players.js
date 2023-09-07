const Player = require('../../models/player')

module.exports = {
    index, 
    show
}

async function index(req,res) {
    const players = await Player.find({}).sort('name').populate('category').exec()
    players.sort((a,b) => a.category.sortOrder - b.category.sortOrder)
    res.json(players)
}

async function show(req,res) {
    const player = await Player.findById(req.params.id)
    res.json(player)
}