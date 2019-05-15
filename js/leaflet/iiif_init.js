
var map_iiif = L.map('iiifmap', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 3,
  anno: false
});
map_iiif.invalidateSize();


var annoControl = L.Control.extend({
  options: {
    position: 'topleft'
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  },
onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom material-icons-outlined');
    //container.type = 'button';
    container.title = 'Annotationen anzeigen';
    container.innerHTML = `<div class="mdc-switch" id="iiif_switch">
  <div class="mdc-switch__track"></div>
  <div class="mdc-switch__thumb-underlay">
    <div class="mdc-switch__thumb">
        <input type="checkbox" id="basic-switch" class="mdc-switch__native-control" role="switch">
    </div>
  </div>
</div>`;
    container.style.backgroundColor = 'white';
    container.style.width = '30px';
    container.style.height = '30px';

    container.onclick = function(){
      showAnnotationsonMap();
    }
    return container;
  }

});

map_iiif.addControl(new annoControl ());
var iiif_switch = new mdc.switchControl.MDCSwitch(document.querySelector('#iiif_switch'));

//var baseLayer = L.tileLayer.iiif(
  //
  //'http://localhost:8182/iiif/2/testinfo%2Fzelt.jpg/info.json'
  //'http://localhost:8182/iiif/2/Armbrustschützenzelt%2FArmbrustschützenzelt_Speisenkarte_20.09.1957%2FArmbrustschützenzelt_Speisenkarte_20.09.1975_01.jpg/info.json'
  //'http://localhost:8182/iiif/2/214-2.png/info.json'
  //'http://localhost:8080/tetons/info.json'

//).addTo(map_iiif);

L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Klicke und Ziehe eine Rechteck';
L.drawLocal.draw.handlers.simpleshape.tooltip.end = 'Maus loslassen zum Beenden';
L.drawLocal.draw.toolbar.actions.text = 'Abbrechen';

var markerLayer = L.featureGroup();
markerLayer.addTo(map_iiif);
markerLayer.anno = true;
map_iiif.anno = false;

var editableLayers = new L.featureGroup()
editableLayers.addTo(map_iiif);
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
      showArea:false,
      shapeOptions: {
        color: '#bada55',
      }
    }
}
})
map_iiif.addControl(drawControl);

$("#iiifmap").find(".leaflet-draw-edit-edit").parent("div").hide();


// Add a new editable rectangle when clicking on the button.
//button.addEventListener('click', function(event) {
  //event.preventDefault();

