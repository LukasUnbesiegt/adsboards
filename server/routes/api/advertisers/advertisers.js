const express = require('express');
const router = express.Router();
const formidable = require('express-formidable')
const advertisersSignUpLogin = require('../../../controllers/advertisers/login-sign')
const advertisersCRUD = require('../../../controllers/advertisers/advertisers')
const upload = require('../../../controllers/advertisers/upload')
const { authMiddleware } = require('../../../middleware/auth')


// ROUTES OF ADVERTISER AND ADVERT MANAGEMENT

// top up credits to stripe checkout with amount and stripe card data sent from client-side
router.post('/stripe', authMiddleware, advertisersCRUD.stripeCheckOut)

// CREATE an advert with data sent from client-side
router.post('/advert/create', authMiddleware, advertisersCRUD.createAdvert)


// deleting an advert by advert id sent from client-side
router.post('/advert/delete/:advertId', authMiddleware, advertisersCRUD.deleteAdvert)

// getting single advert ( which will use for editing in form )
router.get('/advert/:advertId', authMiddleware, advertisersCRUD.getSingleAdvert)


// edit an advert with advert id and data which for editing
router.post('/advert/edit', authMiddleware, advertisersCRUD.editAdvert)

// same photo upload with owner photo upload. nothing new
router.post('/upload', authMiddleware, formidable(), upload.CDphotoupload)


// getting all adverts which advertiser created by advertiser id
router.post('/all', authMiddleware, advertisersCRUD.getAdverts)


// getting spots requested history by an advert 
router.post('/spotlists', authMiddleware, advertisersCRUD.getSpotsListsByAds)




// creating profile with advertiser id they sent 
router.post('/profile/create', authMiddleware, advertisersCRUD.createProfile)

// signup advertiser with data sent from client side 
router.post('/signup', advertisersSignUpLogin.signup)

// sign in advertiser with data sent from client side and we sent back token for auth use
router.post('/login', advertisersSignUpLogin.login)

// here is auth use route which will use token ( authorization token)
router.get('/adauth', authMiddleware, advertisersSignUpLogin.advertiserAuth)

// getting single advertiser object by id they sent from client-side
router.get('/single', authMiddleware, advertisersCRUD.getSingleAdvertiser)

module.exports = router;