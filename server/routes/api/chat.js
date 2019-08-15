const express = require('express');
const router = express.Router();
const Chatkit = require('@pusher/chatkit-server');
const config = require('../../config')


const chatkit = new Chatkit.default({
    instanceLocator: config.CHATKIT_INSTANCE_LOCATOR,
    key: config.CHATKIT_SECRET_KEY,
});


router.get(`/rooms/:id`, (req, res) => {

    const { id } = req.params;

    chatkit.getRooms({

    })
        .then((rooms) => {


            let roomNames = rooms.map((room) => {
                return room.name
            })


            if (roomNames.indexOf(id) > -1) {


                const roomId = rooms[roomNames.indexOf(id)]

                res.status(200).send({
                    exist: true,
                    roomId: roomId.id

                })

            } else {
                console.log('room not exist')
                res.status(200).send({
                    exist: false
                })
            }

        })
        .catch(err => console.error(err))

})

router.post('/users', (req, res) => {



    const { user } = req.body;

    chatkit
        .createUser({
            id: user.id,
            name: user.name,
        })
        .then(() => {
            res.sendStatus(201);
        })
        .catch(err => {
            if (err.error === 'services/chatkit/user_already_exists') {
                console.log(`User already exists:`);
                res.sendStatus(200);
            } else {
                res.status(err.status).json(err);
            }
        });
});




router.post('/authenticate', (req, res) => {

    const authData = chatkit.authenticate({
        userId: req.query.user_id,
    });
    res.status(authData.status).send(authData.body);
});



module.exports = router;