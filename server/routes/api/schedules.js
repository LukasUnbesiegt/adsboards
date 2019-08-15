const express = require('express');
const router = express.Router();
const schedulesCtrl = require('../../controllers/schedules')
const { authMiddleware } = require('../../middleware/auth')


router.post('/get', authMiddleware, schedulesCtrl.schedulesBy)
router.get(`/single/:scheduleId`, authMiddleware, schedulesCtrl.getSingleSchedule)
router.get(`/today/:boardId`, schedulesCtrl.getTodayScheduleFromBoard)
router.post(`/lead`, schedulesCtrl.sendLead)
router.post(`/scan`, schedulesCtrl.increaseQRScan)
router.post(`/now`, authMiddleware, schedulesCtrl.todayRunningSchedules)




module.exports = router;