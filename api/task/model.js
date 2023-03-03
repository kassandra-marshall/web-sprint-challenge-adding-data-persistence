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
        const result = []
        tasksRows.forEach(row => {
            if(row.task_id){
                result.push({
                   task_completed: !!row.task_completed,
                   task_description: row.task_description,
                   task_notes: row.task_notes,
                   task_id: row.task_id,
                   project_name: row.project_name,
                   project_description: row.project_description 
                })
            }
        });

        // const result ={
        //     task_completed: !!tasksRows.task_completed,
        //     task_description: tasksRows.task_description,
        //     task_notes: tasksRows.task_notes
        // }
    return result
}

async function postNew(task) {
    const newTask = await db('tasks').insert({ ...task })
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
    const result = {
        task_completed: !!newTask.task_completed,
        task_description: newTask.task_description,
        task_notes: newTask.task_notes
    }
    return result
}

module.exports = {
    getAll,
    postNew
}