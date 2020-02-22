const express = require('express')
const router = express.Router()
const patientsController = require('../controllers/patients.controller')
const professionalsController = require('../controllers/professionals.controller')
const appointmentsController = require('../controllers/appointments.controller.js')
const mhController = require('../controllers/medicalHistories.controller')
const authMiddleware = require('../middlewares/auth.middleware')

//Patients
router.get('/patients',authMiddleware.isAuthenticated, patientsController.list)
router.post('/patients',authMiddleware.isAuthenticated, patientsController.create)
router.get('/patients/:id',authMiddleware.isAuthenticated, patientsController.get)
router.patch('/patients/:id',authMiddleware.isAuthenticated, patientsController.update)
router.delete('/patients/:id',authMiddleware.isAuthenticated, patientsController.delete)

//Profesionals
router.get('/professionals',authMiddleware.isAuthenticated, professionalsController.list)
router.post('/professionals',authMiddleware.isAuthenticated, professionalsController.create)
router.get('/professionals/:id',authMiddleware.isAuthenticated, professionalsController.get)
router.patch('/professionals/:id',authMiddleware.isAuthenticated, professionalsController.update)
router.delete('/professionals/:id',authMiddleware.isAuthenticated, professionalsController.delete)

//Appointments
router.get('/appointments',authMiddleware.isAuthenticated, appointmentsController.list)
router.get('/appointments/:id',authMiddleware.isAuthenticated, appointmentsController.get)
router.get('/appointments/professional/:id',authMiddleware.isAuthenticated, appointmentsController.filterProfessional)
router.get('/appointments/patient/:id',authMiddleware.isAuthenticated, appointmentsController.filterPatient)
router.get('/appointments/date/:date', authMiddleware.isAuthenticated, appointmentsController.filterDate)
router.post('/appointments',authMiddleware.isAuthenticated, appointmentsController.create)
router.patch('/appointments/:id',authMiddleware.isAuthenticated, appointmentsController.update)
router.delete('/appointments/:id',authMiddleware.isAuthenticated, appointmentsController.delete)

//Medicals Historys
router.get('/patients/:id/medicalhistory',authMiddleware.isAuthenticated, mhController.get)
router.post('/patients/:id/medicalhistory',authMiddleware.isAuthenticated, mhController.create)
router.patch('/patients/:id/medicalhistory',authMiddleware.isAuthenticated, mhController.update)
// router.delete('/patients/:id/medicalhistory',authMiddleware.isAuthenticated, mhController.delete)



//login
router.post('/login',authMiddleware.isNotAuthenticated, professionalsController.login)
router.post('/logout',authMiddleware.isAuthenticated, professionalsController.logout)


module.exports = router

