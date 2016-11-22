var pictureSource;          // Picture source: pictureSource.PHOTOLIBRARY, pictureSource.SAVEDPHOTOALBUM
var destinationType;        // Sets the format of returned value

// The HTML elemente to put the info inside
var gpsHtmlElement;
var compassHtmlElement;
var accelerometerHtmlElement;
var altitudeHtmlElement;
var countryGeolocHtmlElement;
var cityGeolocHtmlElement;
var townGeolocHtmlElement;
var villageGeolocHtmlElement;
var houseNumberGeolocHtmlElement;

// onGPSSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onGPSSuccess = function(position) {
  console.log('Latitude: '          + position.coords.latitude          + '\n' +
  'Longitude: '         + position.coords.longitude         + '\n' +
  'Accuracy: '          + position.coords.accuracy);

  var element = document.getElementById(gpsHtmlElement);
  element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
  'Longitude: '          + position.coords.longitude             + '<br />' +
  'Speed: '           + position.coords.speed             + '<br />' +
  'Accuracy: '           + position.coords.accuracy             + '<br />' +
  'Timestamp: '           + position.timestamp;
};

var onGeolocalizationSuccess = function(position) {
  getCountry(position.coords.latitude, position.coords.longitude, countryGeolocHtmlElement);
  getCity(position.coords.latitude, position.coords.longitude, 'cityLocalizationField');
  getProvince(position.coords.latitude, position.coords.longitude, 'provinceLocalizationField');
  getSuburb(position.coords.latitude, position.coords.longitude, 'suburbLocalizationField');
  getRoad(position.coords.latitude, position.coords.longitude, 'roadLocalizationField');
  getState(position.coords.latitude, position.coords.longitude, 'stateLocalizationField');
  getPostCode(position.coords.latitude, position.coords.longitude, 'postCodeLocalizationField');
  getInstitution(position.coords.latitude, position.coords.longitude, 'institutionLocalizationField');
};

var onAltitudeSuccess = function(altitude) {
  console.log('Altitude: '          + altitude.coords.altitude          + '\n' +
  'Altitude Accuracy: ' + altitude.coords.altitudeAccuracy);

  var element = document.getElementById(altitudeHtmlElement);
  if(altitude.coords.altitude == null) {
    element.innerHTML = 'Altimeter is not available on current device<br />';
  } else {
    element.innerHTML = 'Altitude: '           + altitude.coords.altitude              + '<br />' +
    'Altitude Accuracy: '          + altitude.coords.altitudeAccuracy      + '<br />';
  }
};

var onOrientationSuccess = function(orientation) {
  console.log('Heading/Orientation: '           + orientation.coords.heading);

  if(orientation.coords.heading == null) {
    var element = document.getElementById(compassHtmlElement);
    element.innerHTML = 'Compass is not available on current device<br />';
  } else {
    var element = document.getElementById(compassHtmlElement);
    element.innerHTML = 'Heading/Orientation: '           + orientation.coords.heading              + '<br />';
  }
};

var onAccelerationSuccess = function(acceleration) {
  console.log('Acceleration X: ' + acceleration.x + '\n' +
  'Acceleration Y: ' + acceleration.y + '\n' +
  'Acceleration Z: ' + acceleration.z + '\n' +
  'Timestamp: '      + acceleration.timestamp);

  var element = document.getElementById(accelerometerHtmlElement);
  element.innerHTML = 'Acceleration X: '           + acceleration.x              + '<br />' +
  'Acceleration Y: '           + acceleration.y              + '<br />' +
  'Acceleration Z: '           + acceleration.z              + '<br />' +
  'Timestamp: '           + acceleration.timestamp;
};

function getCurrentGPSPosition(elementId) {
  gpsHtmlElement = elementId;
  navigator.geolocation.getCurrentPosition(onGPSSuccess, onError);
}

function getCurrentAltitude(elementId) {
  altitudeHtmlElement = elementId;
  navigator.geolocation.getCurrentPosition(onAltitudeSuccess, onError);
}

function getCurrentOrientation(elementId) {
  compassHtmlElement = elementId;
  navigator.geolocation.getCurrentPosition(onOrientationSuccess, onError);
}

function getCurrentGeolocalization(elementId) {
  countryGeolocHtmlElement = elementId;
  navigator.geolocation.getCurrentPosition(onGeolocalizationSuccess, onError);
}

function getCurrentAcceleration(elementId) {
  accelerometerHtmlElement = elementId;
  navigator.accelerometer.getCurrentAcceleration(onAccelerationSuccess, onError);
}

function watchDeviceGPSposition(elementId) {
  var options = {
    frequency : 100
  };
  gpsHtmlElement = elementId;
  navigator.geolocation.watchPosition(onGPSSuccess, onError, options);
}

function watchDeviceAcceleration(elementId) {
  accelerometerHtmlElement = elementId;
  var element = document.getElementById(accelerometerHtmlElement);

  var options = {
    frequency : 100
  };

  if(navigator.accelerometer != undefined) {
    navigator.accelerometer.watchAcceleration(onAccelerationSuccess, onError, options);
  } else {
    element.innerHTML = 'Accelerometer is not available on current device<br />';
  }
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
