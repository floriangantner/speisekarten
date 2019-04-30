
var map_iiif = L.map('iiifmap', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 3,
  anno: false
});
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
  //addButtons();
  map_iiif.invalidateSize();
}

function iiifaddExistingAnnotations(){
map_iiif.removeLayer(markerLayer);
markerLayer = L.featureGroup();
if(map_iiif.anno === false){
//openinghours , other ,
DBdishes.allDocs({
    include_docs: true
  },function(err, doc){
    console.log(doc)
      for(var doc2 in doc.rows){
        var objdoc = doc.rows[doc2].doc;
        //where coord is not empty
        console.log(objdoc);
        console.log(app_state.menupage);
        if(!objdoc.language && objdoc.target.menupage && (objdoc.target.menupage === app_state.menupage)){
          console.log(objdoc.target.menupage);
          if(objdoc.target.coord && objdoc.target.coord.value != ""){
            //create rectangle and add to markerLayer
            var latlng = objdoc.target.coord.value.split("=");
            latlng = latlng[1].split(",");
            var bounds = [[latlng[0], latlng[1]], [latlng[2], latlng[3]]];
            console.log(bounds);
    // add rectangle passing bounds and some basic styles
        var rect = L.rectangle(bounds, {color: "red", weight: 5});
        rect.name = objdoc.body.name;
        rect.coord = objdoc.target.bounds;
        rect.id = objdoc._id;
        rect.obj = objdoc;
        rect.on('click', showAnnotationInfoDialog);

        rect.addTo(markerLayer);
        markerLayer.anno = true;
        map_iiif.anno = true;

          }
        }
    };
});
DBopeninghours.allDocs({
    include_docs: true
  },function(err, doc){
    console.log(doc)
      for(var doc2 in doc.rows){
        var objdoc = doc.rows[doc2].doc;
        //where coord is not empty
        console.log(objdoc);
        console.log(app_state.menupage);
        if(!objdoc.language && objdoc.target.menupage && (objdoc.target.menupage === app_state.menupage)){
          console.log(objdoc.target.menupage);
          if(objdoc.target.coord && objdoc.target.coord.value != ""){
            //create rectangle and add to markerLayer
            var latlng = objdoc.target.coord.value.split("=");
            latlng = latlng[1].split(",");
            var bounds = [[latlng[0], latlng[1]], [latlng[2], latlng[3]]];
            console.log(bounds);
    // add rectangle passing bounds and some basic styles
        var rect = L.rectangle(bounds, {color: "orange", weight: 5});
        rect.name = objdoc.body.name;
        rect.coord = objdoc.target.bounds;
        rect.id = objdoc._id;
        rect.obj = objdoc;
        rect.on('click', showAnnotationInfoDialog);

        rect.addTo(markerLayer);
        markerLayer.anno = true;
        map_iiif.anno = true;

          }
        }
    };
});
DBanno_other.allDocs({
    include_docs: true
  },function(err, doc){
    console.log(doc)
      for(var doc2 in doc.rows){
        var objdoc = doc.rows[doc2].doc;
        //where coord is not empty
        console.log(objdoc);
        console.log(app_state.menupage);
        if(!objdoc.language && objdoc.target.menupage && (objdoc.target.menupage === app_state.menupage)){
          console.log(objdoc.target.menupage);
          if(objdoc.target.coord && objdoc.target.coord.value != ""){
            //create rectangle and add to markerLayer
            var latlng = objdoc.target.coord.value.split("=");
            latlng = latlng[1].split(",");
            var bounds = [[latlng[0], latlng[1]], [latlng[2], latlng[3]]];
            console.log(bounds);
    // add rectangle passing bounds and some basic styles
        var rect = L.rectangle(bounds, {color: "grey", weight: 5});
        rect.name = objdoc.body.name;
        rect.coord = objdoc.target.bounds;
        rect.id = objdoc._id;
        rect.obj = objdoc;

        rect.on('click', showAnnotationInfoDialog);

        rect.addTo(markerLayer);
        markerLayer.anno = true;
        map_iiif.anno = true;

          }
        }
    };
});
DBcategory.allDocs({
    include_docs: true
  },function(err, doc){
    console.log(doc)
      for(var doc2 in doc.rows){
        var objdoc = doc.rows[doc2].doc;
        //where coord is not empty
        console.log(objdoc);
        console.log(app_state.menupage);
        if(!objdoc.language && objdoc.target.menupage && (objdoc.target.menupage === app_state.menupage)){
          console.log(objdoc.target.menupage);
          if(objdoc.target.coord && objdoc.target.coord.value != ""){
            //create rectangle and add to markerLayer
            var latlng = objdoc.target.coord.value.split("=");
            latlng = latlng[1].split(",");
            var bounds = [[latlng[0], latlng[1]], [latlng[2], latlng[3]]];
            console.log(bounds);
    // add rectangle passing bounds and some basic styles
        var rect = L.rectangle(bounds, {color: "blue", weight: 5});
        rect.name = objdoc.body.name;
        rect.coord = objdoc.target.bounds;
        rect.id = objdoc._id;
        rect.obj = objdoc;

        rect.on('click', showAnnotationInfoDialog);

        rect.addTo(markerLayer);
        markerLayer.anno = true;
        map_iiif.anno = true;

          }
        }
    };
});

DBads.allDocs({
    include_docs: true
  },function(err, doc){
    console.log(doc)
      for(var doc2 in doc.rows){
        var objdoc = doc.rows[doc2].doc;
        //where coord is not empty
        console.log(objdoc);
        console.log(app_state.menupage);
        if(!objdoc.language && objdoc.target.menupage && (objdoc.target.menupage === app_state.menupage)){
          console.log(objdoc.target.menupage);
          if(objdoc.target.coord && objdoc.target.coord.value != ""){
            //create rectangle and add to markerLayer
            var latlng = objdoc.target.coord.value.split("=");
            latlng = latlng[1].split(",");
            var bounds = [[latlng[0], latlng[1]], [latlng[2], latlng[3]]];
            console.log(bounds);
    // add rectangle passing bounds and some basic styles
        var rect = L.rectangle(bounds, {color: "black", weight: 5});
        rect.name = objdoc.body.name;
        rect.coord = objdoc.target.bounds;
        rect.id = objdoc._id;
        rect.obj = objdoc;

        rect.on('click', showAnnotationInfoDialog);

        rect.addTo(markerLayer);
        markerLayer.anno = true;
        map_iiif.anno = true;

          }
        }
    };
});

DBimage.allDocs({
    include_docs: true
  },function(err, doc){
    console.log(doc)
      for(var doc2 in doc.rows){
        var objdoc = doc.rows[doc2].doc;
        //where coord is not empty
        console.log(objdoc);
        console.log(app_state.menupage);
        if(!objdoc.language && objdoc.target.menupage && (objdoc.target.menupage === app_state.menupage)){
          console.log(objdoc.target.menupage);
          if(objdoc.target.coord && objdoc.target.coord.value != ""){
            //create rectangle and add to markerLayer
            var latlng = objdoc.target.coord.value.split("=");
            latlng = latlng[1].split(",");
            var bounds = [[latlng[0], latlng[1]], [latlng[2], latlng[3]]];
            console.log(bounds);
    // add rectangle passing bounds and some basic styles
        var rect = L.rectangle(bounds, {color: "white", weight: 5});
        rect.name = objdoc.body.name;
        rect.coord = objdoc.target.bounds;
        rect.id = objdoc._id;
        rect.obj = objdoc;

        rect.on('click', showAnnotationInfoDialog);

        rect.addTo(markerLayer);
        markerLayer.anno = true;
        map_iiif.anno = true;


          }
        }
    };
});
    markerLayer.addTo(map_iiif);
    showTextOnSnackbar("Annotationen inaktiv!", 5000);
    map_iiif.invalidateSize();
  }else{
    //remove Annos
    map_iiif.eachLayer(function (layer) {
      if(layer.anno === true){
      map_iiif.removeLayer(layer);
      showTextOnSnackbar("Annotationen inaktiv!", 5000);

      }
    });
    map_iiif.anno = false;

  }
  };

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
