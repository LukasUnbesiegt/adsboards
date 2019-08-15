const { Board } = require('../../models/boards/Board')
const { Owner } = require('../../models/owners/Owner')
const { Schedule } = require('../../models/Schedule')
const { Advert } = require('../../models/advertisers/advert/Advert')
const moment = require('moment');
const mongoose = require('mongoose')



var getDates = function (startDate, endDate) {


    // two arguments startDate and endDate
    var dates = [],

        currentDate = startDate,
        addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};


// delete board controller method
const deleteBoard = (req, res) => {

    // getting boardId from client-side request
    const { boardId } = req.body;
    // empty error object for using errors send back
    const errors = {};

    // CHECKING A BOARD WHICH WE WILL DELETE HAS RUNNING SCHEDULES ( ADS )
    // IF THERE IS , WE DON'T LET DELETE AND IF NOT  WE WILL LET DELETE
    Schedule.find({ board: boardId }, (err, schedules) => {
        // finding schedules
        if (schedules.length > 0) {
            // we found schedules and we will send erorrs
            // attach errors object and send back
            errors.hasBookedAds = `this board have scheduled ads . you can't delete`

            res.status(500).send({
                success: false,
                errors
            })

        } else {
            // No schedules or ads in this board. we will let them delete this board
            Board.findByIdAndDelete(boardId, (err) => {
                // send success back
                res.status(200).send({
                    success: true
                })
            })
        }
    })


}



const deleteRequest = (req, res) => {



    // scheduleId from client-side
    const { scheduleId } = req.body;


    // find schedule which matches id and delete it
    Schedule.findByIdAndDelete(scheduleId, (err, deleted) => {


        // send success response
        res.status(200).send({
            success: true
        })


    })

}

const giveRating = (req, res) => {

    // rating number and boardId from client-side
    const { boardId, rating } = req.body;

    let errors = {}


    // finding Board from boardId and update rating number as rating number from client side
    Board.findByIdAndUpdate(boardId, { $push: { 'rating': rating } }, { new: true }, (err, board) => {


        if (err) {
            // if error send back error
            errors.RatingError = `cant give rating. something wrong`
            return res.json({ success: false, errors: errors })
        } else {

            // if success - send success response
            res.status(200).send({
                success: true
            })


        }

    })


}




// we need to get dates occupied already from a board. so that we can show as disabled dates not to book in server

const getDatesByBoardId = (req, res) => {

    // boardId coming from client-side as parameter
    const { boardId } = req.params;


    // finding schedules which match boardId we sent from client-side
    Schedule
        .find({ board: boardId })
        .select('from to')
        .then((schedules) => {
            // final dates empty array to send back to client-side
            let finalDates = []

            // we loop all schedules and all dates as array by using getDates helper function we wrote
            // two arguments schedule.from and schedule.to 

            schedules.forEach((schedule) => {

                let dates = getDates(schedule.from, schedule.to)
                // pushing array of dates got from each schedule into finalDates
                finalDates.push(...dates)

            })

            // finally send back dates array and success response to client-side ( so advertiser app can show disabled dates for each board)
            res.status(200).json({
                success: true,
                dates: finalDates,

            })


        })




}

const getAdsRequestedOwner = async (req, res) => {
    // ownerId and text ( string for search) from client-side
    const { ownerId, text } = req.body;
    let ITEMS_PER_PAGE = 10;
    let page = req.body.page || 1;
    let findArgs;
    if (text) {
        const advertId = await Advert.findOne({ $text: { $search: text } }).then((advert) => {

            if (advert) {
                return advert._id
            } else {
                return;
            }

        })

        findArgs = {

            owner: ownerId,
            isAccepted: false,
            advert: mongoose.Types.ObjectId(advertId).toHexString()

        }

    } else {
        findArgs = {
            owner: ownerId,
            isAccepted: false,

        }
    }

    Schedule
        .find(findArgs)
        .populate('board advertiser advert ')
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .then((schedules) => {

            res.status(200).json({
                success: true,
                schedules: schedules,
                currentPage: page,
                lastPage: Math.ceil(schedules.length / ITEMS_PER_PAGE),
                hasPreviousPage: page > 1,
                hasNextPage: ITEMS_PER_PAGE * page < schedules.length
            })
        })
}




