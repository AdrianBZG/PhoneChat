var mymap;
var marker;
var currentLatitude;
var currentLongitude;

var onChangeGenericMapView = function(position) {
  console.log('holaaaaa3');

  console.log('Latitude: '          + position.coords.latitude          + '\n' +
  'Longitude: '         + position.coords.longitude         + '\n' +
  'Accuracy: '          + position.coords.accuracy);

  console.log(position.coords.latitude);
  console.log(position.coords.latitude);
};

function onError(error) {
  console.log('code: '    + error.code    + '\n' +
  'message: ' + error.message + '\n');
}

function initializeGenericMap() {
  if(mymap == undefined) {
    mymap = L.map('mapid').setView([28.4835557, -16.3255379], 15);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'PhoneChat Map System',
      id: 'mapbox.streets'
    }).addTo(mymap);

    marker = L.marker([28.4835557, -16.3255379]).addTo(mymap);
    marker.bindPopup("<b>You are here!</b>").openPopup();

  } else {
    // Remove the previous marker
    mymap.removeLayer(marker);

    // Get GPS position
    getCurrentGPSPosition();

    // DEBUG
    /*console.log(top.glob['lat']);
    console.log(top.glob['lon']);*/

    // Put the new marker with popup
    marker = L.marker([top.glob['lat'], top.glob['lon']]).addTo(mymap);
    marker.bindPopup("<b>You are here!</b>").openPopup();
  }
}

function changeGenericMapViewToCurrentPosition() {
  console.log('holaaaaa');
  navigator.geolocation.getCurrentPosition(onChangeGenericMapView, onError);
  console.log('holaaaaa2');
}
