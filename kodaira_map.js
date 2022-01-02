var map;

var place_cafe = [], place_famires = [], place_hamburger = [], place_karaoke = [], place_netcafe = [];
var markers_cafe = [], markers_famires = [], markers_hamburger = [], markers_karaoke = [], markers_netcafe = [];

function initMap() {
  var latlng = new google.maps.LatLng(35.7217636, 139.4667473);
  var opts = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), opts);
  var infowindow = new google.maps.InfoWindow();
  createData(kodaira_data.results);
  
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
    markers_cafe[i].addListener('click', function() {
      infowindow.setContent(place_cafe[i].name);
      infowindow.open(map, this);
    });
  }
  var famires_latlng = [];
  for(var j=0; j<place_famires.length; j++){
    famires_latlng[j] = new google.maps.LatLng(place_famires[j].lat,place_famires[j].lng);
    markers_famires[j] = new google.maps.Marker({
      position: famires_latlng[j],
    });
    markers_famires[j].addListener('click', function() {
      infowindow.setContent(place_famires[j].name);  //results[i].name
      infowindow.open(map, this);
    });
  }
  var hamburger_latlng = [];
  for(var k=0; k<place_hamburger.length; k++){
    hamburger_latlng[k] = new google.maps.LatLng(place_hamburger[k].lat,place_hamburger[k].lng);
    markers_hamburger[k] = new google.maps.Marker({
      position: hamburger_latlng[k],
    });
    markers_hamburger[k].addListener('click', function() {
      infowindow.setContent(place_hamburger[k].name);  //results[i].name
      infowindow.open(map, this);
    });
  }
  var karaoke_latlng = [];
  for(var m=0; m<place_karaoke.length; m++){
    karaoke_latlng[m] = new google.maps.LatLng(place_karaoke[m].lat,place_karaoke[m].lng);
    markers_karaoke[m] = new google.maps.Marker({
      position: karaoke_latlng[m],
    });
    markers_karaoke[m].addListener('click', function() {
      infowindow.setContent(place_karaoke[m].name);  //results[i].name
      infowindow.open(map, this);
    });
  }
  var netcafe_latlng = [];
  for(var n=0; n<place_netcafe.length; n++){
    netcafe_latlng[n] = new google.maps.LatLng(place_netcafe[n].lat,place_netcafe[n].lng);
    markers_netcafe[n] = new google.maps.Marker({
      position: netcafe_latlng[n],
    });
    markers_famires[n].addListener('click', function() {
      infowindow.setContent(place_famires[n].name);  //results[i].name
      infowindow.open(map, this);
    });
  }
}

function cafe(){
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setMap(map);
  }
}

function famires(){
  for(var i=0; i<markers_famires.length; i++){
    markers_famires[i].setMap(map);
  }
}

function hamburger(){
  for(var i=0; i<markers_hamburger.length; i++){
    markers_hamburger[i].setMap(map);
  }
}

function karaoke(){
  for(var i=0; i<markers_karaoke.length; i++){
    markers_karaoke[i].setMap(map);
  }
}

function netcafe(){
  for(var i=0; i<markers_netcafe.length; i++){
    markers_netcafe[i].setMap(map);
  }
}

function deletemarkersall(){
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setMap(null);
  }
  for(var j=0; j<markers_famires.length; j++){
    markers_famires[j].setMap(null);
  }
  for(var k=0; k<markers_hamburger.length; k++){
    markers_hamburger[k].setMap(null);
  }
  for(var l=0; l<markers_karaoke.length; l++){
    markers_karaoke[l].setMap(null);
  }
  for(var m=0; m<markers_netcafe.length; m++){
    markers_netcafe[m].setMap(null);
  }
}
//
function initMap() {
  var target = document.getElementById('map');  
  var latlng = {lat: 35.7217636, lng: 139.4667473};  //小平キャンパスの緯度経度
  var map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 14
  });
    
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  var request1 = {
    location: latlng,
    radius: 2000,
    keyword: 'カラオケ館ORカラオケマックORジョイサウンドORカラオケの鉄人ORカラオケパセラORカラオケバンバンOR歌広場ORワンカラ'
  };

  var request2 = {
    location: latlng,
    radius: 2000,
    keyword: '快活クラブORグランサイバーカフェバグースORマンボーORカスタマカフェORコミックバスターORネットカフェジャム'
  };
  
  service.nearbySearch(request1, callback); //カラオケ
  service.nearbySearch(request2, callback); //ネットカフェ

  // カフェ
  for (let i=0; i<kodaira_cafe.results.length; i++) { 
    createMarker(kodaira_cafe.results[i]);
  }
  
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }
  
  function createMarker(place) {
    var placeLoc = place.geometry.location; 
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location  //results[i].geometry.location
    });
 
    marker.addListener('click', function() {
      infowindow.setContent(place.name);  //results[i].name
      infowindow.open(map, this);
    });
  }
}
