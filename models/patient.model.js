const mongoose = require('mongoose')
require('./medicalHistory.model')

RATE = ['Particular', 'Jubilado', 'Persona en Situación de Discapacidad']
DOCUTYPE = ['DNI','NIE','OTRO']

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
        number:{
            type: Number
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
        identification:{
            type: {
                format:{
                    type: String,
                    enum: DOCUTYPE
                },
                number: {
                    type: String                
                }
            },
            uppercase:true,
            unique: true,
            validate:{
                validator: docu => {
                    if ( docu.format === 'DNI' || docu.format === 'NIE') {
                        let number = docu.number
                        if (docu.format === 'NIE' && !(number.slice(0,1) === 'X' || number.slice(0,1) === 'Y' || number.slice(0,1) === 'Z')) return false
                        if (docu.format === 'NIE' && number.slice(0,1) === 'X') number = number.replace("X","0")
                        if (docu.format === 'NIE' && number.slice(0,1) === 'Y') number = number.replace("Y","1")
                        if (docu.format === 'NIE' && number.slice(0,1) === 'Z') number = number.replace("Z","2")
                        const digits = "TRWAGMYFPDXBNJZSQVHLCKE"
                        const DNInum = Number(number.match(/\d+/g)[0])
                        const DNIletter = number.match(/[a-zA-Z]+/g)
                        if (DNIletter === null) return false
                        const letterValidation = digits[DNInum % 23]
                        return DNIletter[0] === letterValidation
                    }
                    else true   
                    },
                message: 'incorrect format'
            }
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