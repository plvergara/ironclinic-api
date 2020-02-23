const Patient = require('../models/patient.model')
const MedicalHistory = require('../models/medicalHistory.model')
const createError = require('http-errors')
const mongoose = require('mongoose')

module.exports.list = (req, res, next) => {
    Patient.find()
        .then(
            patients => res.status(200).json(patients)
        )
        .catch(next)
}

module.exports.get = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    Patient.findById(req.params.id)
        .then(
            patient => {
                if (!patient) {
                    throw createError('404', 'Patient not found')
                }
                res.status(201).json(patient)
            }
        )
        .catch(next)
}

module.exports.create = (req, res, next) => {
    const patient = new Patient(req.body)

    patient.save()
        .then(
            patient => res.status(201).json(patient)
        )
        .catch(next)
}

module.exports.update = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    Patient.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(
            patient => {
                if (!patient) {
                    throw createError('404', 'Patient not found')
                }
                res.status(200).json(patient)
            }
        )
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'Invalid Id')
    }
    MedicalHistory.findOneAndDelete({ patient: req.params.id })
        .then(
            medicalHistory => {
                if (!medicalHistory) {
                    Patient.findByIdAndDelete(req.params.id)
                        .then(
                            patient => {
                                if (!patient) {
                                    throw createError('404', 'Patient not found')
                                }
                                res.status(204).json
                            }
                        )
                        .catch(next)
                    throw createError('404', 'MedicalHistory not found')

                }
                throw createError('503', 'is not possible delete Patient')
            }
        )
}

module.exports.filter = (req, res, next) => {
    Patient.find(req.body)
        .then(
            patients => {
                if (!patients) {
                    throw createError('404', 'Patients or patient not found')
                }
                res.status(201).json(patients)
            }
        )
        .catch(next)
}