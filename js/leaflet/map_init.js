
//#########################################################################
//##################### < map_init.js > ###################################
//#########################################################################
//settings for the leaflet-map and functions around the map
//Old Code, reuseable
//TODO: Check, if reuseable or delete all

//#### Map
//Define the map feature
/*	var map = L.map('mapid',  {  zoomControl: false,
		//minZoom: 13,
	//maxZoom: 19,
	attributionControl: false
}).setView([49.8989, 10.8864], 14);*/

//#### Tile Layer
//var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//var osmUrl = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
	//define some maximal bounds for the map
//var boundsMap = new L.LatLngBounds(new L.LatLng(49.863550442243, 10.8333778381347), new L.LatLng(49.936858784171, 10.9542274475097));
//var boundsMap = new L.LatLngBounds(new L.LatLng(49.862554540037856, 10.842304229736326), new L.LatLng(49.926803449543186,10.94186782836914));
//var osmLayer = new L.TileLayer(osmUrl, {
	//minZoom: 13,
    //maxZoom: 19,
		//bounds : boundsMap,
    //attribution: 'Map data © OpenStreetMap contributors'
//		attributionControl: false,
	//});
	//L.control.attribution({position: 'topright'}).addTo(map);
	//add Tile Layer to map
	//map.addLayer(osmLayer);

//#### Layers
//define (no control) and layers
//var playerPositionLayer = L.featureGroup(),
	//  GOTOplacesLayer = L.layerGroup();

//#### Geolocation
//locates user at beginning --> disabled
//map.locate({setView: true, maxZoom: 14, zoomControl: false, enableHighAccuracy: true});
//locate: continous watching of position possible with watch : true; enableHighAccuracy for detail position

//general eventhandler on map
//map.on('locationerror', onLocationError);
//map.on('locationfound', onLocationFound);

//function onLocationError(e) {
  //  console.log("location error:" + e);
//}
/*
function onLocationFound(e) {
 console.log(e);
	showTextOnSnackbar("Position found", 5000);
	//draw circle around actual position
	map.removeLayer(playerPositionLayer);
	playerPositionLayer = L.layerGroup();
  var radius = e.accuracy / 2;
	var loclatlng = L.latLng(e.latitude, e.longitude);
  var posCircle = L.circle(e.latlng, radius, {
            color: 'black',
				fillColor: 'yellow',
            fillOpacity: 0.5
         });
	posCircle.bindPopup("<p>Probably your position</p>");
  posCircle.addTo(playerPositionLayer);
	playerPositionLayer.addTo(map);
*/
	//display player
	//enable QR as locationmethod
	//posCircle.addTo(playerPositionLayer);
	//playerPositionLayer.addTo(map);
 	//mapGOTOadd();

//}

//checks from a given position latlng a certain List of Tasks, if any GOTO-Task is near
/*function checkNearGOTOTask(latlng, List){
	for(var i = 0; i < List.length ; i++){
	var obj = List[i];
	var pos, distance, checker = 0, container_check_check = false;
	//if taskType is GOTO and not yet Done
	//check if container is active; otherwise a blind taskchecking would also be possible
	if(TCAllList[obj.taskcontainer] != undefined && TCAllList[obj.taskcontainer].getActive()){
		container_check = true;
	}else if(episodeList[obj.taskcontainer] != undefined && episodeList[obj.taskcontainer].getActive()){
		container_check = true;
	}
	if((container_check == true) &&(obj instanceof GOTOTask) && (object.valid = "GPS") && obj.getDone() == false && obj.checkPrec() ){

		pos = L.latLng(obj.coord[1], obj.coord[0]);
		distance = pos.distanceTo(latlng);
			if(distance < 35){ // uses the haversine formula?
				obj.setDone();
				var message = obj.name + " completed" ;
				showTextOnSnackbar(message, 3000, "OK");
				checker++;
				}
			}
		}
return checker;
}
*/
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
//taskContainerLayer.addTo(map);
//playerPositionLayer.addTo(map);
//GOTOplacesLayer.addTo(map);
