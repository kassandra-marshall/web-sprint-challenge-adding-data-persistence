// build your `Resource` model here
const db = require('../../data/dbConfig');

async function getAll() {
    const resourcesRows = await db('resources')
    return resourcesRows
}

function postNew(resource) {
    return db('resources').insert({ ...resource})
        .then(([id]) => {
            return db('resources').where('resource_id', id).first()
        })
        .catch(error => console.log(error))
}

module.exports = {
    getAll,
    postNew
}