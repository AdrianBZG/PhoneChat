//"use strict";

var currentUser;
var sensorsTimer;

$(document).ready(function() {
  sensorsTimer = setInterval(
     function(){
          console.log('Sensors Timer Start');
          getCurrentGPSPosition('GPSsensorField');
          getCurrentGeolocalization('geolocalizationField');
          getCurrentOrientation('compassSensorField');
          watchDeviceAcceleration('accSensorField');
          getCurrentAltitude('altimeterSensorField');
          console.log('Sensors Timer End');
     },
     2000  /* 10000 ms = 10 sec */
);
});

function showMustLoginFirstModal() {
  $("#needToLoginForm").modal("show");
}

function showLoginModal() {
  $("#loginForm").modal("show");
  $('#loginForm .progress').hide();

  // login action
  $('#loginButton').click(function() {
    var inputUserName = $('#loginUsername').val();
    var inputUserPassword = $('#loginPassword').val();
    var usuarioQB = {
            id: 6729119, // Just a number, it'll create a random one
            name: inputUserName,
            login: inputUserName,
            pass: inputUserPassword
        };
    currentUser = usuarioQB;
    connectToChat(usuarioQB);
    clearUpdateHeaderAccountInfo();
    checkIfNeedToUpdateAccountInfoHeader();
  });
}

function connectToChat(user) {
  $('#loginForm button').hide();
  $('#loginForm .progress').show();

  // Create session and connect to chat
  //
  QB.createSession({login: user.login, password: user.pass}, function(err, res) {
    if (res) {
      // save session token
      token = res.token;

      user.id = res.user_id;
      mergeUsers([{user: user}]);

      QB.chat.connect({userId: user.id, password: user.pass}, function(err, roster) {
        if (err) {
          console.log(err);
        } else {
          console.log(roster);

          // setup scroll stickerpipe module
          //
          setupStickerPipe();

          // load chat dialogs
          //
          retrieveChatDialogs();

          // setup message listeners
          //
          setupAllListeners();

          // setup scroll events handler
          //
          setupMsgScrollHandler();

          // Move to the main page
          $.mobile.navigate("#");
          if (typeof(Storage) !== "undefined") {
            // Code for localStorage
            localStorage.setItem('name', user.login);
            localStorage.setItem('pw', user.pass);
            top.loggedInChat = 1;
          } else {
            // No Web Storage support..
          }
        }
      });
    }
  });
}

function moveToChatPage() {
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');
    if(storedName === null && storedPw === null) {
      showMustLoginFirstModal();
      $.mobile.navigate("#");
    } else {
      if(top.loggedInChat != 1) {
        var usuarioQB = {
                id: 6729119, // Just a number, it'll create a random one
                name: storedName,
                login: storedName,
                pass: storedPw
            };
        connectToChat(usuarioQB);
        top.loggedInChat = 1;
        checkIfNeedToUpdateAccountInfoHeader();
        $.mobile.navigate("#chat");
      } else {
        checkIfNeedToUpdateAccountInfoHeader()
        $.mobile.navigate("#chat");
      }
    }
  } else {
    // No Web Storage support..
    $.mobile.navigate("#");
  }
}

function setupAllListeners() {
  QB.chat.onDisconnectedListener    = onDisconnectedListener;
  QB.chat.onReconnectListener       = onReconnectListener;
  QB.chat.onMessageListener         = onMessage;
  QB.chat.onSystemMessageListener   = onSystemMessageListener;
  QB.chat.onDeliveredStatusListener = onDeliveredStatusListener;
  QB.chat.onReadStatusListener      = onReadStatusListener;
  setupIsTypingHandler();
}

// reconnection listeners
function onDisconnectedListener(){
  console.log("onDisconnectedListener");
}

function onReconnectListener(){
  console.log("onReconnectListener");
}


// niceScroll() - ON
$(document).ready(
    function() {
        $("html").niceScroll({cursorcolor:"#02B923", cursorwidth:"7", zindex:"99999"});
        $(".nice-scroll").niceScroll({cursorcolor:"#02B923", cursorwidth:"7", zindex:"99999"});
    }
);
