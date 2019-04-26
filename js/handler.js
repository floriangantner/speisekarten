//##############################################################################
//###########  <<  handler.js >> ###############################################
//##############################################################################
//contains handlers for click on DOM in index.html

//##############################################################################
//init: the following stuff is done, when loading the CODE at beginning

$( "main" ).hide(); //hide by default in css code
$("#card-intro").show();
$("#button-intro-go").attr("disabled", true);
$("#menu").attr("disabled", true);

//loading data etc...
//show main intro
$("#menu").click(function(evt){
  drawer.open = true;
});

$("#nav-pubs-list").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  redrawPubList();
  drawer.open = false;
  $( "#card-pubs-list" ).show();
});

$("#nav-map").click(function(evt){
  map.invalidateSize();
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  //Add all Pubs by Default
  mapAllPubsAdd();
  $( "#card-map" ).show();
   map.invalidateSize();

});

$("#nav-dishes-you").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  redrawYourDishes();
  drawer.open = false;
  $( "#card-dishes-you" ).show();
});

$("#nav-dishes-all").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  redrawDishesAllList();
  drawer.open = false;
  $( "#card-dishes-all" ).show();
});

$("#nav-about-you").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  //if no identity has been selected?
  if(user_state.identity == "" || user_state.identity === undefined){
  alert("Keine Identität ausgewählt!");
  $("#button-identity-confirm").attr("disabled", false);
  $("#button-identity-confirm").hide();
  $("#card-identity").show();
  }else{
  redrawAboutYou();
  $( "#card-about-you" ).show();
  }
  drawer.open = false;
  //No data available -> go to identity selector
  });

$("#nav-about-us").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  $( "#card-about-us" ).show();
});

$("#nav-tutorial").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  $( "#card-tutorial" ).show();
});

//Intro Button
$("#button-intro-go").click(function(evt){
  evt.preventDefault();
  $( "#card-intro" ).hide();
  drawer.open = false;
  //TODO: add check for data loaded

  //TODO: Check, if Person was selected
  if(user_state.account_created == false || user_state.account_created === undefined){
  $("#button-identity-confirm").hide();
  $( "#card-identity" ).show();

}else{
  $( "#card-tutorial" ).show();
}
});

$("#button-identity-go").click(function(evt){
  evt.preventDefault();
$( "#card-identity" ).hide();
    $( "#card-tutorial" ).show();
})

$("#button-tutorial-go").click(function(evt){
  evt.preventDefault();
  $( "#card-intro" ).hide();
  drawer.open = true;
});

$('#pubs-list').on('click', '.mdc-list-item', function(evt){
console.log("clicked");
$( "#card-pubs-list" ).hide();
  app_state.pubs = $(this).attr('data-id');;
    redrawPubs(app_state.pubs);
    $(".pubs-tab-element").hide();
    $(".pubs-tab-element[data-tab=info]").show();
$( "#card-pubs-detail" ).show();

});

$('#dishes-all-list').on('click', '.mdc-list-item', function(evt){
console.log("clicked");
$( "#card-dishes-all" ).hide();
app_state.dishes = $(this).attr('data-id');
    redrawDishes(app_state.dishes);
$( "#card-dishes-detail" ).show();

});

$('#pubs-dishes-list').on('click', '.mdc-list-item', function(evt){
console.log("clicked");
$( "#card-pubs-detail" ).hide();
app_state.dishes = $(this).attr('data-id');
    redrawDishes(app_state.dishes);
    $( "#card-dishes-detail" ).show();
});

$("#button-pubs-menu").click(function(evt){
  evt.preventDefault();
  //get list of menus
  //populate menu-list
  redrawMenuList(app_state.pubs);
  $( "#card-pubs-detail" ).hide();
  $( "#card-pubs-menu-list" ).show();
});


$("#button-pubs-dishes").click(function(evt){
  evt.preventDefault();
  $( "#card-pubs-detail" ).hide();
  //show all dishes from this pub
redrawPubsDishesList(app_state.pubs);
  $( "#card-pubs-dishes-list" ).show();

});

$('#pubs-menu-list').on('click', '.mdc-image-list__item', function(evt){
console.log("clicked");
$( "#card-pubs-detail" ).hide();
    app_state.menupage = $(this).attr('data-id');
    console.log(app_state.menupage);
    redrawMenu(app_state.menupage);
    //TODO: add to redrawMenu
  //  initIIIFMap();
$( "#card-menu-detail" ).show();

});

$(".dishes-list .mdc-list-item").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  $( "#card-dishes-detail" ).show();
});

$("#button-pubs-menu-back").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  $( "#card-pubs-detail" ).show();
});

