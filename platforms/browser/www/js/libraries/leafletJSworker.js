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
    // Get GPS position
    getCurrentGPSPosition();
    mymap = L.map('mapid').setView([top.glob['lat'], top.glob['lon']], 15);

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map @ PhoneChat';
    var osm = new L.TileLayer(osmUrl);

    mymap.addLayer(osm);

    marker = L.marker([top.glob['lat'], top.glob['lon']]).addTo(mymap);
    marker.bindPopup("<b>You are here!</b>").openPopup();

    mymap.invalidateSize();

    // Update button
    $("#toggleMapButton").html('Update map');

  } else {
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map @ PhoneChat';
    var osm = new L.TileLayer(osmUrl);

    mymap.addLayer(osm);

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
    mymap.invalidateSize();
  }
}

function changeGenericMapViewToCurrentPosition() {
  navigator.geolocation.getCurrentPosition(onChangeGenericMapView, onError);
}

function redirectToMapPage() {
  initializeGenericMap();
  $().redirect('#whereAmI');
}
