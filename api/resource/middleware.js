const db = require('../../data/dbConfig')
// const Resource = require('./model')

const verifyName = async (req, res, next) => {
    try {
        const existing = await db('resources').where('resource_name', req.body.resource_name).first()
        if(existing) {
            next({ status: 400, message: 'name already exists' })
        } else {
            next()
        }
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    verifyName
}

