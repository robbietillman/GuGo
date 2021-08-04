
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timerSchema = new Schema({
	title: {
		type: String
	},
	time: {
		type: String,
		required: true
	},
	money: {
		type: String,
		required: true
	}
}, {timestamps: true})

const Timer = mongoose.model('Timer', timerSchema)
module.exports = Timer
