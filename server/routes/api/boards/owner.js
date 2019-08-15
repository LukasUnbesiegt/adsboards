const express = require('express');
const router = express.Router();
const ownerCtrl = require('../../../controllers/owners/owners')
const { authMiddleware } = require('../../../middleware/auth')



router.post('/request/reject', authMiddleware, ownerCtrl.rejectRequest)
router.post('/request/accept', authMiddleware, ownerCtrl.acceptRequest)


// creating profile with owner id they sent 
router.post('/profile/create', authMiddleware, ownerCtrl.createProfile)

// signup owner with data sent from client side 
router.post('/signup', ownerCtrl.signUp)

// sign in owner with data sent from client side and we sent back token for auth use
router.post('/signin', ownerCtrl.signIn)

// here is auth use route which will use token ( authorization token)
router.get('/auth', authMiddleware, ownerCtrl.ownerAuth)

// getting single owner object by id they sent from client-side
router.get(`/single`, authMiddleware, ownerCtrl.getSingleOwner)




module.exports = router;