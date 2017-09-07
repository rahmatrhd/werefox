require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const indexController = require('../controllers/indexController')
const userController = require('../controllers/usercontroller')

const userVerify = (req, res, next) => {
  console.log(req.headers.token);
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

router.get('/create-room', userVerify, indexController.createRoom)
router.post('/start-room', userVerify, indexController.startRoom)

router.get('/', userController.getuser);
router.post('/signin', userController.signin);
router.post('/', userController.signup);

module.exports = router
