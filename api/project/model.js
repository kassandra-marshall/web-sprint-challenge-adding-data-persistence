// build your `Project` model here
const db = require('../../data/dbConfig');

async function getAll() {
    const projectsRows = await db('projects')
    const newArr = []
    projectsRows.forEach(row => {
        newArr.push({
            project_id: row.project_id,
            project_name: row.project_name,
            project_description: row.project_description,
            project_completed: !!row.project_completed
        })
    })
    return newArr
}

async function getById(id) {
    const project = await db('projects').where('project_id', id)
    const result = {
        project_id: project.project_id,
                project_name: project.project_name,
                project_description: project.project_description,
                project_completed: !!project.project_completed
    }
    return result
}

async function postNew(project) {
    const newProject = await db('projects').insert({ ...project})
        .then(([id]) => {
            return db('projects').where('project_id', id).first()
        })
        .catch(error => console.log(error))
        const result = {
            project_completed: !!newProject.project_completed,
            project_description: newProject.project_description,
            project_name: newProject.project_name
        }
    return (result)
}

module.exports = {
    getAll,
    getById,
    postNew
}