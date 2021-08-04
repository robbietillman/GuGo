// JavaScript Document

const Timer = require('./models/timer')
const timerController = require('./timerController')

const timer_index = (req, res) => {
    Timer.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All timers', timers: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

const timer_details = (req, res) => {
    const id = req.params.id
    Timer.findById(id)
        .then(result => {
            res.render('details', {timer: result, title: 'Timer Details'})
        })
        .catch(err => {
            res.status(404).render('404', {title: 'Timer not found'})
        })
}

const timer_create_get = (req,res) => {
    res.render('add-alarm', {title: 'Create a new timer'})
}

const timer_create_post = (req,res) => {
    const timer = new Timer(req.body);

    timer.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}

const timer_delete = (req, res) => {
    const id = req.params.id

    Timer.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/timers'})
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    timer_index,
    timer_details,
    timer_create_get,
    timer_create_post,
    timer_delete
}