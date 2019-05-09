
//#########################################################################
//##################### < map_init.js > ###################################
//#########################################################################
//settings for the leaflet-map and functions around the map
//Old Code, reuseable
//TODO: Check, if reuseable or delete all

//#### Map
//Define the map feature
var map = L.map('mapid',  {  zoomControl: true,
		//minZoom: 13,
	//maxZoom: 19,
	attributionControl: false,
	zoomControl: false
}).setView([48.14376046470259, 11.56906379032135], 13);

var titleControl = L.Control.extend({
  options: {
    position: 'topleft'
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  },
onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    //container.type = 'button';
    container.title = `Der Stadtplan`;
    container.innerHTML = `<span class="mdc-typography mdc-typography--subtitle2">
<i class="material-icons">map</i> Stadtplan</span>`;
    container.style.backgroundColor = 'white';
    container.style.width = '90px';
    container.style.height = '30px';
    return container;
  }

});

map.addControl(new titleControl ());
var zoomcontrol = new L.Control.Zoom({ position: 'topleft' }).addTo(map);

//#### Tile Layer
//var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmUrl = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
	//define some maximal bounds for the map
var boundsMap = new L.LatLngBounds(new L.LatLng(47.90, 11.40), new L.LatLng(48.30,  11.80));
//var boundsMap = new L.LatLngBounds(new L.LatLng(49.862554540037856, 10.842304229736326), new L.LatLng(49.926803449543186,10.94186782836914));
var osmLayer = new L.TileLayer(osmUrl, {
	minZoom: 12,
    maxZoom: 19,
		bounds : boundsMap,
    attribution: 'Map data © OpenStreetMap contributors',
		attributionControl: false
	});
	L.control.attribution({position: 'bottomleft'}).addTo(map);
	//add Tile Layer to map
	map.addLayer(osmLayer);

// Layer
	var pubsListSureLayer = L.featureGroup();

//Helper functions
	//shows the map on a specific location
	//f.e. show task on map
	function MapshowCoord(lat, lng){
		var posOnMap = L.latLng(lat,lng);
		map.setView(posOnMap, 19);
	}

	//TODO: show map on given pubid
	//multiple maps are possible -> use different marker color?
	function MapShowPubID(id, lat, lng){
		console.log(lat);
		console.log(lng);
		MapshowCoord(lat, lng);
		map.invalidateSize();

	}
//
	function mapAllPubsAdd(){
	map.removeLayer(pubsListSureLayer);
	pubsListSureLayer = L.featureGroup();
	DBgeo.allDocs({
	    include_docs: true
	  },function(err, doc){
			console.log(doc)
				for(var doc2 in doc.rows){
					spot = doc.rows[doc2].doc;
					var posCircle;
					if(spot.language == undefined){ //remove indexes
						if(spot.body.latlng != null && JSON.stringify(spot.body.latlng[0]).match('[0-9][0-9]\.[0.9]+') && JSON.stringify(spot.body.latlng[1]).match('[0-9][0-9]\.[0-9]+')){

									var pos = L.latLng(spot.body.latlng[0], spot.body.latlng[1]);
									posCircle = L.marker([spot.body.latlng[0], spot.body.latlng[1]]);
									posCircle.addressinfo = spot.body;
									posCircle.target = spot.target;
									posCircle.id = spot.id;
									posCircle.spot = spot;

									posCircle.addTo(pubsListSureLayer);
									//posCircle.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
									posCircle.on('click', showMapPubDialog);
									//posCircle.on('click', alert('click'));
								}
								}
								}

	    });
			console.log(pubsListSureLayer);
			pubsListSureLayer.addTo(map);
	  };


//#### Layers
//define (no control) and layers
//var playerPositionLayer = L.featureGroup(),
	//  GOTOplacesLayer = L.layerGroup();

//##############################################################################
//##############################################################################
//shows the map on a specific location
//f.e. show task on map
/*function MapshowCoord(lat, lng){
	var posOnMap = L.latLng(lat,lng);
	map.setView(posOnMap, 16);
}*/

// add feature groups to the map
pubsListSureLayer.addTo(map);
//taskContainerLayer.addTo(map);
//playerPositionLayer.addTo(map);
//GOTOplacesLayer.addTo(map);

var randomControl = L.Control.extend({
  options: {
    position: 'topleft'
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  },
onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom material-icons-outlined');
    //container.type = 'button';
    container.title = 'Zufälliges Wirtshaus';
    container.innerHTML = 'shuffle';
    container.style.backgroundColor = 'white';
    container.style.width = '30px';
    container.style.height = '30px';

    container.onclick = function(){
      showRandomPub();
    }
    return container;
  }

});

map.addControl(new randomControl ());



function showRandomPub(){
	var keys = Object.keys(pubsListSureLayer._layers)
	var randomProperty = pubsListSureLayer._layers[keys[ keys.length * Math.random() << 0]];
console.log(randomProperty);
MapShowPubID(randomProperty.spot.targer, randomProperty._latlng.lat, randomProperty._latlng.lng);
showTextOnSnackbar("Zufälliges Wirtshaus ausgewählt!", 5000);

}
