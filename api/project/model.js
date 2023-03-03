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
    // const reduced = projectsRows.forEach((acc, row) => {
    //     // returns an object but is still failing test
    //     const projects = {
    //         project_id: row.project_id,
    //         project_name: row.project_name,
    //         project_description: row.project_description,
    //         project_completed: !!row.project_completed
    //     }
    //     return projects
    // })
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
            // doesn't add project once I added conditional logic to router method
            return db('projects').where('project_id', id).first()
            // only returns boolean
            // const projectPost = db('projects').where('project_id', id).first()
            // const result = {
            //     project_id: projectPost.project_id,
            //     project_name: projectPost.project_name,
            //     project_description: projectPost.project_description,
            //     project_completed: !!projectPost.project_completed
            // }
            // return result
        })
        .catch(error => console.log(error))
    return newProject
}

module.exports = {
    getAll,
    getById,
    postNew
}