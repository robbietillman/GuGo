// JavaScript Document

const express = require('express')
const { response } = require('express')
const { render } = require('ejs')
const mongoose = require('mongoose')
const timerRoutes = require('./timerRoutes')
const Timer = require('./models/timer')
const { blog_create_get } = require('./timerController')
const keys = require('./llaves/llavesDoc')

const app = express()

// connect to MongoDB
const dbURI = 'mongodb+srv://' + keys.username +':'+keys.hidden+'@cluster0.yu95q.mongodb.net/GuGo?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then((result) => app.listen(5000))
	.catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true})) // used for POSTing form data to a page

app.get('/', (req,res) => {
	res.redirect('/timers')
	
})

app.get('/add-timer', (req, res) => {
	const timer = new Timer({
		title: 'Alarm 3',
		time: '7:00 p.m.',
		money: '$1'
	})
	timer.save()
		.then((result) => {
			res.send(result)
		})
		.catch ((err) => {
			console.log(err)
		})
})

app.post('/timers', (req, res) => {
	const timer = new Timer(req.body)

	timer.save()
		.then((result) => {
			res.redirect('/timers')
		})
		.catch((err) => {
			console.log(err)
		})
})

app.get('/timers/:id', (req, res) => {
	const id = req.params.id
	console.log(id)

	Timer.findById(id)
		.then(result => {
			res.render('details', {timer: result, title: 'Timer Details'})
		})
		.catch(err => {
			console.log(err)
		})
	
})



app.get('/add-alarm', (req,res) => {
	res.render('add-alarm')
})
// Timer routes
app.use('/timers', timerRoutes)

app.post('/timers', (req, res) => {
	console.log(req.body)
})
