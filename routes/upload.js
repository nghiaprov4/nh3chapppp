const router = require('express').Router()
const uploadImage = require('../controllers/uploadImage')
const uploadCtrl = require('../controllers/uploadCtrl')
const auth = require('../controllers/auth')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)

module.exports = router