// Getting the Country name from the given 'latitude' and 'longitude'

function showCountry(lat, lon) {
    $.getJSON('//nominatim.openstreetmap.org/reverse?json_callback=?&format=json', {lat: lat, lon: lon}, function(data) {
       console.log(data.address.country);
   });
}
