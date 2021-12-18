var map;
var currentInfoWindow = null;

var place_cafe = [], place_famires = [], place_hamburger = [], place_karaoke = [], place_netcafe = [];
var markers_cafe = [], markers_famires = [], markers_hamburger = [], markers_karaoke = [], markers_netcafe = []; 

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
      case "famires":
        place_famires.push(x);
        break;
      case "hamburger":
        place_hamburger.push(x);
        break;
      case "karaoke":
        place_karaoke.push(x);
        break;
      case "netcafe":
        place_netcafe.push(x);
        break;
    }
  } 
  /*
  place:
  {
    i:
      lat: xxx
      lng: yyy
      name: "zzz"
      price: 0
  }
  */
}

function createMarker(i, place) {
  var marker = new google.maps.Marker({
    position: { lat:place[i].lat, lng:place[i].lng },
    map: map,
    title: place[i].name,
  });

  //markers.push(marker);

  var contentStr = '<a>' + place[i].name + '<br>●Wi-Fi</a><br><a href=' + place[i].url + '>Google検索</a>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentStr,
  });

  google.maps.event.addListener(marker, 'click', function(){
    if(currentInfoWindow != null) {
      currentInfoWindow.close();
    }
    infoWindow.open(map, marker);
    currentInfoWindow = infoWindow;
  });
}

// Sets the map on all markers in the array.
function setMapOnAll(map,markers){
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers(markers) {
  hideMarkers();
  markers = [];
}

function cafe() {
  //if(n=1){
  for (var i=0; i<place_cafe.length; i++) {
    createMarker(i, place_cafe);
  }
  //setMapOnAll(map,markers_cafe);
  
    //showMarkers();
  //}else{
    //for (let i = 0; i < markers_cafe.length; i++) {
      //markers_cafe[i].setMap(null);
    //}
    //markers_cafe = [];
  //}
}

function famires() {
  for (var i=0; i<place_famires.length; i++) {
    createMarker(i, place_famires, markers_famires);
  }
}

function hamburger() {
  for (var i=0; i<place_hamburger.length; i++) {
    createMarker(i, place_hamburger, markers_hamburger);
  }
}

function karaoke() {
  for (var i=0; i<place_karaoke.length; i++) {
    createMarker(i, place_karaoke, markers_karaoke);
  }
}

function netcafe() {
  for (var i=0; i<place_netcafe.length; i++) {
    createMarker(i, place_netcafe, markers_netcafe);
  }
}

function initMap() {
  var target = document.getElementById('map');  
  var latlng = { lat: 35.69092, lng: 139.7002579 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 16
  });
  createData(shinjuku_data.results);
  //cafe();
  //famires();
  //hamburger(); 
  //karaoke();
  //netcafe();
}
