// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model');

const router = express.Router()

router.get('/', (req, res, next) => {
    Tasks.getAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Tasks.postNew(req.body)
        .then(tasks => {
            res.status(201).json(tasks)
        })
        .catch(next)
})

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(500).json({ 
        customMessage: 'something went wrong inside task router',
        message: error.message,
        stack: error.stack })
})

module.exports = router