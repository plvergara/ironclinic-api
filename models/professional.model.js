const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const professionalSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: [true, "A password is required"],
            minlength: [8, "At least 8 characters are required"]
        },
        specialty: {
            type: String,
            default: 'podiatrist'
        },
        cNumber: {
            type: Number,
            required: true,
            unique: true
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

professionalSchema.pre('save', function (next) {
    const professional = this

    if (professional.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(professional.password, salt)
                    .then(hash => {
                        professional.password = hash
                        next()
                    })
            })
            .catch(next)
    } else {
        next()
    }
})

professionalSchema.index({ '$**': 'text' })

professionalSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

const Professional = new mongoose.model('Professional', professionalSchema)

module.exports = Professional