// build your `/api/resources` router here
const express = require('express');
const Resources = require('./model');
const { verifyName } = require('./middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Resources.getAll()
        .then(resources => {
            res.json(resources)
        })
        .catch(next)
})

router.post('/', verifyName, (req, res, next) => {
    // const { resource_name } = req.body
    // const verifyName = Resources.checkName(resource_name)
    // if (verifyName === undefined){
        Resources.postNew(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
    // } else {
    //     next({ status:400, message: 'resource name already exists' })
    // }
    
})

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(500).json({ 
        customMessage: 'something went wrong inside resource router',
        message: error.message,
        stack: error.stack })
})

module.exports = router