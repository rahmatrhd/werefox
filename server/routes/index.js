require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const controller = require('../controllers/indexController')
const controller = require('../controllers/usercontroller')

const userVerify = (req, res, next) => {
  if (req.headers.token != null) {
    req.headers.userVerified = jwt.verify(req.headers.token, process.env.APP_SECRET)
    console.log(req.headers.userVerified);
    next()
  } else
    res.send({
      error: true,
      message: 'Not authenticated'
    })
}

router.get('/create-room', userVerify, controller.createRoom)
router.post('/start-room', userVerify, controller.startRoom)


router.get('/', controller.getuser);
router.post('/signin', controller.signin);
router.post('/', controller.signup);

module.exports = router