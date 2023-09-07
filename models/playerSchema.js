const Schema = require('mongoose').Schema

const playerSchema = new Schema({
    name: {type:String, required:true},
    category: {type:Schema.Types.ObjectId, ref:'Category'},
    tier: { type: Number, required: true}
}, {
    timestamps:true
})

module.exports = playerSchema