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

// module.exports.list = (req, res, next) => {
//     const criteria = req.query.search

//         ? { $text: { $search: req.query.search } }

//         : {}
//     console.log(criteria)
//     Appointment.find(criteria)
//         .sort({ date: -1 })
//         .populate('patient')
//         .populate('professional')
//         .then(
//             appointments => {
//                 if (appointments.length === 0) {
//                     throw createError('404', 'Appointments not found')
//                 }
//                 res.status(200).json(appointments)
//             }
//         )
//         .catch(next)
// }
module.exports.filterProfessional = (req, res, next) => {
    Appointment.find({ professional: req.params.id })
        .populate('patient')
        .populate('professional')
        .then(
            appointments => {
                if (appointments.length === 0) {
                    throw createError('404', 'Appointments not found')
                }
                res.status(200).json(appointments)
            }
        )
        .catch(next)
}

module.exports.filterPatient = (req, res, next) => {

    Appointment.find({ patient: req.query.search })
        .populate('patient')
        .populate('professional')
        .then(
            appointments => {
                if (appointments.length === 0) {
                    throw createError('404', 'Appointments not found')
                }
                res.status(200).json(appointments)
            }
        )
        .catch(next)
}

module.exports.filterDate = (req, res, next) => {
    let startHour = 'T00:00:00.000Z'
    let endHour = 'T23:59:59.000Z'
    if (req.query.hour) {
        startHour = `T${req.query.hour}`
        endHour = `T${req.query.hour}`
    }
    let start = new Date(req.query.date + startHour)
    let end = new Date(req.query.date + endHour)
    let query = { date: { $gte: start, $lte: end } }
    console.log(query)
    console.log(new Date())
    Appointment.find(query).sort({ date: -1 })
        .populate('patient')
        .populate('professional')
        .then(
            appointments => {
                if (appointments.length === 0) {
                    throw createError('404', 'Appointments not found')
                }
                res.status(200).json(appointments)
            }
        )
        .catch(next)
}

module.exports.create = (req, res, next) => {
    Patient.findOne(req.body.patient)
        .then(patient => {
            if (!patient) throw createError('404', 'Patient not found')
            Professional.findOne(req.body.professional)
                .then(professional => {
                    if (!professional) throw createError('404', 'Professional not found')
                    res.status(201)
                    const appointment = new Appointment(
                        {
                            date: `${req.body.date}Z`,
                            patient: patient.id,
                            professional: professional.id
                        }
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
    Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(
            appointment => {
                if (!appointment) {
                    throw createError("404", "appointment not found")
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

