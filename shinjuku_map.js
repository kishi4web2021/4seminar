var map;
var currentInfoWindow = null;

var place_cafe = [], place_famires = [], place_hamburger = [], place_karaoke = [], place_netcafe = [];
var markers_cafe = [], markers_famires = [], markers_hamburger = [], markers_karaoke = [], markers_netcafe = []; 

function createData(results) {
    for (let i=0; i<results.length; i++) {
	x = results[i].geometry.location;
	y = results[i].name;
	z = results[i].price_level;
	
	r = results[i].distance;
	s = results[i].url;
	t = results[i].website;
	u = results[i].hours;
	    
	x["name"] = y;
	x["price"] = z;
	
	x["distance"] = r;
	x["url"] = s;
	x["website"] = t;
	x["hours"] = u;

    switch(results[i].shop) {
      case "cafe":
	x["icon_path"] = './img/icon1.png'
	place_cafe.push(x);
        break;
      case "famires":
	x["icon_path"] = './img/icon2.png'
	place_famires.push(x);
        break;
      case "hamburger":
	x["icon_path"] = './img/icon3.png'
	place_hamburger.push(x);
        break;
      case "karaoke":
	x["icon_path"] = './img/icon4.png'
	place_karaoke.push(x);
        break;
      case "netcafe":
	x["icon_path"] = './img/icon5.png'
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
      url: "https://..."
  }
  */
}

function createMarker(i, place) {
  var marker = new google.maps.Marker({
    position: { lat:place[i].lat, lng:place[i].lng },
    map: map,
    title: place[i].name,
    icon: {
	url: place[i].icon_path ,
	scaledSize: new google.maps.Size( 27, 40 ) ,
  }

  });

    //markers.push(marker);

    var date = new Date();
    var dayOfWeek = date.getDay();
    
    var contentStr = '<a>' + place[i].name + '<br>●Wi-Fi<br>●新宿駅から' + place[i].distance + 'm<br>●本日の営業時間：(後で変更予定)' + '</a>' + '<br><a href=';

    if(place[i].website){
	contentStr = contentStr + place[i].website + '>ホームページ</a> / '
    }
    contentStr = contentStr + '<a href=' + place[i].url + '>Google検索</a>'
    

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

function initMap() {
  var latlng = new google.maps.LatLng(35.69092, 139.7002579);
  var opts = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), opts);
  
  createData(shinjuku_data.results);
  
  createmarker();
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