const getAdsRequestedAdvertiser = async (req, res) => {

    // advertiserId and text ( string for search) from client-side
    const { advertiserId, text } = req.body;
    let ITEMS_PER_PAGE = 10;
    let page = req.body.page || 1;
    let findArgs;
    if (text) {
        // if there is text from client-side
        // we will find advertId  to use for search query - $text is used in mongodb for text letter search
        const advertId = await Advert.findOne({ $text: { $search: text } }).then((advert) => {

            if (advert) {
                return advert._id
            } else {
                return;
            }
        })

        // adding findArgs with data
        findArgs = {

            advertiser: advertiserId,
            isAccepted: false,
            advert: mongoose.Types.ObjectId(advertId).toHexString()
        }
    } else {
        // if there is no text. we don't need advert as query
        findArgs = {
            advertiser: advertiserId,
            isAccepted: false,
        }
    }
    // now finding schedules which accepted is false and match the query
    Schedule
        .find(findArgs)
        .populate('board advertiser advert')
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .then((schedules) => {

            // sending back schedules we got and pagination data
            res.status(200).json({
                success: true,
                schedules: schedules,
                currentPage: page,
                lastPage: Math.ceil(schedules.length / ITEMS_PER_PAGE),
                hasPreviousPage: page > 1,
                hasNextPage: ITEMS_PER_PAGE * page < schedules.length
            })

        })
}




const requestBoard = (req, res) => {

    const { startDate, endDate, advertId, advertiserId, boardId, ownerId } = req.body;

    const schedule = new Schedule({
        from: startDate,
        to: endDate,
        advert: advertId,
        board: boardId,
        advertiser: advertiserId,
        owner: ownerId

    })

    schedule.save((err, savedScheduled) => {
        res.status(200).send({
            success: true,
            schedule: savedScheduled

        })

    })


}


const getSingleBoard = (req, res) => {


    //getting boardId from client-side
    const { boardId } = req.params;



    // we find board by boardId sent from client-side
    // populate owner object from id
    Board.findById(boardId)
        .populate('owner')
        .then((board) => {

            // sending back a board which client-side need
            res.status(200).send({
                success: true,
                board: board
            })
        })




}

const searchBoards = (req, res) => {

    // get filters object sent from client-side
    let { filters } = req.body;
    // sorting object
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    // we limit items for 10 per page
    let ITEMS_PER_PAGE = 20;
    //current page number
    let page = req.body.page || 1;

    let totalItems;

    // query object - intially empty 
    let findArgs = {}

    // dynamic filtering
    for (let key in req.body.filters) {
        // looping through all filters and set for each property
        if (req.body.filters[key].length > 0) {

            switch (key) {
                case 'price':
                    // price query
                    findArgs['price.normal'] = {
                        $gte: parseInt(req.body.filters[key][0]),
                        $lte: parseInt(req.body.filters[key][1])
                    }
                    break;


                case 'coordinates':
                    // location search -  setting max distance 300 km . mongodb geo search query
                    if (req.body.filters[key].length > 0) {


                        findArgs['location'] = {
                            // $near is mongodb query sign
                            $near: {
                                $maxDistance: 3000,
                                $geometry: {
                                    type: "Point",
                                    coordinates: req.body.filters[key]
                                }
                            }
                        }
                    }

                default:
                    findArgs[key] = req.body.filters[key]
                    break;
            }

        }
    }

    // now we query boards with findArgs with filters filled object .skip is skipping and limit is limiting boards quantity we need 

    Board
        .countDocuments()
        .then((count) => {

            totalItems = count
            return Board
                .find(findArgs)
                .populate('owner')
                .sort([[sortBy, -1]])
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)

        })
        .then((boards) => {
            // now sending back all boards and pagination items 
            res.status(200).json({
                success: true,
                totalItems: totalItems,
                boards: boards,
                currentPage: page,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                hasPreviousPage: page > 1,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems
            })
        })
}




