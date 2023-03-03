const db = require('../../data/dbConfig');

const verifyProject = async (req, res, next) => {
    try {
        const { project_id } = req.body;
        const project = await db('projects').where('project_id', project_id).first()
        if(!project) {
            next({ status:404, message: 'project not found' })
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
    
}

const verifyPost = async (req, res, next) => {
    try {
        const { task_description, project_id } = req.body
        if(task_description === undefined) {
            next({ status: 400, message: 'missing task description' })
        }if (project_id === undefined) {
            next({ status: 400, message: 'missing project id' })
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    verifyPost,
    verifyProject
}