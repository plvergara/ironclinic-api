const express = require('express')
const router = express.Router()
const patientsController = require('../controllers/patients.controller')
const professionalsController = require('../controllers/professionals.controller')
const appointmentsController = require('../controllers/appointments.controller.js')
const mhController = require('../controllers/medicalsHistories.controller')
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
router.get('/appointments/:professional',authMiddleware.isAuthenticated, appointmentsController.filterProfessional)
router.get('/appointments/:patient',authMiddleware.isAuthenticated, appointmentsController.filterPatient)
router.post('/appointments',authMiddleware.isAuthenticated, appointmentsController.create)
router.get('/appointments/:id',authMiddleware.isAuthenticated, appointmentsController.get)
router.patch('/appointments/:id',authMiddleware.isAuthenticated, appointmentsController.update)
router.delete('/appointments/:id',authMiddleware.isAuthenticated, appointmentsController.delete)

//Medicals Historys
router.get('/patients/medicalhistory',authMiddleware.isAuthenticated, mhController.get)
router.post('patients/medicalhistory',authMiddleware.isAuthenticated, mhController.create)
router.patch('patients/medicalhistory',authMiddleware.isAuthenticated, mhController.update)
router.delete('patients/medicalhistory',authMiddleware.isAuthenticated, mhController.delete)



//login
router.post('/login',authMiddleware.isNotAuthenticated, professionalsController.login)
router.post('/logout',authMiddleware.isAuthenticated, professionalsController.logout)


module.exports = router

