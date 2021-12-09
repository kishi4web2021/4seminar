function initMap() {
  var target = document.getElementById('map');  
  var latlng = {lat: 35.7217636, lng: 139.4667473};  //小平キャンパスの緯度経度
  var map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 20
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
    //var placeLoc = place.geometry.location; 
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
