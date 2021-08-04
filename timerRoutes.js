// JavaScript Document

const express = require('express')
const timerController = require('./timerController')


const router = express.Router()

router.get('/', timerController.timer_index)
router.post('/', timerController.timer_create_post)
router.get('/add-alarm', timerController.timer_create_get)
router.delete('/:id', timerController.timer_details)
router.delete('/:id', timerController.timer_delete)

module.exports = router;