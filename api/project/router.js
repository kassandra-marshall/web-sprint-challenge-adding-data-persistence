// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model')

const router = express.Router()

router.get('/',  (req, res, next) => {
    Projects.getAll()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const { project_name } = req.body;
    if (project_name === undefined){
        next({ status: 400, message: 'missing required information'})
    } else {
        Projects.postNew(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
    }
    
})

router.use((error, req, res, next) => { // eslint-disable-line
    res.status(500).json({ 
        customMessage: 'something went wrong inside project router',
        message: error.message,
        stack: error.stack })
})

module.exports = router