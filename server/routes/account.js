const express = require('express');
const router = express.Router();

// Controllers
const AccountController = require('../controllers/account.js');

// Models
const UserRegistration       = require('../models/user-registration.js');
const UserLogon              = require('../models/user-logon.js');
const User                   = require('../models/user.js');
const ApiResponse            = require('../models/api-response.js');
const UserPasswordReset      = require('../models/user-pwd-reset.js');
const UserPasswordResetFinal = require('../models/user-pwd-reset-final.js');

// Register Handler
router.route('/account/register').post((req, res) => {
  console.log("Register");
  let accountController = new AccountController(req.session);
  let apiResponseStep1 = accountController.getUserFromUserRegistration(
    new UserRegistration(req.body));

  // TODO: No tiene sentido esta parte                     vvvvv
  // res.set("Access-Control-Allow-Origin", "http://localhost:42550");   // Enable CORS in dev environment.

  if (apiResponseStep1.success) {
    accountController.register(
      apiResponseStep1.extras.user,
      (err, apiResponseStep2) => {
        return res.send(apiResponseStep2);
      }
    );
  } else {
    res.send(apiResponseStep1);
  }
});

//
router.route('/account/logon').post((req, res) => {
  console.log("Logon");
  var accountController = new AccountController(req.session);
  var userLogon = new UserLogon(req.body);

  accountController.logon(userLogon.email, userLogon.password,
    (err, response) => {
      return res.send(response);
  });
});

// TODO: get and post? same thing
router.route('/account/logoff')
  .get((req, res) => { // Does have sense?
    var accountController = new AccountController(req.session);
    accountController.logoff();
    res.send(new ApiResponse({ success: true }));})

  .post((req, res) => {
    var accountController = new AccountController(req.session);
    accountController.logoff();
    res.send(new ApiResponse({ success: true }));
  });

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
