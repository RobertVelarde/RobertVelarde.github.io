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

// This variable will hold the reference to the sunrise line layer
var sunriseLine;
var sunsetLine;

var myMap = L.map('mapId', {
  zoomControl: false,
  layers: [osmTiles, googleTiles]
}).setView(startingCoord, 13);

// Create a new pane for our popups that will be behind the lines
myMap.createPane('backgroundPopupPane');

// Set its z-index to be lower than the overlay pane (which is 400)
myMap.getPane('backgroundPopupPane').style.zIndex = 399;

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
  // --- START: New code to remove the previous line ---
  // If a sunrise line already exists on the map, remove it
  if (sunriseLine) {
    myMap.removeLayer(sunriseLine);
  }
  if (sunsetLine) {
    myMap.removeLayer(sunsetLine);
  }

  // --- END: New code to remove the previous line ---

  // Get the coordinates of the clicked point
  var decimalPlaces = 6;
  var lat = e.latlng.lat.toFixed(decimalPlaces);
  var lng = e.latlng.lng.toFixed(decimalPlaces);

  // Get the sun times from SunCalc. These times are in the user's local timezone.
  var times = SunCalc.getTimes(new Date(), lat, lng);

  // --- START: New code for drawing the sunrise line ---

  // 1. Get the sunrise position to calculate the azimuth (angle)
  var sunrisePos = SunCalc.getPosition(times.sunrise, lat, lng);
  var sunsetPos = SunCalc.getPosition(times.sunset, lat, lng);

  // 2. Convert the azimuth from radians (where South=0) to a standard bearing in degrees (where North=0)
  var sunriseBearing = (sunrisePos.azimuth * 180 / Math.PI + 180) % 360;
  var sunsetBearing = (sunsetPos.azimuth * 180 / Math.PI + 180) % 360;

  // 3. Define a helper function to calculate an endpoint given a start point, bearing, and distance
  function calculateDestinationPoint(startLat, startLng, bearing, distanceKm) {
    const R = 6371; // Earth's radius in kilometers
    const brng = bearing * Math.PI / 180; // Convert bearing to radians
    const lat1 = startLat * Math.PI / 180;
    const lon1 = startLng * Math.PI / 180;

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distanceKm / R) +
      Math.cos(lat1) * Math.sin(distanceKm / R) * Math.cos(brng));

    const lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(distanceKm / R) * Math.cos(lat1),
      Math.cos(distanceKm / R) - Math.sin(lat1) * Math.sin(lat2));

    // Convert back to degrees
    const endLat = lat2 * 180 / Math.PI;
    const endLon = lon2 * 180 / Math.PI;

    return L.latLng(endLat, endLon);
  }

  // 4. Calculate a distant point
  var endPointSunrise = calculateDestinationPoint(lat, lng, sunriseBearing, 10);
  var endPointSunset = calculateDestinationPoint(lat, lng, sunsetBearing, 10);

  // 5. Create the line using L.polyline and add it to the map. Store the reference.
  sunriseLine = L.polyline([e.latlng, endPointSunrise], {
    color: 'orange', // Style the line to represent sunrise
    weight: 2,
    opacity: 0.75
  }).addTo(myMap);
  sunsetLine = L.polyline([e.latlng, endPointSunset], {
    color: 'red', // Style the line to represent sunset
    weight: 2,
    opacity: 0.75
  }).addTo(myMap);

  // --- END: New code for drawing the sunrise line ---

  // Get the IANA timezone string for the clicked location
  var targetTimeZone = tzlookup(lat, lng);

  // Get the user's current timezone offset in minutes
  var userTimezoneOffset = new Date().getTimezoneOffset();

  // A function to get the timezone offset in minutes for a given IANA timezone string
  function getTargetTimezoneOffset(timeZone) {
    var now = new Date();
    var utcString = now.toLocaleString('en-US', { timeZone: 'UTC' });
    var targetString = now.toLocaleString('en-US', { timeZone: timeZone });
    var offset = (new Date(utcString) - new Date(targetString)) / (1000 * 60);
    return offset;
  }

  // Get the timezone offset for the clicked location
  var targetTimezoneOffset = getTargetTimezoneOffset(targetTimeZone);

  // Calculate the total adjustment needed in minutes.
  var adjustmentMinutes = userTimezoneOffset - targetTimezoneOffset;

  // Function to adjust a date object by a given number of minutes
  function adjustTime(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  // Adjust each of the sun times by the calculated difference
  var sunriseLocal = adjustTime(times.sunrise, adjustmentMinutes);

  var solarNoonLocal = adjustTime(times.solarNoon, adjustmentMinutes);
  var solarNoonBearing = (SunCalc.getPosition(solarNoonLocal, lat, lng).azimuth * 180 / Math.PI + 180) % 360;

  var goldenHourLocal = adjustTime(times.goldenHour, adjustmentMinutes);
  var goldenHourBearing = (SunCalc.getPosition(goldenHourLocal, lat, lng).azimuth * 180 / Math.PI + 180) % 360;

  var sunsetLocal = adjustTime(times.sunset, adjustmentMinutes);

  // Function to format a date object into a readable HH:MM string
  function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var meridian = " AM";
    if (hours >= 12) {
      meridian = " PM";
      if (hours > 12) {
        hours -= 12;
      }
    } else if (hours === 0) {
      hours = 12; // Midnight case
    }
    return hours + ':' + ('0' + minutes).slice(-2) + meridian;
  }

  var message = "<a href=\"https://www.google.com/maps/@" + lat.toString() + "," + lng.toString() + ",230m\">" + lat + ", " + lng + "</a>";
  message += "<br><b>Timezone:</b> " + targetTimeZone;
  message += "<br><b>Sunrise:</b> " + formatTime(sunriseLocal) + " (" + sunriseBearing.toFixed(0).toString() + "°" + ")";
  message += "<br><b>Solar Noon:</b> " + formatTime(solarNoonLocal) + " (" + solarNoonBearing.toFixed(0).toString() + "°" + ")";
  message += "<br><b>Golden Hour:</b> " + formatTime(goldenHourLocal) + " (" + goldenHourBearing.toFixed(0).toString() + "°" + ")";
  message += "<br><b>Sunset:</b> " + formatTime(sunsetLocal) + " (" + sunsetBearing.toFixed(0).toString() + "°" + ")";
  message += "<br><br><a href=\"https://www.timeanddate.com/worldclock/@" + lat.toString() + "," + lng.toString() + "\">TimeAndDate.com</a>";
  message += "<br><a href=\"https://www.windy.com/" + lat.toString() + "/" + lng.toString() + "?" + lat.toString() + "," + lng.toString() + ",12\">Windy.com</a>";
  message += "<br><a href=\"https://forecast.weather.gov/MapClick.php?lat=" + lat.toString() + "&lon=" + lng.toString() + "\">Weather.gov</a>";

  // Create a popup with the coordinates and the corrected local times
  var popup = L.popup({ pane: 'backgroundPopupPane' })
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
