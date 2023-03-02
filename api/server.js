// build your server here and require it from index.js
const express = require('express');
const server = express();
const projectsRouter = require('../api/project/router')
const resourcesRouter = require('../api/resource/router')

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);

server.use('*', (req, res, next) => { // eslint-disable-line
    res.json({ api: 'up' })
})

server.use((error, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
}); 

module.exports = server;