const Appointment = require('../models/appointment.model')
const createError = require('http-errors')
const mongoose = require('mongoose')
const Patient = require('../models/patient.model')
const Professional = require('../models/professional.model')

module.exports.list = (req, res, next) => {
    Appointment.find()
        .then(
            appointments => res.status(200).json(appointments)
        )
        .catch(next)
}

module.exports.get = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'invalid Id')
    }
    Appointment.findById(req.params.id)
        .then(
            appointment => {
                if (!appointment) {
                    throw createError('404', 'Appointment not found')
                }
                res.status(200).json(appointment)
            }
            
        )
        .catch(next)
}

module.exports.filterProfessional = (req, res, next) => {
    Appointment.find(req.params.professional)
    .populate(professional)
        .then(
            appointments => {
                if (!appointments) {
                    throw createError('404', 'Appointments not found')
                }
                res.status(200).json(appointments)
            }
        )
        .catch(next)
}

module.exports.filterPatient = (req, res, next) => {
    Appointment.find(req.params.patient)
    .populate(patient)
        .then(
            appointments => {
                if (!appointments) {
                    throw createError('404', 'Appointments not found')
                }
                res.status(200).json(appointments)
            }
        )
        .catch(next)
}

module.exports.create = (req, res, next) => {
    const appointment = new Appointment(req.body)
    Patient.find(req.body.patient)
        .then(patient => {
            if(!patient) throw createError('404', 'Patient not found')
        })
        .catch(next)
    Professional.find(req.body.professional)
        .then(professional => {
            if(!professional) throw createError('404', 'Patient not found')
        })
        .catch(next)
    appointment.save()
        .then(
            appointment => res.status(201).json(appointment)
        )
        .catch(next)
}

module.exports.update = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'invalid Id')
    }
    Appointment.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(
            appointment => {
                if (!appointment) {
                    throw createError("404","appointment not found")
                }
                res.status(200).json(appointment)
            }
        )
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError('404', 'invalid id')
    }
    Appointment.findByIdAndDelete(req.params.id)
        .then(
            appointment => {
                if (!appointment) {
                    throw createError('404', 'Appointment not found')
                }
                res.status(204).json()
            }
        )
        .catch(next)
}

