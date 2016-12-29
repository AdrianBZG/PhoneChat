const express = require('express');
const router = express.Router();

// Models
const EventModel = require('../models/event.js');

// Register Handler
router.route('/addEvent').post((req, res) => {
    console.log("AddEvent {{{");
    body = req.body;
    let newEvent = new EventModel({
        name: body.name,
        description: body.description,
        latitude: body.latitude,
        longitude: body.longitude,
        creator: body.creator,
        participants: body.participants,
        date: body.date
    });

    newEvent.save((err, event, numberAffected) => {
        if (err) {
            res.sendStatus(403);
            res.send('Error on add event');
            console.log(err);
            console.log("ERROR");
        }
        if (numberAffected === 1) {
            console.log("ALL FINE");
            console.log(event);
            res.send('Added Event');
        }
    });
    console.log("}}}")
});

//
router.route('/removeEvent').post((req, res) => {
    console.log("RemoveEvent {{{");
    let body = req.body;
    EventModel.findOne({ name: body.name, creator: body.creator }, (err, model) => {
        if (err) {
            console.log("ERROR");
            console.log(err);
            res.sendStatus(403);
            res.send('No found event');
        }
        else {
            model.remove((err) => {
                res.send('No can\'t remove event');
                console.log("ERROR");
                console.log(err);
            });
        }
    });
    console.log("}}}")
});

//
router.route('/addParticipant').post((req, res) => {
    body = req.body;
    EventModel.findOneAndUpdate({ name: body.name, creator: body.creator }, (err, model) => {
        if (err) {
            console.log("ERROR");
            console.log(err);
            res.sendStatus(403);
            res.send('No found event');
        }
        else {
            model.remove((err) => {
                console.log("ERROR");
                console.log(err);
                res.send('No can\'t remove event');
            })
            let newEvent = new EventModel({
                name: body.name,
                description: body.description,
                latitude: body.latitude,
                longitude: body.longitude,
                creator: body.creator,
                participants: body.participants,
                date: body.date
            });

            newEvent.save((err, event, numberAffected) => {
                if (err) {
                    console.log("ERROR");
                    console.log(err);
                    res.sendStatus(403);
                    res.send('No can\'t save event');
                }
                if (numberAffected === 1) {
                    console.log("ALL FINE");
                    console.log(event);
                    res.send('Saved event');
                }
            });
        }
    });

    router.route('/getEvents').get((req, res) => {
        console.log("Get Events {{{");
        EventModel.find((err, models) => {
            if (err) {
                res.sendStatus(403);
                console.log("ERROR");
                console.log(err);
            }
            else {
                res.send(models);
            }
        });
        console.log("}}}")
    })

    /*
    router.route('/account/resetpassword')
    .post(function (req, res) {

      var accountController = new AccountController(req.session);
      var userPasswordReset = new UserPasswordReset(req.body);
      accountController.resetPassword(userPasswordReset.email, function (err, response) {
        return res.send(response);
      });
    });

    router.route('/account/resetpasswordfinal')
    .post(function (req, res) {

      var accountController = new AccountController(req.session);
      var userPasswordResetFinal = new UserPasswordResetFinal(req.body);
      accountController.resetPasswordFinal(userPasswordResetFinal.email, userPasswordResetFinal.newPassword, userPasswordResetFinal.newPasswordConfirm, userPasswordResetFinal.passwordResetHash, function (err, response) {
        return res.send(response);
      });
    });
    */
    module.exports = router;
