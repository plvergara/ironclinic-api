const mongoose = require('mongoose')
require('./medicalHistory.model')

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
        birthDate: {
            type: Date,
            required: true
        },
        DNI: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: Number,
            required: true,
            minlength: 9,
            maxlength: 13
        },
        address: {
            street: {
                type: String,
                required: true
            },
            locality: {
                type: String,
                required: true
            },
            province: {
                type: String,
                required: true
            },
            zipCode: {
                type: Number,
                required: true,
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
            type: String,
            required: true
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