$("#button-menu-detail-add-dish").click(function(evt){
  evt.preventDefault();
  annotation_dishes_dialog.open();
  //Get Coordinates, print Error
  if(editableLayers && editableLayers.getLayers()[0] && editableLayers.getLayers()[0]._parts.length > 0 ){
    $("#dialog-dishes-coord-found").html('Bereich markiert!');
    console.log(editableLayers.getLayers()[0]._parts);
  }else{
    $("#dialog-dishes-coord-found").html('');
  }//  $( "#card-pubs-detail" ).show();
});

$("#button-menu-detail-add-openinghours").click(function(evt){
  evt.preventDefault();
  //annotation_openinghours_dialog.close();

  $("dialog-openinghours-name").focus();
  console.log(annotation_openinghours_dialog);

  annotation_openinghours_dialog.close();
  annotation_openinghours_dialog.open();
//  $( "#card-pubs-detail" ).show();
});

$("#button-menu-detail-add-other").click(function(evt){
  evt.preventDefault();
  console.log(annotation_other_dialog);
  annotation_other_dialog.open();
//  $( "#card-pubs-detail" ).show();
});

$("#button-menu-detail-add-geolocation").click(function(evt){
  evt.preventDefault();
  console.log(annotation_geolocation_dialog);
  //load existing Adresses of this pub
  //get pubid of this menu
  var pubid = "";
  annotation_geolocation_dialog.open();
//  $( "#card-pubs-detail" ).show();
});

$("#annotation-dishes-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
//look for
//menupageid
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "OpeningHour",
"body" : {
  "type" : $("#anno-dishes-type-switch").val(),
  "name" : $("#annotation-dishes-popup").find("[anno-dishes-name]").val(),
  "price" : $("#annotation-dishes-popup").find("[anno-dishes-price]").val(),
  "price_currency" : $("#annotation-dishes-popup").find("[anno-dishes-currency]").val(),
  "amount" : $("#annotation-dishes-popup").find("[anno-dishes-amount]").val(),
	"description" : $("#annotation-dishes-popup").find("[anno-dishes-currency]").val(),
  "categoryName" : $("#annotation-dishes-popup").find("[anno-dishes-category]").val(),
  "categoryID" : $("#annotation-dishes-popup").find("[anno-dishes-category] option:selected").text()
},
"target" : {
	"pubid":app_state.pubs,
  "menu" : app_state.menu,
	"menupage": app_state.menupage,
  "selector": getAnnoFragment(),
  "coord" : getAnnoCoord(),
},
"creator" : {
	"id" : user_state.timestamp,
	"name" : user_state.name,
	"identity" : user_state.identity
},
"generator" : {
	"name" : "tripadviswurst"
},
"created" : JSON.stringify(Date.now()),
"motivation" : "commenting"
};

console.log(data);
DBaddnew(data,DBdishes);
//DBadd(data,DBdishes);
//add name and price as new dished to the database

});
$("#annotation-openinghours-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
//look for
//menupageid
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "OpeningHour",
"body" : {
	"value" : $("#dialog-openinghours-name > input").val(),
},
"target" : {
	"pubid":app_state.pubs,
  "menu" : app_state.menu,
	"menupage": app_state.menupage,
  "selector": getAnnoFragment(),
  "coord" : getAnnoCoord(),
},
"creator" : {
	"id" : user_state.timestamp,
	"name" : user_state.name,
	"identity" : user_state.identity
},
"generator" : {
	"name" : "tripadviswurst"
},
"created" : JSON.stringify(Date.now()),
"motivation" : "commenting"
};
console.log(data);
DBaddnew(data,DBopeninghours);
//DBadd(data,DBdishes);
//add name and price as new dished to the database

});

$("#annotation-geolocation-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
//look for
//menupageid

var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annocategory" : "Geo",
"body" : {
	"latlng" : [$("[geo-lat]").val(), $("[geo-lng]").val()],
	"country" : "",
	"city" : $("[geo-city").val(),
	"zip" : $("[geo-zip").val(),
	"street" : $("[geo-street]").val(),
	"number" : $("[geo-number").val(),
	"street_old" : $("[geo-street_old").val(),
	"zip_old" : $("[geo-zip_old").val(),
	"city_old" : $("[geo-city_old").val(),
	"number_old" : $("[geo-number_old").val(),
	"comment" : $("[geo-comment").val()
},
"target" : app_state.pubid,
"creator" : {
	"id" : user_state.timestamp,
  "identity" : user_state.identity,
	"name" : user_state.name
},
"generator" : {
	"name" : "tripadviswurst"
},
"created" : JSON.stringify(Date.now()),
"motivation" : "assessing"
}

console.log(data);
DBaddnew(data,DBgeo);
//DBadd(data,DBdishes);
//add name and price as new dished to the database

});

