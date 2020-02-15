require('../config/db.config')

const Professional = require('../models/professional.model')
const Patient = require('../models/patient.model')

const faker = require('faker')

Promise.all([
  Professional.deleteMany(),
  Patient.deleteMany()
])



  .then(() => {
    const chari = new Professional ({
      name: {
          firstName:'Rosario',
          lastName:'Orozco'
      },
      password:"12345678",
      cNumber:2722,
      createdAt: faker.date.past()
    })
    chari.save()
            .then(chari => {
              console.log(chari.name, ' ', chari.cNumber, ' ', chari.password)
            })
            .catch(console.error)
    for (let i = 0; i < 3; i++) {
      const professional = new Professional({
        name: {
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName()
        },
        password:"12345678",
        cNumber:faker.random.number(),
        createdAt: faker.date.past()
      })

      professional.save()
        .then(professional => {
          console.log(professional.name, ' ', professional.cNumber, ' ', professional.password)
        })
        .catch(console.error)
    }
    for (let i = 0; i < 30; i++) {
      const patient = new Patient({
        name: {
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName()
        },
        birthDate:faker.date.past(),
        DNI:faker.random.number(),
        phoneNumber:609269916,
        address:{
          street:faker.address.streetName(),
          locality:faker.address.city(),
          province:faker.address.state(),
          zipCode:28933
        },
        dataProtection:faker.image.imageUrl(),
        createdAt: faker.date.past()
      })

      patient.save()
        .then(patient => {
          console.log(patient.name)
        })
        .catch(console.error)
    }
  })