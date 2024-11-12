'use strict';

var osmTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
});

var googleTiles = L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://maps.google.com/">Google</a>'
});

var esriTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
})

var baseMaps = {
  "OpenStreetMap": osmTiles,
  "Google": googleTiles,
  "ESRI": esriTiles
};

var startingCoord = [34.8697, -111.7610]

var myMap = L.map('mapId', {
  zoomControl: false,
  layers: [osmTiles, googleTiles]
}).setView(startingCoord, 13);

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


function getTimeDirection(event, lat, lng) {
  var hour = ((event.getHours() + 11) % 12 + 1);
  var meridian = " AM";
  if (event.getHours() >= 12) {
    meridian = " PM";
  }

  var time = hour + ':' + ('0' + event.getMinutes()).slice(-2);
  var position = SunCalc.getPosition(event, lat, lng);
  var azimuth = (position.azimuth * 180 / Math.PI + 180) % 360;

  return time + meridian + ", " + azimuth.toFixed(0).toString() + "°";
}

// Function to handle map click events
function onMapClick(e) {
  // Get the coordinates of the clicked point
  var decimalPlaces = 6
  var lat = e.latlng.lat.toFixed(decimalPlaces);
  var lng = e.latlng.lng.toFixed(decimalPlaces);
  var times = SunCalc.getTimes(new Date(), lat, lng);

  var message = "<a href=\"https://www.google.com/maps/@" + lat.toString() + "," + lng.toString() + ",230m\">" + lat + ", " + lng + "</a>";
  message += "<br>Sunrise: " + getTimeDirection(times.sunrise, lat, lng);
  message += "<br>Solar Noon: " + getTimeDirection(times.solarNoon, lat, lng);
  message += "<br>Golden Hour: " + getTimeDirection(times.goldenHour, lat, lng);
  message += "<br>Sunset: " + getTimeDirection(times.sunset, lat, lng);
  message += "<br><br><a href=\"https://www.timeanddate.com/worldclock/@" + lat.toString() + "," + lng.toString() + "\">TimeAndDate.com</a>";
  message += "<br><a href=\"https://www.windy.com/" + lat.toString() + "/" + lng.toString() + "?" + lat.toString() + "," + lng.toString() + ",12\">Windy.com</a>";
  message += "<br><a href=\"https://forecast.weather.gov/MapClick.php?lat=" + lat.toString() + "&lon=" + lng.toString() + "\">Weather.gov</a>";


  // Create a popup with the coordinates
  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(message)
    .openOn(myMap);
}

// Add a click event listener to the map
myMap.on('click', onMapClick);

// Tile Switch Control
var currentTiles = osmTiles;
L.Control.SwitchTilesControl = L.Control.extend({
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-control switch-tiles-control');
    container.innerHTML = '<button id="switchTiles">Switch Tiles</button>';

    // Stop click event propagation
    L.DomEvent.on(container, 'click', function (e) {
      L.DomEvent.stopPropagation(e);
    });

    container.onclick = function () {
      if (currentTiles === osmTiles) {
        map.removeLayer(osmTiles);
        map.addLayer(googleTiles);
        currentTiles = googleTiles;
      } else {
        map.removeLayer(googleTiles);
        map.addLayer(osmTiles);
        currentTiles = osmTiles;
      }
    };
    return container;
  }
});

L.control.switchTilesControl = function (opts) {
  return new L.Control.SwitchTilesControl(opts);
}

L.control.switchTilesControl({ position: 'topleft' }).addTo(myMap);
var layerControl = L.control.layers(baseMaps).addTo(map);
