const Patient = require('../models/patient.model')
const MedicalHistory = require('../models/medicalHistory.model')
const createError = require ('http-errors')
const mongoose = require('mongoose')

module.exports.get = (req,res,next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    MedicalHistory.findOne({patient:req.params.id})
    .populate('patient')
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
    Patient.findById(req.params.id)
    .then(patient => {
        if(!patient) throw createError('404', 'Patient not found')
        const medicalHistory = new MedicalHistory({
                ...req.body,
                patient: req.params.id
            })
        medicalHistory.save()
        .then(medicalHistory => {    
            Patient.aggregate([
                { $group: { _id: null, maxNumber: { $max: '$number' }}},
                { $project: { _id: 0, maxNumber: 1 }}
          ]).
          then(maxNum => {
                let max=maxNum[0].maxNumber
                patient.number = max + 1      
                patient.save()
                .then (() => {
                    res.status(201).json(medicalHistory)
                })
                .catch(next)
          })
          .catch(next)
            
        })
        .catch(next)
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    MedicalHistory.findOneAndUpdate({patient:req.params.id}, req.body, { new:true })
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

// module.exports.delete = (req, res, next) => {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         throw createError('404', 'Invalid Id')
//     }
//     MedicalHistory.findOneAndDelete({patient:req.params.id})
//         .then(
//             medicalHistory => {
//                 if(!medicalHistory){
//                     throw createError('404', 'MedicalHistory not found')
//                 }
//                 res.status(204).json
//             }
//         )
//         .catch(next)
// }
