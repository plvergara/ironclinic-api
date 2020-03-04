const mongoose = require('mongoose')

const medicalHistorySchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Patient',
            required: true,
            unique: true
        },
        illnesses: {
            type: String,
            default: 'none'
        },
        allergies: {
            type: String,
            default: 'none'
        },
        surgeries: {
            type: String,
            default: 'none'

        },
        medications: {
            type: String,
            default: 'none'
        },
        diagnosticJudgment: {
            type: String,
            required: true
        },
        files: [{
            type: String
        }]
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

medicalHistorySchema.index({ '$**': 'text' })

const MedicalHistory = new mongoose.model('medicalHistory', medicalHistorySchema)
module.exports = MedicalHistory
