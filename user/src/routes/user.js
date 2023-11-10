const router = require('express').Router()

const createUserController = require('../controllers/createUserController')
const getAllUserController = require('../controllers/getAllUserController')
const updateUserController = require('../controllers/updateUserController')


router.get('/all', getAllUserController)


router.post('/create', createUserController)

router.put('/update/:id', updateUserController)

module.exports = router
