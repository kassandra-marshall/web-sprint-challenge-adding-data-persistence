// build your `/api/resources` router here
const express = require('express');
const Resources = require('./model');

const router = express.Router()

router.get('/', (req, res, next) => {
    Resources.getAll()
        .then(resources => {
            res.json(resources)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Resources.postNew(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(500).json({ 
        customMessage: 'something went wrong inside resource router',
        message: error.message,
        stack: error.stack })
})

module.exports = router