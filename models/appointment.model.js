const mongoose = require('mongoose')

const TREATMENT = ['quiropodia','estudio de la pisada','estudio de la pisada con plantillas','órtesis de silicona','cura papiloma','cirugía ungueal','cirugía papiloma','otro']
const PRICE = [15,20,22,30,50,75,130,150,180,320,540]

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
            type: String
        },
        diagnosis: {
            type: String
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