// build your `Task` model here
const db = require('../../data/dbConfig');

async function getAll() {
    // [{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]
    const tasksRows = await db('tasks as t')
        .leftJoin('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )
    return tasksRows
}

function postNew(task) {
    return db('tasks').insert({ ...task })
        .then(([id]) => {
            return db('tasks').where('task_id', id).first()
        })
        .catch(error => console.log({error}))
    // returns null for project_id
    // const tasksTable = db('tasks').insert({ ...task })
    //     .then(([id]) => {
    //         return db('tasks')
    //             .where('task_id', id).first()
    //     })
    //     .catch(error => console.log(error))
    // const projectsTable = db('projects').insert({ project_id: task.project_id })
    //     .then(([id]) => {
    //         return db('projects')
    //             .where('project_id', id)
    //     })
    //     .catch(error => console.log(error))
    // const result = {
    //     task_id: tasksTable.task_id,
    //     task_description: tasksTable.task_description,
    //     task_completed: tasksTable.task_completed,
    //     project_id: projectsTable.project_id
    // }
    // return result
    // {"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}
}

module.exports = {
    getAll,
    postNew
}