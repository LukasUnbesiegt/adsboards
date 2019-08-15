const express = require('express');
const router = express.Router();
const { register, login, auth, logout, fbLogin, editUser } = require('../../controllers/user')
const { authMiddleware } = require('../../middleware/auth')
const usersCtrl = require('../../controllers/user')

router.post('/reset_pass', usersCtrl.resetPassword)
router.post('/reset_user', usersCtrl.resetUser)
router.post('/edit', authMiddleware, editUser);
router.post('/login', login);
router.post('/fblogin', fbLogin)
router.get('/auth', authMiddleware, auth)
router.get('/logout', authMiddleware, logout)



module.exports = router;