var map;
var marker;

var place_cafe = [];
var markers_cafe = [];

function initMap() {
  var latlng = new google.maps.LatLng(35.69092, 139.7002579);
  var opts = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), opts);
  
  createData(shinjuku_data.results);
  
  var m_latlng = new google.maps.LatLng(place_cafe[1].lat,place_cafe[1].lng);
  marker = new google.maps.Marker({
    position: m_latlng,
  });
}

function createData(results) {
  for (let i=0; i<results.length; i++) {
    x = results[i].geometry.location;
    y = results[i].name;
    z = results[i].price_level;
    s = results[i].url
    x["name"] = y;
    x["price"] = z;
    x["url"] = s;

    switch(results[i].shop) {
      case "cafe":
        place_cafe.push(x);
        break;
    }
  } 
}

function doOpen() {
  marker.setMap(map);
}

function doClose() {
  marker.setMap(null);
}