function getAnnoFragment(){
//read xywh from actual segment
  if(editableLayers.getLayers()[0]._parts && editableLayers.getLayers()[0]._parts.length > 0){
  // change selected area to xywh and latlng coordinates
  var part = editableLayers.getLayers()[0]._parts[0];
  var selectorstring = "xywh="+(part[1].x+","+part[1].y)+","+(part[2].x-part[1].x)+","+(part[3].y-part[2].y);
  return {
    "type": "FragmentSelector",
    "conformsTo": "http://www.w3.org/TR/media-frags/",
    "value": selectorstring
  }
}else{
    return null;
  }
};

function getAnnoCoord(){
//read world coordinated from actual segment
  if(editableLayers.getLayers()[0]._latlngs && editableLayers.getLayers()[0]._latlngs.length > 0){
  // change selected area to xywh and latlng coordinates
  var part = editableLayers.getLayers()[0]._latlngs[0];
  var selectorstring = "latlng1lat2lng2="+part[1].lat+","+part[1].lng+","+part[3].lat+","+part[3].lng;
  return {
    "type": "AnnoSelector",
    "conformsTo": "",
    "value": selectorstring,
  }
}else{
  return null;
}
};

$("#dialog-other-popup").find('[data-mdc-dialog-action="accept"]').click(function(){
//look for
//menupageid

var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Other",
"body" : {
	"comment" : $("#dialog-other-comment > input"),
},
"target" : {
	"pubid":app_state.pubs,
  "menu" : app_state.menu,
	"menupage": app_state.menupage,
  "selector": getAnnoFragment(),
  "coord" : getAnnoCoord(),
},
"creator" : {
	"id" : user_state.timestamp,
	"name" : user_state.name,
	"identity" : user_state.identity
},
"generator" : {
	"name" : "tripadviswurst"
},
"created" : JSON.stringify(Date.now()),
"motivation" : "commenting"
}
console.log(data);
DBaddnew(data,DBanno_other);
//DBadd(data,DBdishes);
//add name and price as new dished to the database

});

$("#button-identity-confirm").click(function(evt){
// confirm selected person
//go to tutorial
$("#card-identity").hide();
  //destroy overlay
  //@registerPlayer(); done from end of Cropping-Function
$("#card-tutorial").show();
});

$("#button-identity-random").click(function(evt){
  progress_identify_face.open();
  progress_identify_face.determinate = false;
  // select random person
$("#button-identity-confirm").attr("disabled", true);
setTimeout(
  function()
  {
    //do something special
    redrawRandomIdentityChoice();
    $("#person-selector").show();
    progress_identify_face.determinate = true;
  progress_identify_face.close();
  }, 3000);
});

$("#button-identity-camera").click(function(evt){
var video = document.getElementById('video-selector-video');
$("#person-selector").hide();
$("#video-selector-video").show();
$("#video-selector-enhance").show();
$("#button-identity-camera").attr("disabled", true);
console.log(video);
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
});


var button_random_handler = function(evt){
  //close video and
  $("#video-selector").hide();
  let tracks = video.srcObject.getTracks()
  tracks.forEach(function(track) {
    track.stop();
  });
  video.srcObject = null;
  video.mozSrcObject=null;
  $("#button-identity-camera").attr("disabled", false);

//redrawRandomIdentityChoice();
}

$("#button-identity-random").on("click", )


//register event handler for random person button click
$("#button-identity-random").one("click", button_random_handler);

$("#video-selector-canvas").hide();
$("#video-selector-retry").hide();
$("#video-selector-submit").hide();
$("#video-selector").show();
  //TODO: add processing for face-recognition

  // Get access to the camera!

$("#video-selector-retry").click(function(evt){
$("#video-selector-canvas").hide();
  $("#video-selector-video").show();
  $("#video-selector-enhance").show();
  video.play();
  video.mozSrcObject=null;

  $("#video-selector-submit").hide();
  $("#video-selector-retry").hide();

});
$("#video-selector-enhance").click(function(evt){
  var canvas = document.getElementById('video-selector-canvas');
  var context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, 640, 480);
$("#video-selector-video").hide();
$("#video-selector-canvas").show();
$("#video-selector-retry").show();
video.pause();
$('video')[0].pause();
$("#video-selector-submit").show();
$("#video-selector-enhance").hide();

});


$("#video-selector-submit").click(function(evt){
  progress_identify_face.open()
  progress_identify_face.determinate = false;
//TODO: select similiar photos from collection
//FIX: random selection
//close camera
$("#video-selector").hide();
let tracks = video.srcObject.getTracks()
tracks.forEach(function(track) {
  track.stop();
});
video.srcObject = null;
video.mozSrcObject=null;
console.log("ähnliche Person wird gesucht. naja eigentlich noch nicht!");
$("#button-identity-camera").attr("disabled", false);
$("#button-identity-submit").attr("disabled", false);
//TODO: Select Code for for selection
redrawRandomIdentityChoice();
// select random person
$("#button-identity-confirm").attr("disabled", true);
setTimeout( function(){
  //do something special
  redrawRandomIdentityChoice();
  progress_identify_face.determinate = true;
progress_identify_face.close();
$("#person-selector").show();

}, 3000);

});

}
});

