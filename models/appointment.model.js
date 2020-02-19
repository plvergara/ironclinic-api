const mongoose = require('mongoose')

const REASONS = ['a','b','c','d']
const DIAGNOSIS = ['a','b','c','d']
const TREATMENT = ['quiropodia','estudio de la pisada','silicona','cura papiloma','cirugía unguelar','cirugía papiloma','otro']
const PRICE = [15,20,22,30]

const appointmentSchema = new mongoose.Schema(
    {
        date:{
            type: Date,
            required: true
        },
        patient: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Patient',
            required: true
        },
        professional: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Professional',
            required: true
        },
        reasons: {
            type: String,
            enmun: REASONS
        },
        diagnosis: {
            type: String,
            enum: DIAGNOSIS
        },
        treatment: {
            type: String,
            enum: TREATMENT
        },
        price: {
            type: Number,
            enum: PRICE
        }
    },
    {
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				ret.id = doc._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		}
	}
)

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment