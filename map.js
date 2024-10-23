'use strict';
var myMap = L.map('mapId', { zoomControl: false })
	.setView([34.8697, -111.7610], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(myMap);


var marker = L.marker([34.8697, -111.7610])
  // .addTo(myMap)
  .bindPopup('<b>Santos - SP</b>')
  .openPopup();

L.Control.geocoder({
  defaultMarkGeocode: false,
  placeholder: "Search address..."
}).on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(myMap);
    myMap.fitBounds(poly.getBounds());
  })
  .addTo(myMap);

// Function to handle map click events
function onMapClick(e) {
  // Get the coordinates of the clicked point
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  // Create a popup with the coordinates
  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent("Coordinates: " + lat + ", " + lng)
    .openOn(myMap);
}

// Add a click event listener to the map
myMap.on('click', onMapClick);