map_iiif.on(L.Draw.Event.CREATED, function (e) {
  //remove previous rectangles
  editableLayers.clearLayers();
  var type = e.layerType
  var layer = e.layer;
  console.log(layer);

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


function loadTileLayer(url, attribution){
//if (map_iiif != undefined){
console.log(url);
map_iiif.eachLayer(function (layer) {
  if(layer.typ === "iiif" || layer.typ === "anno"){
    //remove only iiif or anno layers.
    console.log(layer);
    if(map_iiif.hasLayer(layer)){
      console.log(map_iiif.hasLayer(layer));
    map_iiif.removeLayer(layer);
    //map_iiif.remove(layer);

  }
  }

});

  if(attribution != undefined || attribution != ""){
    attribution = "Monacensia: " + attribution;
  }else{
    attribution = "Monacensia: ohne Nr.";
  }
  var iiif_layer = L.tileLayer.iiif(url, {
    attribution: attribution
  });
  iiif_layer.typ = "iiif";
  iiif_layer.addTo(map_iiif);
  iiif_layer.setZIndex(4);

  iiif_layer.on('tileerror', function(error, tile) {
      console.log(error);
      console.log(tile);
      showTextOnSnackbar("Keine Verbindung zum Bilderserver!", "5003");
  });

  editableLayers = new L.featureGroup()
  editableLayers.addTo(map_iiif);
  editableLayers.setZIndex(50);
  map_iiif.invalidateSize();


//}
console.log(url);
}

function showAnnotationsonMap(){
  iiifaddExistingAnnotations();

}

function iiifaddExistingAnnotations(){
  var target_list = $("#annotation-list");
  target_list.html('');
  //adds Annotations to map and to list
map_iiif.removeLayer(markerLayer);
markerLayer = L.featureGroup();
if(map_iiif.anno === false){
//openinghours , other ,
DBdishes.allDocs({
    include_docs: true
  },function(err, doc){
      for(var doc2 in doc.rows){
        var objdoc = doc.rows[doc2].doc;
        //where coord is not empty
        if(!objdoc.language && objdoc.target.menupage && (objdoc.target.menupage === app_state.menupage)){
          if(objdoc.target.coord && objdoc.target.coord.value != ""){
            //create rectangle and add to markerLayer
            var latlng = objdoc.target.coord.value.split("=");
            latlng = latlng[1].split(",");
            var bounds = [[latlng[0], latlng[1]], [latlng[2], latlng[3]]];
            var bounds_logo = L.latLngBounds([[latlng[0], latlng[1]], [latlng[2], latlng[3]]]);

            if(objdoc.body.type != undefined){
              if(objdoc.body.type === "meal"){
              var logo = L.imageOverlay('js/leaflet/images/baseline-local_dining-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();
            }else if (objdoc.body.type === "drink"){
              var logo = L.imageOverlay('js/leaflet/images/baseline-local_drink-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();
            }else if(objdoc.body.type === "other"){
              var logo = L.imageOverlay('js/leaflet/images/baseline-device_unknown-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();
            }
            }

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
          //add to AnnotationList
          addToAnnotationList(objdoc, target_list);
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
            var bounds_logo = L.latLngBounds([[latlng[0], latlng[1]], [latlng[2], latlng[3]]]);
            var logo = L.imageOverlay('js/leaflet/images/alarm_add-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();
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
          addToAnnotationList(objdoc, target_list);
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
    var bounds_logo = L.latLngBounds([[latlng[0], latlng[1]], [latlng[2], latlng[3]]]);
    var logo = L.imageOverlay('js/leaflet/images/baseline-announcement-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();

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
          addToAnnotationList(objdoc, target_list);

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
    var bounds_logo = L.latLngBounds([[latlng[0], latlng[1]], [latlng[2], latlng[3]]]);
    var logo = L.imageOverlay('js/leaflet/images/baseline-category-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();

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
           addToAnnotationList(objdoc, target_list);

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
    var bounds_logo = L.latLngBounds([[latlng[0], latlng[1]], [latlng[2], latlng[3]]]);

    var logo = L.imageOverlay('js/leaflet/images/baseline-format_paint-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();

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
          addToAnnotationList(objdoc, target_list);

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
            //bounds_logo.pad(-1);
            console.log(bounds_logo);
            console.log(bounds);
    // add rectangle passing bounds and some basic styles
        var rect = L.rectangle(bounds, {color: "white", weight: 5});
        var bounds_logo = L.latLngBounds([[latlng[0], latlng[1]], [latlng[2], latlng[3]]]);
        if(objdoc.body.type != undefined){
          if(objdoc.body.type === "photo"){
            var logo = L.imageOverlay('js/leaflet/images/baseline-camera_roll-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();
          }else if (objdoc.body.type === "draw"){
            var logo = L.imageOverlay('js/leaflet/images/baseline-border_color-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();
          }else if (objdoc.body.type === "ornament"){
            var logo = L.imageOverlay('js/leaflet/images/baseline-polymer-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();
          }else if (objdoc.body.type === "other"){
            var logo = L.imageOverlay('js/leaflet/images/baseline-device_unknown-24px.svg', bounds_logo, {opacity:0.2}).addTo(markerLayer).bringToBack();
          }
        }
        rect.name = objdoc.body.name;
        rect.coord = objdoc.target.bounds;
        rect.id = objdoc._id;
        rect.obj = objdoc;

        rect.on('click', showAnnotationInfoDialog);
        rect.addTo(markerLayer);
        markerLayer.anno = true;
        map_iiif.anno = true;
          }
          addToAnnotationList(objdoc, target_list);

        }
        if($.trim($(target_list).html()) === ''){
          var list_other = `<li class="mdc-ripple-upgraded" tabindex="0">
          Für diese Speisekarte sind noch keine Gerichte verzeichnet. Nutze die Karte, markiere den passenden Bereich
          und füge eine Art von Kategorie mit dem Button hinzu.
          </li>`;
          console.log("Keine Annotationen gefunden!")
          target_list.append(list_other);
        }
    };
});
markerLayer.typ = "anno";
    markerLayer.addTo(map_iiif);
    showTextOnSnackbar("Annotationen aktiv!", 5000);
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
