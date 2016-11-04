

var AccountController = function (userModel, session, mailer) {
    this.uuid = require('node-uuid');
    this.ApiResponse = require('../models/api-response.js');
    this.ApiMessages = require('../models/api-messages.js');
    this.UserProfile = require('../models/user-profile.js');
    this.userModel = userModel;
    this.session = session;
    this.mailer = mailer;
    this.User = require('../models/user.js');
};

AccountController.prototype.getSession = function () {
    return this.session;
};

AccountController.prototype.setSession = function (session) {
    this.session = session;
};

AccountController.prototype.register = function (newUser, callback) {
    var me = this;
    me.userModel.findOne({ email: newUser.email }, function (err, user) {

        if (err) {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }

        if (user) {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.EMAIL_ALREADY_EXISTS } }));
        } else {

            newUser.save(function (err, user, numberAffected) {

                if (err) {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
                }

                if (numberAffected === 1) {

                    var userProfileModel = new me.UserProfile({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });

                    return callback(err, new me.ApiResponse({
                        success: true, extras: {
                            userProfileModel: userProfileModel
                        }
                    }));
                } else {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.COULD_NOT_CREATE_USER } }));
                }

            });
        }

    });
};

AccountController.prototype.logon = function(email, password, callback) {
    console.log("hey3");
    var me = this;

    me.userModel.findOne({ email: email }, function (err, user) {
        if (err) {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        console.log("hey2");
        if (user) {
                console.log("hey");
                console.log(password);
                if (password === user.password) {

                    var userProfileModel = new me.UserProfile({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });

                    me.session.userProfileModel = userProfileModel;
                    me.session.id = me.uuid.v4();

                    return callback(err, new me.ApiResponse({
                        success: true, extras: {
                            userProfileModel: userProfileModel,
                            sessionId: me.session.id
                        }
                    }));
                } else {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.INVALID_PWD } }));
                }
        } else {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.EMAIL_NOT_FOUND } }));
        }

    });
};

AccountController.prototype.logoff = function () {
    if (this.session.userProfileModel) delete this.session.userProfileModel;
    if (this.session.id) delete this.session.id;
    return;
};

AccountController.prototype.resetPassword = function (email, callback) {
    var me = this;
    me.userModel.findOne({ email: email }, function (err, user) {

        if (err) {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }

        if (user) {
            // Save the user's email and a password reset hash in session.
            var passwordResetHash = me.uuid.v4();
            me.session.passwordResetHash = passwordResetHash;
            me.session.emailWhoRequestedPasswordReset = email;

            me.mailer.sendPasswordResetHash(email, passwordResetHash);

            return callback(err, new me.ApiResponse({ success: true, extras: { passwordResetHash: passwordResetHash } }));
        } else {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.EMAIL_NOT_FOUND } }));
        }
    })
};

AccountController.prototype.resetPasswordFinal = function (email, newPassword, newPasswordConfirm, passwordResetHash, callback) {
    var me = this;
    if (!me.session || !me.session.passwordResetHash) {
        return callback(null, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.PASSWORD_RESET_EXPIRED } }));
    }

    if (me.session.passwordResetHash !== passwordResetHash) {
        return callback(null, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.PASSWORD_RESET_HASH_MISMATCH } }));
    }

    if (me.session.emailWhoRequestedPasswordReset !== email) {
        return callback(null, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.PASSWORD_RESET_EMAIL_MISMATCH } }));
    }

    if (newPassword !== newPasswordConfirm) {
        return callback(null, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.PASSWORD_CONFIRM_MISMATCH } }));
    }

        me.userModel.update({ email: email }, { password: newPassword }, function (err, numberAffected, raw) {

            if (err) {
                return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
            }

            if (numberAffected < 1) {

                return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.COULD_NOT_RESET_PASSWORD } }));
            } else {
                return callback(err, new me.ApiResponse({ success: true, extras: null }));
            }
        });
};

AccountController.prototype.getUserFromUserRegistration = function(userRegistrationModel) {
    var me = this;

    if (userRegistrationModel.password !== userRegistrationModel.passwordConfirm) {
        return new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.PASSWORD_CONFIRM_MISMATCH } });
    }

    var user = new this.User({
        email: userRegistrationModel.email,
        firstName: userRegistrationModel.firstName,
        lastName: userRegistrationModel.lastName,
        password: userRegistrationModel.password
    });

    return new me.ApiResponse({ success: true, extras: { user: user } });
}

module.exports = AccountController;
