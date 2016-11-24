function updateHeaderAccountInfo(textToAppend) {
  $('#accountInfoHeader').text('You are logged in as ' + textToAppend);
  var domElement = $('<button name="logoutBtn">Logout</button>');
  $('#accountInfoHeader').after(domElement);
}

function clearUpdateHeaderAccountInfo() {
  $('#accountInfoHeader').text('');
  $("button[name='logoutBtn']").remove();
}

function checkIfNeedToUpdateAccountInfoHeader() {
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage
    var storedName = localStorage.getItem('name');
    if(storedName != null) {
      if(top.loggedInChat == 1) {
        updateHeaderAccountInfo(storedName);
      }
    } else {
      $("#logoutBtn").hide();
      clearUpdateHeaderAccountInfo();
    }
  }
}

$(document).ready(function() {
    $("button[name='logoutBtn']").click(function() {
      localStorage.removeItem('name');
      localStorage.removeItem('pw');
      checkIfNeedToUpdateAccountInfoHeader();
    });
});

$(document).on('click', "button[name='logoutBtn']", function() {
  console.log('holachuohey');
});
