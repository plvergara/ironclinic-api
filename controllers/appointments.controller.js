const Appointment = require('../models/appointment.model')
const createError = require('http-errors')
const mongoose = require('mongoose')
const Patient = require('../models/patient.model')
const Professional = require('../models/professional.model')

module.exports.list = (req, res, next) => {
    Appointment.find()
    .populate('patient')
    .populate('professional')
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
    .populate('patient')
    .populate('professional')
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
    Appointment.find({profesionnal:req.params.professional})
    .populate('professional')
    .populate('patient')
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
    Appointment.find({patient:req.params.patient})
    .populate('patient')
    .populate('professional')
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

module.exports.filterDate = (req, res, next) => {
    Appointment.find({date:req.params.date})
    .populate('patient')
    .populate('professional')
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
    const paramsPatient = {DNI:req.body.patient}

    Patient.findOne(req.body.patient)
        .then(patient => {
            if(!patient) throw createError('404', 'Patient not found')
            
            const patientId = patient.id
            Professional.findOne(req.body.professional)
            .then(professional => {
                if(!professional) throw createError('404', 'Professional not found')
                const professionalId = professional.id
                console.log(patientId, professionalId)
                res.status(201)
                const appointment = new Appointment(
                    {date:req.body.date,
                    patient:patientId,
                    professional:professionalId,
                    reasons:req.body.reasons,
                    diagnosis:req.body.diagnosis,
                    treatment:req.body.treatment,
                    price:req.body.price}
                    )
                
                appointment.save()
                .then(
                    appointment => res.status(201).json(appointment)
                )
                .catch(next)
            })
            .catch(next)
        })
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

