var pictureSource;          // Picture source: pictureSource.PHOTOLIBRARY, pictureSource.SAVEDPHOTOALBUM
var destinationType;        // Sets the format of returned value
var htmlElementToEdit;      // The HTML element to put the info inside

// onGPSSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onGPSSuccess = function(position) {
  console.log('Latitude: '          + position.coords.latitude          + '\n' +
  'Longitude: '         + position.coords.longitude         + '\n' +
  'Accuracy: '          + position.coords.accuracy);

  var element = document.getElementById(htmlElementToEdit);
  element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                      'Longitude: '          + position.coords.longitude             + '<br />' +
                      'Accuracy: '           + position.coords.accuracy              + '<br />';
};

var onAltitudeSuccess = function(altitude) {
  console.log('Altitude: '          + position.coords.altitude          + '\n' +
  'Altitude Accuracy: ' + position.coords.altitudeAccuracy);

  var element = document.getElementById(htmlElementToEdit);
  element.innerHTML = 'Altitude: '           + position.coords.altitude              + '<br />' +
                      'Altitude Accuracy: '          + position.coords.altitudeAccuracy      + '<br />';
};

var onOrientationSuccess = function(altitude) {
  console.log('Heading/Orientation: '           + position.coords.heading);

  var element = document.getElementById(htmlElementToEdit);
  element.innerHTML = 'Heading/Orientation: '           + position.coords.heading              + '<br />';
};

function getCurrentGPSPosition(elementId) {
  htmlElementToEdit = elementId;
  navigator.geolocation.getCurrentPosition(onGPSSuccess, onError);
}

function getCurrentAltitude(elementId) {
  htmlElementToEdit = elementId;
  navigator.geolocation.getCurrentPosition(onAltitudeSuccess, onError);
}

function getCurrentOrientation(elementId) {
  htmlElementToEdit = elementId;
  navigator.geolocation.getCurrentPosition(onOrientationSuccess, onError);
}

// onError Callback receives a PositionError object
//
function onError(error) {
  console.log('code: '    + error.code    + '\n' +
  'message: ' + error.message + '\n');
}

// Camara

document.addEventListener("deviceready",onDeviceReady,false);


function onDeviceReady() {
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64 encoded image data
  // console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
  console.log(navigator.camera);
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
  }

  // A button will call this function
  //
  function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
      destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
      }

      // Called if something bad happens.
      //
      function onFail(message) {
        alert('Failed because: ' + message);
      }
