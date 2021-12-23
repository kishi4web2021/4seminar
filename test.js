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
  createmarker();
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

function createmarker(){
  var cafe_latlng = [];
  for(var i=0; i<place_cafe.length; i++){
    cafe_latlng[i] = new google.maps.LatLng(place_cafe[i].lat,place_cafe[i].lng);
    markers_cafe[i] = new google.maps.Marker({
      position: cafe_latlng[i],
    });
  }
  var famires_latlng = [];
  for(var j=0; j<place_famires.length; j++){
    famires_latlng[j] = new google.maps.LatLng(place_famires[j].lat,place_famires[j].lng);
    markers_famires[j] = new google.maps.Marker({
      position: famires_latlng[j],
    });
  }
  var hamburger_latlng = [];
  for(var k=0; k<place_hamburger.length; k++){
    hamburger_latlng[k] = new google.maps.LatLng(place_hamburger[k].lat,place_hamburger[k].lng);
    markers_hamburger[k] = new google.maps.Marker({
      position: hamburger_latlng[k],
    });
  }
  var karaoke_latlng = [];
  for(var m=0; m<place_karaoke.length; m++){
    karaoke_latlng[m] = new google.maps.LatLng(place_karaoke[m].lat,place_karaoke[m].lng);
    markers_karaoke[m] = new google.maps.Marker({
      position: karaoke_latlng[m],
    });
  }
  var netcafe_latlng = [];
  for(var n=0; n<place_netcafe.length; n++){
    netcafe_latlng[n] = new google.maps.LatLng(place_netcafe[n].lat,place_netcafe[n].lng);
    markers_netcafe[n] = new google.maps.Marker({
      position: netcafe_latlng[n],
    });
  }
}

function cafe(w){
  if(w=1){
    for(var i=0; i<markers_cafe.length; i++){
      markers_cafe[i].setMap(map);
    }
  }else{
    for(var i=0; i<markers_cafe.length; i++){
      markers_cafe[i].setMap(null);
    }
  }
}

function famires(w){
  if(w=1){
    for(var i=0; i<markers_famires.length; i++){
      markers_famires[i].setMap(map);
    }
  }else{
    for(var i=0; i<markers_famires.length; i++){
      markers_famires[i].setMap(null);
    }
  }
}

function hamburger(w){
  if(w=1){
    for(var i=0; i<markers_hamburger.length; i++){
      markers_hamburger[i].setMap(map);
    }
  }else{
    for(var i=0; i<markers_hamburger.length; i++){
      markers_hamburger[i].setMap(null);
    }
  }
}

function karaoke(w){
  if(w=1){
    for(var i=0; i<markers_karaoke.length; i++){
      markers_karaoke[i].setMap(map);
    }
  }else{
    for(var i=0; i<markers_cafe.length; i++){
      markers_karaoke[i].setMap(null);
    }
  }
}

function netcafe(w){
  if(w=1){
    for(var i=0; i<markers_netcafe.length; i++){
      markers_netcafe[i].setMap(map);
    }
  }else{
    for(var i=0; i<markers_netcafe.length; i++){
      markers_netcafe[i].setMap(null);
    }
  }
}

function doOpen() {
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setMap(map);
  }
}

function doClose() {
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setMap(null);
  }
}
