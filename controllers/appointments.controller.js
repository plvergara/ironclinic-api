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

// module.exports.filter = (req, res, next) => {
//     const criteria = req.query.search

//         ? { $text: { $search: req.query.search } }

//         : {}
//         console.log(Object.keys(req.query))
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
    const criteria = req.query.search

        ? { $text: { $search: req.query.search } }

        : {}
    Professional.find(criteria)
        .then(professionals => {
            Appointment.find({ professional: professionals })
                .sort({ date: 0 })
                .populate('patient')
                .populate('professional')
                .then(
                    appointments => {
                        res.status(200).json(appointments)
                    }
                )
                .catch(next)
        })
        .catch('404', 'Appointments not found')
}

module.exports.filterPatient = (req, res, next) => {
    const score = { score: { $meta: 'textScore' } }
    const criteria = req.query.search

        ? { $text: { $search: req.query.search } }

        : {}
    Patient.find(criteria, score)
        .then(patients => {
            Appointment.find({ patient: patients })
                .populate('patient')
                .populate('professional')
                .then(
                    appointments => {
                        res.status(200).json(appointments)
                    }
                )
                .catch(next)
        })
        .catch('404', 'Appointments not found')
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
    Appointment.find(query).sort({ date: 0 })
        .populate('patient')
        .populate('professional')
        .then(
            appointments => {
                res.status(200).json(appointments)
            }
        )
        .catch(next)
}

module.exports.create = (req, res, next) => {
    const appointment = new Appointment(
        {
            date: new Date(`${req.body.date}Z`),
            startHour: new Date(`${req.body.date}T${req.body.startHour}Z`),
            endHour: new Date(`${req.body.date}T${req.body.endHour}Z`),
            treatment: req.body.treatment,
            patient: req.body.patient,
            professional: req.body.professional
        }
    )

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

