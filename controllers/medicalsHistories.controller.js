const Patient = require('../models/patient.model')
const MedicalHistory = require('../models/medicalHistory.model')
const createError = require ('http-errors')
const mongoose = require('mongoose')

module.exports.get = (req,res,next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    MedicalHistory.findById(req.params.id)
        .then(
            medicalHistory => {
                if (!medicalHistory){
                    throw createError('404', 'Medical History not found') 
                }
                res.json(medicalHistory)
            }
        )
        .catch(next)
}

module.exports.create = (req,res,next) => {
    const medicalHistory = new MedicalHistory(req.body)

    medicalHistory.save()
            .then(
                medicalHistory => res.status(201).json(medicalHistory)
            )
        .catch(next)
}

module.exports.update = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    MedicalHistory.findByIdAndUpdate(req.params.id, req.body, { new:true })
        .then(
            medicalHistory => {
                if(!medicalHistory){
                    throw createError('404', 'Medical History not found') 
                }
                res.json(medicalHistory)
            }
        )
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    MedicalHistory.findByIdAndDelete(req.params.id)
        .then(
            medicalHistory => {
                if(!medicalHistory){
                    throw createError('404', 'MedicalHistory not found')
                }
                res.status(204).json
            }
        )
        .catch(next)
}
