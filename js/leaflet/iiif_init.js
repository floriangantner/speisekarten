
var map_iiif = L.map('iiifmap', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 3,
  anno: false
});;
map_iiif.invalidateSize();
var baseLayer = L.tileLayer.iiif(
  'https://stacks.stanford.edu/image/iiif/cv770rd9515%2F0767_23A_SM/info.json'
).addTo(map_iiif);

var markerLayer = L.featureGroup();
markerLayer.addTo(map_iiif);
markerLayer.anno = true;
map_iiif.anno = false;

var editableLayers = new L.featureGroup()
map_iiif.addLayer(editableLayers);
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: editableLayers
  },
  draw: {
    polygon: false,
    marker: false,
    circle:false,
    polyline:false,
    circlemarker:false,
    rectangle: {
      repeatMode: false,
      showRadius: false,
      shapeOptions: {
                    color: '#bada55',
      }
    }
}
})
map_iiif.addControl(drawControl);
    L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Zeichne ein Rechteck';

// Add a new editable rectangle when clicking on the button.
//button.addEventListener('click', function(event) {
  //event.preventDefault();

map_iiif.on(L.Draw.Event.CREATED, function (e) {
  //remove previous rectangles
  editableLayers.clearLayers();
  var type = e.layerType
  var layer = e.layer;

  // Do whatever else you need to. (save to db, add to map etc)
  layer.id = 'anno_coord';
  layer.on('click', onAddedRectMapClick);

  editableLayers.addLayer(layer);
  map_iiif.invalidateSize();
});

/*
var baseMaps = {
    "Layer" : baseLayer
};

var overlayMaps = {
    "Edit" : editableLayers,
    "Marker" : markerLayer
};
L.control.layers(baseMaps, overlayMaps).addTo(map_iiif);
map_iiif.invalidateSize();
*/


function loadTileLayer(url){

if (map_iiif != undefined){
map_iiif.eachLayer(function (layer) {
    map_iiif.removeLayer(layer);
});

  var iiif_layer = L.tileLayer.iiif(url);
  //iiif_layer.addTo(map_iiif);
}
}

function initIIIFMap(){
  loadTileLayer('https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json');
  //addAnnos(null);
  //addButtons();
  map_iiif.invalidateSize();
}


function addAnnos(id){
var markerLayer = L.featureGroup();
console.log(map_iiif.anno);
if(map_iiif.anno === false){
var posCircle;
      var pos = L.latLng(-40, 20);
      posCircle = L.marker(pos);
      posCircle.addTo(markerLayer);
      var polygon = L.polygon([
          [-30, 20],
          [-60, 60],
          [-40, 30]
      ]).addTo(markerLayer);
      posCircle.on('click', showAnnotationInfoDialog);
      polygon.on('click', showAnnotationInfoDialog);
      markerLayer.anno = true;
      markerLayer.addTo(map_iiif);
      map_iiif.anno = true;
}else{
  map_iiif.eachLayer(function (layer) {
    if(layer.anno === true){
    map_iiif.removeLayer(layer);
    }
});
map_iiif.anno = false;
}
}
  /*
      var popup = L.popup();

    function onMapClick(e) {
          popup
              .setLatLng(e.latlng)
              .setContent("You clicked the map at " + e.latlng.toString())
              .openOn(map_iiif);
} */
      //map2.setMaxBounds([[-375,0],[0,500]]) //adapt: set MaxBounds on given map
      //map2.on('click', onMapClick);
