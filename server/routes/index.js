const router = require('express').Router()
const controller = require('../controllers/usercontroller')

router.get('/', controller.getuser);

router.post('/', controller.signin);

router.post('/', controller.signup);

module.exports = router
