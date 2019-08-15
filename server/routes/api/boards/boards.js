const express = require('express');
const router = express.Router();
const formidable = require('express-formidable')
const { authMiddleware } = require('../../../middleware/auth')
const boardsCtrl = require('../../../controllers/boards/boards')
const upload = require('../../../controllers/advertisers/upload')



// controllers with their respective api routes 
// We use ' authMiddleware ' middleware for checking private routes so that we can get user logged in data. 
// kick out unauthorized users too
// BOARDS MANAGEMENT  
// getting single board by id 
router.get('/single/:boardId', boardsCtrl.getSingleBoard)

// searching boards with name
router.post('/search', boardsCtrl.searchBoards)

// get all boards to show in table in react-side ( client side ) . 
router.post('/all', authMiddleware, boardsCtrl.getBoards)

// creation of a board. 
router.post('/', authMiddleware, boardsCtrl.createBoard)

// photo upload route with formidable (multipart form handling middleware)
router.post('/upload', authMiddleware, formidable(), upload.CDphotoupload)

// deleting a board with board id coming from client-side
router.post('/single/delete', authMiddleware, boardsCtrl.deleteBoard)

// editing a board with board id and data for editing 
router.post('/edit', authMiddleware, boardsCtrl.editBoard)

// locking a board with board id and lock/unlock boolean
router.post('/lock', authMiddleware, boardsCtrl.lockBoard)


// REQUESTS AND BOOKING 


// here we have getting dates by board id  . for example  /api/v1/boards/dates/boardId
router.get('/dates/:boardId', authMiddleware, boardsCtrl.getDatesByBoardId)

// gettings ads requested by owner id . for example  /api/v1/boards/requboards
router.post('/reqboards', authMiddleware, boardsCtrl.getAdsRequestedOwner)

// getting ads requested by  advertiser id  .
router.post('/requests', authMiddleware, boardsCtrl.getAdsRequestedAdvertiser)

// deleting request from ads requests
router.post('/delete', authMiddleware, boardsCtrl.deleteRequest)

// giving rate route . we get rating value from client-side and perform server-side rating here
router.post('/rate', authMiddleware, boardsCtrl.giveRating)
//  booking request to a board  . /api/v1/boards/request  

router.post('/request', authMiddleware, boardsCtrl.requestBoard)

module.exports = router;