function initMap() {
  var target = document.getElementById('map');  
  var latlng = {lat: 35.69092, lng: 139.7002579};  //新宿駅の緯度経度
  var map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 16
  });
  
  //情報ウィンドウのインスタンスの生成（後でマーカーに紐付け）
  var infowindow = new google.maps.InfoWindow();
  
  //PlacesService のインスタンスの生成（引数に map を指定）
  var service = new google.maps.places.PlacesService(map);

  var request1 = {
    location: latlng,  //検索するロケーション
    radius: 300,  //検索する半径（メートル）
    keyword: 'カラオケ館ORカラオケマックORジョイサウンドORカラオケの鉄人ORカラオケパセラORカラオケバンバンOR歌広場ORワンカラ'
  };

  var request2 = {
    location: latlng,  //検索するロケーション
    radius: 300,  //検索する半径（メートル）
    keyword: '快活クラブORグランサイバーカフェバグースORマンボーORカスタマカフェORコミックバスターORネットカフェジャム'
  };
  
  //種類（タイプ）やキーワードをもとに施設を検索（プレイス検索）するメソッド nearbySearch()
  //コールバック関数（callback）は別途定義
  service.nearbySearch(request1, callback); //カラオケ
  service.nearbySearch(request2, callback); //ネットカフェ
  
  //コールバック関数には results, status が渡されるので、status により条件分岐
  function callback(results, status) {
    // status は以下のような定数で判定（OK の場合は results が配列で返ってきます）
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      //results の数だけ for 文で繰り返し処理
      for (var i = 0; i < results.length; i++) {
        //createMarker() はマーカーを生成する関数（別途定義）
        createMarker(results[i]);
      }
    }
  }
  
  //マーカーを生成する関数（引数には検索結果の配列 results[i] が入ってきます）
  function createMarker(place) {
    //var placeLoc = place.geometry.location; 
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location  //results[i].geometry.location
    });
 
    //マーカーにイベントリスナを設定
    marker.addListener('click', function() {
      infowindow.setContent(place.name);  //results[i].name
      infowindow.open(map, this);
    });
  }
}
