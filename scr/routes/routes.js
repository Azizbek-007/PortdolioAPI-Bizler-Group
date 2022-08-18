const { Router } = require('express')
const router = Router()
const apicache = require('apicache')

const AuthController = require('../controllers/auth.controller')
const CategoryController = require('../controllers/category.controller')
const ProjectController = require('../controllers/project.controller')
const TelegramController = require('../controllers/telegram.controller')
// Middlewares
const {authCheck} = require('../middlewares/auth')
const upload = require('../middlewares/upload')

let cache = apicache.middleware
 
// auth login 
router.post('/login', AuthController.login)

// CREATE CATALOGY
router.post('/category/create', authCheck, CategoryController.create)
// ALL CATALOGY
router.get('/category/all', authCheck, CategoryController.getAll)
// delete category
router.delete('/category/delete/:id', authCheck, CategoryController.destroy)


// CREATE PROJECT
router.post('/project/create', authCheck, upload.single('image'), ProjectController.create)
// ALL PROJECT
router.get('/project/all', authCheck, ProjectController.getAll)
// delete project
router.delete('/project/delete/:id', authCheck, ProjectController.destroy)


// Home page for routes

// categories
router.get('/categories', cache('2 minutes'), CategoryController.getAll)
// projects
router.get('/projects', cache('2 minutes'), ProjectController.all)
// send Message
router.post('/sendMessage', TelegramController.sendMessage)
 
module.exports = router