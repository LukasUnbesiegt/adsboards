const mongoose = require('mongoose')
const { Schedule } = require('../models/Schedule')
const { Owner } = require('../models/owners/Owner')
const { Advertiser } = require('../models/advertisers/Advertiser')
const { Advert } = require('../models/advertisers/advert/Advert')
const moment = require('moment')
// const { Board } = require('../models/boards/Board')
const ObjectId = mongoose.Types.ObjectId;




// sending lead to schedule
const increaseQRScan = (req, res) => {

    // scheduleid and lead from request- when customer click our board in raspberry pi
    const { scheduleId } = req.body;

    // find schedule by that schedule id and we will push lead object to stats.leads data 
    Schedule.findByIdAndUpdate(scheduleId, { $inc: { 'stats.qrqty': 1 } }, { new: true }, (updated) => {

        res.status(200).json({

            // sending back success response
            success: true
        })

    })



}



// sending lead to schedule
const sendLead = (req, res) => {

    // scheduleid and lead from request- when customer click our board in raspberry pi
    const { scheduleId, lead } = req.body;

    // find schedule by that schedule id and we will push lead object to stats.leads data 
    Schedule.findByIdAndUpdate(scheduleId, { $push: { 'stats.leads': lead } }, { new: true }, (updated) => {

        res.status(200).json({

            // sending back success response
            success: true
        })

    })



}


const todayRunningSchedules = (req, res) => {


    const { type, advertiserId, ownerId } = req.body;


    if (type === 'advertiser') {


        Schedule.find({ advertiser: advertiserId, from: { $lte: Date.now() }, to: { $gte: Date.now() } })
            .populate('advert board advertiser')
            .then((schedules) => {

                res.status(200).json({

                    schedules: schedules
                })



            })


    } else {


        Schedule.find({ owner: ownerId, from: { $lte: Date.now() }, to: { $gte: Date.now() } })
            .populate('advert board owner')
            .then((schedules) => {

                res.status(200).json({

                    schedules: schedules


                })



            })




    }

}
const getTodayScheduleFromBoard = (req, res) => {

    const { boardId } = req.params;

    // get schedules by boardId 
    // schedule where from and to is between today date 
    // send back that schedule


    // finding a schedule which boardid is matched. its from and to date is between today date. so we will get today running schedule.

    Schedule.findOne({ board: boardId, from: { $lte: moment('2019-06-21').toDate() }, to: { $gte: moment('2019-06-21').toDate() } })
        .populate('advert board advertiser')
        .then((schedule) => {

            // sending back schedule of today running
            res.status(200).json({

                schedule: schedule


            })



        })






}

const getSingleSchedule = (req, res) => {

    const { scheduleId } = req.params;


    Schedule.findOne({ _id: scheduleId })
        .populate('advert board owner')
        .then((schedule) => {
            res.status(200).json({
                success: true,
                schedule: schedule


            })

        })




}


const schedulesBy = (req, res) => {


    // getting actor and group value from request
    const { actor, group } = req.body;
    let ITEMS_PER_PAGE = 10;
    let page = req.body.page || 1;


    // isAccepted have to be true since these schedules are running and not at request state
    let findArgs = {
        isAccepted: true
    }



    switch (actor.type) {
        // if type from actor object (which come from client side) is advertiser. we will set as advertiser query
        case 'advertiser':

            findArgs['advertiser'] = actor._id
            break;
        // if type from actor object (which come from client side) is owner. we will set as owner query
        case 'owner':

            findArgs['owner'] = actor._id
            break;

        default:
            break;
    }

    // now finding schdules which match our schedules
    Schedule
        .find(findArgs)
        .populate('advert board advertiser')
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .then((schedules) => {

            let finalObj = {}

            // which group sent from client-side and we will query based on that group
            switch (group) {

                // if group is date 
                case 'date':
                    let dates = schedules.map((schedule) => {
                        return schedule.from
                    })

                    dates.forEach((date) => {

                        let arrObj = schedules.filter((schedule) => {

                            return date === schedule.from

                        })
                        return finalObj[date] = arrObj
                    })

                    break;

                // if group is board 
                case 'board':

                    let boards = schedules.map((schedule) => {
                        return schedule.board
                    })
                    boards.forEach((board) => {

                        let arrObj = schedules.filter((schedule) => {

                            return board._id === schedule.board._id

                        })

                        return finalObj[board.name] = arrObj
                    })

                    break;
                default:
                    break;
            }
            res.status(200).json({

                success: true,
                totalItems: schedules.length,
                schedules: finalObj,
            })

        })

}







module.exports = {

    schedulesBy,
    getSingleSchedule,
    getTodayScheduleFromBoard,
    sendLead,
    todayRunningSchedules,
    increaseQRScan

}