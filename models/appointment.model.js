const mongoose = require('mongoose')

const REASONS = ['a','b','c','d']
const DIAGNOSIS = ['a','b','c','d']
const TREATMENT = ['a','b','c','d']
const PRICE = ['a','b','c','d']

const appointmentSchema = new mongoose.Schema(
    {
        date:{
            type: Date,
            required: true
        },
        patient: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Patient',
            required: true,
            unique: true
        },
        professional: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Professional',
            required: true,
            unique: true
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