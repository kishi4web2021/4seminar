var map;
var marker;

var place_cafe = [], place_famires = [], place_hamburger = [], place_karaoke = [], place_netcafe = [];
var markers_cafe = [], markers_famires = [], markers_hamburger = [], markers_karaoke = [], markers_netcafe = [];

function initMap() {
  var latlng = new google.maps.LatLng(35.69092, 139.7002579);
  var opts = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), opts);
  
  createData(shinjuku_data.results);
  
  //var m_latlng = new google.maps.LatLng(place_hamburger[1].lat,place_hamburger[1].lng);
  //marker = new google.maps.Marker({
    //position: m_latlng,
  //});
  createcafemarker();
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
}

function createcafemarker(){
  var m_latlng = [];
  for(var i=0; i<place_cafe.length; i++){
    m_latlng[i] = new google.maps.LatLng(place_cafe[i].lat,place_cafe[i].lng);
    markers_cafe[i] = new google.maps.Marker({
      position: m_latlng[i],
    });
  }
}

function cafe(w){
  if(w=1){
    markers_cafe.setMap(map);
  }else{
    markers_cafe.setMap(null);
  }
}

function doOpen() {
  markers_cafe[1].setMap(map);
}

function doClose() {
  markers_cafe[1].setMap(null);
}
