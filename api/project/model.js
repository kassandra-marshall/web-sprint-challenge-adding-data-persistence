// build your `Project` model here
const db = require('../../data/dbConfig');

async function getAll() {
    const projectsRows = await db('projects')
    return projectsRows
}

function postNew(project) {
    return db('projects').insert({ ...project})
        .then(([id]) => {
            return db('projects').where('project_id', id).first()
        })
        .catch(error => console.log(error))
}

module.exports = {
    getAll,
    postNew
}