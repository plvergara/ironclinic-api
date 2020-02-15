const Professional = require('../models/professional.model')
const createError = require ('http-errors')
const mongoose = require('mongoose')


module.exports.list = (req,res,next) => {
    Professional.find()
        .then(
            professionals => res.json(professionals)
        )
        .catch(next)
}

module.exports.get = (req,res,next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    Professional.findById(req.params.id)
        .then(
            professional => {
                if (!professional){
                    throw createError('404', 'Professional not found') 
                }
                res.json(professional)
            }
        )
        .catch(next)
}

module.exports.create = (req,res,next) => {
    const professional = new Professional(req.body)

    professional.save()
        .then(
            professional => res.status(201).json(professional)
        )
        .catch(next)
}

module.exports.update = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    Professional.findByIdAndUpdate(req.params.id, req.body, { new:true })
        .then(
            professional => {
                if(!professional){
                    throw createError('404', 'Professional not found') 
                }
                res.json(professional)
            }
        )
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    Professional.findByIdAndDelete(req.params.id)
        .then(
            professional => {
                if(!professional){
                    throw createError('404', 'Professional not found')
                }
                res.status(204).json
            }
        )
        .catch(next)
}

module.exports.filter = (req, res, next) => {
    Professional.find(req.body)
    .then(
        professionals => {
            if (!professionals) {
                throw createError('404', 'Professionals or patient not found')
            }
            res.status(201).json(professionals)
        }
    )
    .catch(next)
}

module.exports.login = (req, res, next) => {
    const {cNumber, password} = req.body

    if (!cNumber || !password){
        throw createError('404', 'Password or number not found') 
    }

    Professional.findOne({cNumber})
        .then(professional => {
            if (!professional){
                throw createError('404', 'Password or number not found') 
            } else {
                console.log(professional.name)
                return professional.checkPassword(password)
                    .then(match => {
                        if (!match){
                            throw createError('404', 'Password or number not found') 
                        } else {
                            req.session.user = professional
                            req.session.genericSuccess = 'Welcome!'
                            res.json(professional)
                        }
                    })
            }
        })
        .catch(next)
}

module.exports.logout = (req, res) => {
    req.session.destroy()
    res.status(204).json
}
