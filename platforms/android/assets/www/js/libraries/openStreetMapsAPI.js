// Getting the Country name from the given 'latitude' and 'longitude'

function showCountry(lat, lon) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    console.log(data.address.country);
  });
}

function getCountry(lat, lon, elementId) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    $('#'+elementId).html('Country: ' + data.address.country);
  });
}

function getCity(lat, lon, elementId) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    $('#'+elementId).html('City: ' + data.address.city);
  });
}

function getProvince(lat, lon, elementId) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    $('#'+elementId).html('Province: ' + data.address.county);
  });
}

function getState(lat, lon, elementId) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    $('#'+elementId).html('State: ' + data.address.state);
  });
}

function getPostCode(lat, lon, elementId) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    $('#'+elementId).html('Postcode: ' + data.address.postcode);
  });
}

function getInstitution(lat, lon, elementId) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    $('#'+elementId).html('Institution: ' + data.address.parking);
  });
}

function getSuburb(lat, lon, elementId) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    $('#'+elementId).html('Suburb: ' + data.address.suburb);
  });
}

function getRoad(lat, lon, elementId) {
  $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
    $('#'+elementId).html('Road: ' + data.address.road);
  });
}
