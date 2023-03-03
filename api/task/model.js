// build your `Task` model here
const db = require('../../data/dbConfig');

async function getAll() {
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
    return result
}

async function postNew(task) {
    const newTask = await db('tasks').insert({ ...task })
        .then(([id]) => {
            return db('tasks').where('task_id', id).first()
        })
        .catch(error => console.log({error}))
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