function showMapPubDialog(){
  //Map event on click marker
  console.log("Hallo Karte!");

  redrawMapPubDialog(this.addressinfo, this._latlng);
  //prerender view of pub when clicking this
  //redrawPubs(this.pubid);
  app_state.pubs = this.target;
  redrawPubs(app_state.pubs);
  console.log(map_pubinfo_dialog);

  map_pubinfo_dialog.open();
//Get info about Put
}

$("#map-showpubinfo-popup").find('[data-mdc-dialog-action="accept"]').click(function(){
  map_pubinfo_dialog.close();
  $( "#card-map" ).hide();
$( "#card-pubs-detail" ).show();

});

$("#pubs-search > input").keyup(function(){
  var value = $(this).val().toLowerCase();
  $("#pubs-list li").filter(function() {
   $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
 });

});
 $("#dishes-search > input").keyup(function(){
   var value = $(this).val().toLowerCase();
   $("#dishes-all-list li").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

$("#button-dishes-rate").click(function(evt){
//dialog-rate-dishes-comment
rate_dishes_dialog.open();
});
$("#rate-dishes-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){

  var data = {
  "time" : Date.now(),
  "rating" : $("#dialog-rate-dishes-stars > input").val(),
  "comment" : $("#dialog-rate-dishes-comment > textarea").val(),
  "dishes" : app_state.dishes,
  "pubid" : app_state.pubid,
  "playerid" : user_state.timestamp,
  "historic_person" : {
    "name" : "Tester Testeintrag",
    "id" : user_state.identity,
  }
  }
  console.log(data);
  DBaddnew(data,DBrating);
})
$("#anno-add-button").click(function(evt){
anno_menu.open = true;

});
$("#pubs-tabbar").find(".mdc-tab").on("click", function(evt){
var clicked = $(this).attr("data-id");
$(".pubs-tab-element").hide();
$(".pubs-tab-element[data-tab="+clicked+"]").show();
});
$("#button-menu-detail-add-category").on("click", function(evt){
//TODO: check actual categories of menu
annotation_category_dialog.open();

});
$("#annotation-category-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
//DO Something
//dialog-category-name
//$("#dialog-category-name > input").val(),

//dialog-category-select-upper
//$("#dialog-category-select-upper > select").val(),

//TODO:
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Category",
"body" : {
	"name" : $("#annotation-category-popup").find("[category-name]").val(),
  "upperCategoryID" : $("#annotation-category-popup").find("[category-upperselect]").val(),
  "upperCategory" : $("#annotation-category-popup").find("[category-upperselect]").text()
},
"target" : {
	"pubid":app_state.pubs,
  "menu" : app_state.menu,
	"menupage": app_state.menupage,
  "selector": getAnnoFragment(),
  "coord" : getAnnoCoord(),
},
"creator" : {
	"id" : user_state.timestamp,
	"name" : user_state.name,
	"identity" : user_state.identity
},
"generator" : {
	"name" : "tripadviswurst"
},
"created" : JSON.stringify(Date.now()),
"motivation" : "commenting"
}
console.log(data);
DBaddnew(data,DBcategory);


});

function showAnnotationInfoDialog(){
  var anno_id = this;
  console.log(anno_id);
  redrawAnnotationInfoDialog(anno_id);
  annotation_info_dialog.open();
//Get info about Put

}


$("#button-map-anno").click( function(evt){
//addAnnos(null);
iiifaddExistingAnnotations();

});

function onAddedRectMapClick(){
anno_menu.open = true;
}

$('#pubs-adress-list').on('click', '.mdc-list-item', function(evt){
$( "#card-pubs-detail" ).hide();
var geoid = $(this).attr('data-id');
var lat, lng, data;
//check for pubid -> multiple -> mark on popup and change marker -> change map
DBgeo.allDocs({
    include_docs: true
  },function(err, doc){
    $.each(doc.rows, function (index, value) {
      if(value.doc.id === geoid){
        lat = value.doc.body.latlng[0];
        lng = value.doc.body.latlng[1];
        data = value.doc.body;
      }
    });
    //add more info from actual pubs
    //
    redrawMapPubDialog(data, [lat,lng]);
    MapShowPubID($(this).attr('data-id'), lat, lng);
    mapAllPubsAdd();
    map_pubinfo_dialog.open();

});
$("#card-map").show();

});
