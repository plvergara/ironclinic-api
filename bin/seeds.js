require('../config/db.config')

const Professional = require('../models/professional.model')
const faker = require('faker')

Promise.all([
  Professional.deleteMany()
])
  .then(() => {
    for (let i = 0; i < 3; i++) {
      const professional = new Professional({
        name: {
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName()
        },
        cNumber:faker.random.number(),
        createdAt: faker.date.past()
      })

      professional.save()
        .then(professional => {
          console.log(professional.name)
        })
        .catch(console.error)
    }
  })