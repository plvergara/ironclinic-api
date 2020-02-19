const mongoose = require('mongoose')
require('./medicalHistory.model')

RATE = ['Particular', 'Jubilado', 'Persona en Situación de Discapacidad']

const patientSchema = new mongoose.Schema(
    {
        name: {
            firstName: {
                type: String,
                required:true
            },
            lastName: {
                type: String,
                required:true
            }
        },
        phoneNumber: {
            type: Number,
            required: true,
            minlength: 9,
            maxlength: 13
        },
        birthDate: {
            type: Date
        },
        DNI: {
            type: String,
            unique: true
        },
        rate: {
            type: String,
            enum: RATE
        },
        profession: {
            type: String
        },
        address: {
            street: {
                type: String
            },
            locality: {
                type: String
            },
            province: {
                type: String
            },
            zipCode: {
                type: Number,
                length: 5
            },
            other: {
                type: String,
            },
            country: {
                type: String,
                default:  'Spain'
            }
        },
        dataProtection: {
            type: String
        }
        
    },
    {
		timestamps: true,
		toJSON: {
            virtuals: true,
			transform: (doc, ret) => {
				ret.id = doc._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		}
    }
)

patientSchema.virtual('medicalHistory', {
    ref: 'MedicalHistory',
    localField: 'id',
    foreignField: 'patient',
    justOne: false,
  });

const Patient = new mongoose.model('Patient', patientSchema)
module.exports = Patient