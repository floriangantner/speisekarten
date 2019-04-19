
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
	attributionControl: false
}).setView([48.14376146470259, 11.59856379032135], 18);

//#### Tile Layer
//var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmUrl = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
	//define some maximal bounds for the map
var boundsMap = new L.LatLngBounds(new L.LatLng(48.03264168282481, 11.419601440429688), new L.LatLng(48.24251013172835,  11.766357421875));
//var boundsMap = new L.LatLngBounds(new L.LatLng(49.862554540037856, 10.842304229736326), new L.LatLng(49.926803449543186,10.94186782836914));
var osmLayer = new L.TileLayer(osmUrl, {
	minZoom: 12,
    maxZoom: 19,
		bounds : boundsMap,
    attribution: 'Map data © OpenStreetMap contributors',
		attributionControl: false
	});
	L.control.attribution({position: 'topright'}).addTo(map);
	//add Tile Layer to map
	map.addLayer(osmLayer);

// Layer
	var pubsListSureLayer = L.featureGroup();

//Helper functions
	//shows the map on a specific location
	//f.e. show task on map
	function MapshowCoord(lat, lng){
		var posOnMap = L.latLng(lat,lng);
		map.setView(posOnMap, 16);
	}

	//TODO: show map on given pubid
	//multiple maps are possible -> use different marker color?
	function MapShowPubID(id, lat, lng){
		alert("not yet implemented");
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
									var pos = L.latLng(spot.latlng[0], spot.latlng[1]);
									posCircle = L.marker([spot.latlng[0], spot.latlng[1]]);
									posCircle.addTo(pubsListSureLayer);
									//posCircle.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
									posCircle.on('click', showMapPubDialog);
									//posCircle.on('click', alert('click'));
									posCircle.addressinfo = spot;
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

//##############################################################################
//##############################################################################
//add GOTO-places to map
/*function mapGOTOadd (){
//this function adds a list of all GOTO-Places in the TaskList to the Map
//is created, when map is opened
//remove previous layer, if possible
map.removeLayer(GOTOplacesLayer);
GOTOplacesLayer = L.layerGroup();
	for(var spot_iterator in spotList){
		var posCircle;
		var spot = spotList[spot_iterator];

		if(spot instanceof GOTOSpot){
				if(spot.coord != undefined){
					//only display spots, which tour is active and whose preconditions are fulfilled
						if(spot.checkPrec() == true && tourList[spot.tour] != undefined && tourList[spot.tour].active == true)
						var pos = L.latLng(spot.coord[1], spot.coord[0]);
						posCircle = L.marker(pos);
				 		posCircle.addTo(GOTOplacesLayer);
						posCircle.on('click', map_show_spot_popup);
						posCircle.spotid = spot.id;

					}
			 }
		 }
GOTOplacesLayer.addTo(map);
}*/

// add feature groups to the map
pubsListSureLayer.addTo(map);
//taskContainerLayer.addTo(map);
//playerPositionLayer.addTo(map);
//GOTOplacesLayer.addTo(map);