const getBoards = async function (req, res) {

    // filters object sent from client-side
    const { filters } = req.body;

    // we limit items for 10 per page
    let ITEMS_PER_PAGE = 10;

    // tracking current page number
    let page = req.body.page || 1;
    let totalItems;
    let findArgs;
    let owner;

    // owner id to track whoose boards are they
    owner = await Owner.findOne({ user: req.user._id }, (err, owner) => {
        return owner.user
    })

    // arguments object to use in mongoose query - finding boards

    findArgs = {
        owner: owner
    };

    // looping filters objects and set filters into findArgs
    for (let key in filters) {
        if (filters.hasOwnProperty(key)) {
            const element = filters[key];
            switch (key) {

                default:
                    findArgs[key] = element;
                    break;
            }
        }
    }

    // querying Board Model - find all boards which match our findArgs query
    Board
        .countDocuments()
        .then((count) => {

            totalItems = count
            return Board
                .find(findArgs)
                .populate('owner')
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then((boards) => {
            // when we get matched boards . send back to client-side
            // currentPage , totalItems , hasPrviousNextPage , hasNextPage are used for pagination of boards
            res.status(200).json({
                success: true,
                totalItems: boards.length,
                boards: boards,
                currentPage: page,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                hasPreviousPage: page > 1,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems

            })
        })
}

const lockBoard = (req, res) => {
    // getting board id from client-side request
    let { boardId } = req.body;

    // We find matched board in Board Model with that id
    Board.findOne({ _id: boardId }, (err, board) => {


        // if there is that board. we will set opposite boolean value of locked property in Board Model of that board
        Board.findByIdAndUpdate(boardId, { $set: { locked: !board.locked } }, { new: true }, (err, updated) => {


            // send back success response back
            res.status(200)
                .send({
                    success: true
                })
        })

    })

}
const editBoard = async (req, res) => {


    // getting board object ( new to edit) and boardId to edit 
    let { board, boardId } = req.body;

    // find owner id first to match whoose board it is
    let owner = await Owner.findOne({ user: req.user._id }, (err, owner) => {
        return owner._id
    })
    // findign with that board id , we will edit board with board we get from request
    Board.findByIdAndUpdate(boardId, { $set: { ...board, owner } }, { new: true }, (err, editedBoard) => {

        // send back success response back
        res.status(200)
            .send({
                success: true
            })
    })

}


const createBoard = async (req, res) => {

    // data coming from client-side
    const { coordinates, region, country, id, sale = false, name, price, description, photos, targets, population, size } = req.body;


    // get owner id to be saved in board
    owner = await Owner.findOne({ user: req.user._id }, (err, owner) => {
        return owner._id
    })


    // creating board object from mongoose Board Model
    const board = new Board({
        id,
        name,
        price,
        sale,
        description,
        photos: photos,
        location: {
            type: 'Point',
            coordinates
        },
        population,
        size,
        targets,
        region,
        country,
        owner
    })



    // saving board object
    board.save((err, board) => {


        // once board saved. add that board into owner boards array
        Owner.findByIdAndUpdate(board.owner, { $push: { boards: board._id } }, { new: true }, (err, updatedBoard) => {

            //  sending success request back to client-side
            res.status(200).send({
                success: true,
                board: updatedBoard
            })
        })
    })



}

// OWNER PROFILE - EDITING AND CREATING
const createProfile = (req, res) => {


    // getting data we need to create from client-side
    const { phone, email, address, ownerId, company } = req.body;


    // find existing owner . if exist , we set and edit that data with exisitng owner profile
    Owner.findOneAndUpdate({ _id: ownerId }, { $set: { phone, address, email, company } }, { new: true }, (err, updated) => {
        res.status(200).send({
            success: true

        })
    })


}

module.exports = {
    createBoard,
    getBoards,
    createProfile,
    searchBoards,
    getSingleBoard,
    requestBoard,
    getAdsRequestedAdvertiser,
    getDatesByBoardId,
    getAdsRequestedOwner,
    giveRating,
    deleteRequest,
    deleteBoard,
    editBoard,
    lockBoard
}