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
$("#menu").hide();

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
  showHelp("NavPubsList", false, $( "#card-pubs-list" ), "card");
  //$("#card-pubs-list").show();
});

$("#nav-dash").click(function(evt){
  map.invalidateSize();
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  //Add all Pubs by Default
  mapAllPubsAdd();
  showHelp("NavDash", false, $( "#card-dash" ), "card");
   map.invalidateSize();

});

$("#nav-map").click(function(evt){
  map.invalidateSize();
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  //Add all Pubs by Default
  mapAllPubsAdd();
  showHelp("NavMap", false, $( "#card-map" ), "map");
  map.invalidateSize();

});

$("#nav-anno-you").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  redrawYourDishes();
  drawer.open = false;
  $( "#card-anno-you" ).show();
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
   showTextOnSnackbar("Keine Identität ausgewählt!", 5000);
  $("#button-identity-confirm").attr("disabled", false);
  $("#button-identity-confirm").hide();
    showHelp("Identity", false, $("#card-identity"), "card");
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
  redrawTutorial();
  $( "#card-tutorial" ).show();
});

$("#nav-player-all").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  RedrawPlayerList();
  drawer.open = false;
  $( "#card-player-all" ).show();
});

$("#dash-menu-random").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  //select random menupage for editing
  redrawRandomMenu();
  showTextOnSnackbar("Zufällige Speisekarte gefunden", "4000");
  drawer.open = false;
  $( "#card-menu-detail" ).show();
  $(".pubs-menu-element").hide();
  $(".pubs-menu-element[data-tab=map]").show();
});

//Intro Button
$("#button-intro-go").click(function(evt){
  evt.preventDefault();
  $( "#card-intro" ).hide();
  drawer.open = false;
  //TODO: add check for data loaded
  //show menu
  //TODO: Check, if Person was selected
  if(user_state.account_created === false || user_state.account_created === undefined){
  $("#button-identity-confirm").hide();
  $("#card-intro2").show();
}else{
  $("#menu").show();
  $( "#card-dash" ).show();
}
});

$("#button-intro2-go").click(function(evt){
  $("#card-intro2").hide()
  showHelp("Identity", false, $("#card-identity"), "card");
})

$("#button-identity-go").click(function(evt){
  evt.preventDefault();
$( "#card-identity" ).hide();
alert("Osterei!");
    $( "#card-tutorial" ).show();
})

$("#button-tutorial-go").click(function(evt){
  evt.preventDefault();
  $( "#card-intro" ).hide();
  drawer.open = true;
});

$('#pubs-list').on('click', '.mdc-list-item', function(evt){
app_state.pubs = $(this).attr('data-id');
console.log("clicked");
$( "#card-pubs-list" ).hide();

  getAllTeaserInfo($("#pubs-detail-tabs-info").find("[teaser-info-ext]"));
    redrawPubs(app_state.pubs);
    $(".pubs-tab-element").hide();
    $(".pubs-tab-element[data-tab=info]").show();
$( "#card-pubs-detail" ).show();

});

$('#dishes-detail-pubs').on('click', function(evt){
  //link from dishes to pub
$("#card-dishes-detail").hide();
getAllTeaserInfo($("#pubs-detail-tabs-info").find("[teaser-info-ext]"));
redrawPubs(app_state.pubs);

$( "#card-pubs-detail" ).show();
$(".menu-tab-element").hide();
$(".menu-tab-element[data-tab=info]").show();

})

$('#dishes-detail-menupage').on('click', function(evt){
  //link from dishes to pub
$("#card-dishes-detail").hide();
redrawMenu(app_state.menupage);
//TODO: add to redrawMenu
$( "#card-menu-detail" ).show();
})

$('#dishes-all-list').on('click', '.mdc-list-item', function(evt){
console.log("clicked");
$( "#card-dishes-all" ).hide();
app_state.anno_id = $(this).attr('data-id');
app_state.anno_typ = "Dishes"
    redrawDishes(app_state.anno_id);
$( "#card-dishes-detail" ).show();

});

$('#pubs-dishes-list').on('click', '.mdc-list-item', function(evt){
$( "#card-pubs-detail" ).hide();
app_state.anno_id = $(this).attr('data-id');
app_state.anno_typ = "Dishes"
    redrawDishes(app_state.anno_id);
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

$("#dash-sync-up").click(function(evt){
  DBdishes.replicate.to(DBremote_dishes).on('complete', function () {
    //TODO: add other databases
    showTextOnSnackbar("Infos dem Restaurantführer gemeldet", 4001);
  }).on('error', function (err) {
    // boo, we hit an error!
    console.log("err");
    showTextOnSnackbar("Kein Restaurantführer gefunden", 4002);
  });

})
$("#dash-sync-down").click(function(evt){
    DBdishes.replicate.from(DBremote_dishes).on('complete', function () {
      //TODO: add other databases
      showTextOnSnackbar("Neueste Auflage des Restaurantführers geholt!", 4001);
    }).on('error', function (err) {
      // boo, we hit an error!
      console.log("err");
      showTextOnSnackbar("Kein Restaurantführer gefunden", 4002);
    });
});

$("#button-pubs-dishes").click(function(evt){
  evt.preventDefault();
  $( "#card-pubs-detail" ).hide();
  //show all dishes from this pub
redrawPubsDishesList(app_state.pubs);
  $( "#card-pubs-dishes-list" ).show();

});

$('#pubs-menu-list').on('click', '.mdc-image-list__item', function(evt){
$( "#card-pubs-detail" ).hide();
    app_state.menupage = $(this).attr('data-id');
    redrawMenu(app_state.menupage);
    $(".pubs-menu-element").hide();
    $(".pubs-menu-element[data-tab=map]").show();
    //TODO: add to redrawMenu
$( "#card-menu-detail" ).show();

});

$(".dishes-list .mdc-list-item").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  $( "#card-dishes-detail" ).show();
});
/*
$("#button-pubs-menu-back").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  $( "#card-pubs-detail" ).show();
});
*/
$("#chip-pubs-menu-back").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  $( "#card-pubs-detail" ).show();
});


$("#button-menu-detail-add-dish").click(function(evt){
  //evt.preventDefault();
  //enable drawing mode, if nothing has been selected
if(editableLayers.getLayers()[0] == undefined || editableLayers.getLayers()[0] == null){
  showTextOnSnackbar("Wähle zuerst einen Bereich aus", 4000)
drawControl._toolbars.draw._modes.rectangle.handler.enable()
}else{
  var listelemtofill = $("#annotation-dishes-popup").find("[anno-dishes-category]");
  newCategoryList(listelemtofill);
  annotation_dishes_dialog.open();
  //Get Coordinates, print Error
  }
});

$("#button-menu-detail-add-openinghours").click(function(evt){
  if(editableLayers.getLayers()[0] == undefined || editableLayers.getLayers()[0] == null){
    showTextOnSnackbar("Wähle zuerst einen Bereich aus", 4000)
  drawControl._toolbars.draw._modes.rectangle.handler.enable()
  }else{
  evt.preventDefault();
  //annotation_openinghours_dialog.close();

  annotation_open_dialog.open();
//  $( "#card-pubs-detail" ).show();
}
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
  showHelp("addGeo", false, annotation_geolocation_dialog, "dialog");
  //annotation_geolocation_dialog.open();
  //Ratingslider.layout();

//  $( "#card-pubs-detail" ).show();
});

$("#annotation-dishes-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
//look for
//menupageid
var dishes_type = $('input[name="type-radios"]:checked').val();
console.log(dishes_radioset.input);
console.log(dishes_type);

var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Dishes",
"body" : {
  "type" : dishes_type,
  "name" : $("#annotation-dishes-popup").find("[anno-dishes-name]").val(),
  "price" : $("#annotation-dishes-popup").find("[anno-dishes-price]").val(),
  "price_currency" : $("#annotation-dishes-popup").find("[anno-dishes-currency]").val(),
  "amount" : $("#annotation-dishes-popup").find("[anno-dishes-amount]").val(),
	"description" : $("#annotation-dishes-popup").find("#dialog-dishes-description > textarea").val(),
  "categoryName" : $("#annotation-dishes-popup").find("[anno-dishes-category]  option:selected").text(),
  "categoryID" : $("#annotation-dishes-popup").find("[anno-dishes-category]").val()
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
//add name and price as new dished to the database
showTextOnSnackbar("Gericht hinterlegt!", 5000);

});

$("#annotation-open-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
//look for
//menupageid
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "OpeningHours",
"body" : {
	"value" : $("#annotation-open-comment > textarea").val(),
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
showTextOnSnackbar("Öffnungszeiten hinterlegt!", 5000);

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
	"comment" : $("[geo-comment").val()
},
"target" : {
  "pubid" : app_state.pubs,
"menu" : app_state.menu
},
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
//add name and price as new dished to the database
showTextOnSnackbar("Adresse hinterlegt!", 5000);

});

function getAnnoFragment(){
//read xywh from actual segment

//consider with total image view!
//go through all layers, find layer.typ === "iiif";
//get coordinates and total width

//compare with selected area and shown width

  if(map_iiif.hasLayer(editableLayers) && editableLayers.getLayers() != undefined && editableLayers.getLayers()[0] != undefined && editableLayers.getLayers()[0]._latlngs != undefined && editableLayers.getLayers()[0]._latlngs.length > 0){
  // change selected area to xywh and latlng coordinates
  var part = editableLayers.getLayers()[0]._latlngs[0];

  var point1 = map_iiif.project(part[1], map_iiif.getMaxZoom()); //using max Zoom should consider the latlng to the original coordinates. Important for IIIf
  var point2 = map_iiif.project(part[3], map_iiif.getMaxZoom());
  let p = {
    x: Math.floor(point1.x),
    y: Math.floor(point1.y),
    w: Math.floor(point2.x - point1.x),
    h: Math.floor(point2.y - point1.y),
  }
  console.log(p);
  //wrong
  var selectorstring = "xywh="+p.x+","+p.y+","+p.w+","+p.h;
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
  if(map_iiif.hasLayer(editableLayers) && editableLayers.getLayers()[0] != undefined && editableLayers.getLayers()[0]._latlngs && editableLayers.getLayers()[0]._latlngs.length > 0){
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

$("#annotation-other-popup").find('[data-mdc-dialog-action="accept"]').click(function(){
//look for
//menupageid

var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Other",
"body" : {
	"comment" : $("#annotation-other-comment > textarea").val(),
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
//add name and price as new dished to the database
showTextOnSnackbar("Etwas hinterlegt!", 5000);

});

$("#button-identity-confirm").click(function(evt){
// confirm selected person
//go to tutorial
$("#card-identity").hide();
  //destroy overlay
  //@registerPlayer(); done from end of Cropping-Function
$("#menu").show();
drawer.open = true;
//$("#card-dashboard").show();
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
  console.log(this);
  redrawMapPubDialog(this._latlng, this.spot);
  app_state.pubs = this.target.pubid;
  app_state.anno_id = this.spot._id;
  app_state.anno_typ = this.spot.annotype;

  getSingleTeaserInfo($("#map-info-popup").find("[map-teaser]"));

  drawThumb($("#map-info-popup").find("[geo-rating]"));
  //prerender view of pub when clicking this
  //redrawPubs(this.pubid);
  redrawPubs(app_state.pubs);
  console.log(map_pubinfo_dialog);

  map_pubinfo_dialog.open();
  //Get info about Put
}

$("#map-info-popup").find('[data-mdc-dialog-action="accept"]').click(function(){
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
//Ratingslider.layout();
showHelp("addRate", false, rate_dishes_dialog, "dialog");

//rate_dishes_dialog.open();
});

$("#rate-dishes-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
var data = {
  "@context" : "http://www.w3.org/ns/anno.jsonld",
  "type" : "Annotation",
  "annotype" : "Rating",
  "body" : {
  	"rating" : Ratingslider.value,
  	"comment" : $("#dialog-rate-dishes-comment > textarea").val(),
  	"skuril" : null,
  	"thumb" : null
  },
  "target" : {
  	"pubid": app_state.pubs,
  	"menu" : app_state.menu,
  	"menupage": app_state.menupage,
  	"anno_id" : app_state.anno_id,
  	"anno_typ" : "Dish"
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
  DBaddnew(data,DBrating);
  showTextOnSnackbar("Bewertung hinterlegt!", 5000);
  redrawDishes(app_state.anno_id);


})

$("#anno-add-button").click(function(evt){
showHelp("addAnnoMap", false, anno_menu, "menu");
//anno_menu.open = true;

});

$("#pubs-tabbar").find(".mdc-tab").on("click", function(evt){
var clicked = $(this).attr("data-id");
$(".pubs-tab-element").hide();
$(".pubs-tab-element[data-tab="+clicked+"]").show();
});

$("#menu-tabbar").find(".mdc-tab").on("click", function(evt){
var clicked = $(this).attr("data-id");
$(".pubs-menu-element").hide();
$(".pubs-menu-element[data-tab="+clicked+"]").show();
});

$("#button-menu-detail-add-category").on("click", function(evt){
//TODO: check actual categories of menu

if(editableLayers.getLayers()[0] == undefined || editableLayers.getLayers()[0] == null){
  showTextOnSnackbar("Wähle zuerst einen Bereich aus", 4000)
drawControl._toolbars.draw._modes.rectangle.handler.enable()
}else{

var listelemtofill = $("#annotation-category-popup").find("[category-upperselect]");
newCategoryList(listelemtofill);
annotation_category_dialog.open();
}
});

$("#annotation-category-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
//DO Something
//dialog-category-name
//$("#dialog-category-name > input").val(),

//dialog-category-select-upper
//$("#dialog-category-select-upper > select").val(),
var cat = $("#annotation-category-popup").find("[category-upperselect]:selected").text();
var cat_id = $("#annotation-category-popup").find("[category-upperselect]").val();
if(cat === "none"){
  cat = null;
  cat_id = null;
}

//TODO:
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Category",
"body" : {
	"name" : $("#annotation-category-popup").find("[category-name]").val(),
  "upperCategoryID" : cat_id,
  "upperCategory" : cat
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
//
showTextOnSnackbar("Kategorie hinterlegt!", 5000);

});

function showAnnotationInfoDialog(){
  //infos are saved in map object or list-object
  var anno_info = this.obj;
app_state.anno_id = anno_info._id;
app_state.anno_type = anno_info.annotype;
console.log(this.obj);
  redrawAnnotationInfoDialog(anno_info);
  annotation_info_dialog.open();
//Get info about Put

}

function onAddedRectMapClick(){
anno_menu.open = true;
}

$('#pubs-adress-list').on('click', '.mdc-list-item', function(evt){
$( "#card-pubs-detail" ).hide();
var geoid = $(this).attr('data-id');
var lat, lng, data, coord_check = true;;
//check for pubid -> multiple -> mark on popup and change marker -> change map
console.log("GEOID: "+ geoid);
DBgeo.get(geoid).then(function(result){
     if(result.body.latlng === null){
          coord_check = false;
          spot = result;
        }else{
        lat = result.body.latlng[0];
        lng = result.body.latlng[1];
        spot = result;
        }

    //add more info from actual pubs
    if(coord_check === false){
      showTextOnSnackbar("Koordinaten nicht gefunden!", 4000);
        getSingleTeaserInfo($("#map-info-popup").find("[map-teaser]"));
        redrawMapPubDialog([lat,lng], spot);
        drawThumb($("#map-info-popup").find("[geo-rating]"));
        //MapShowPubID($(this).attr('data-id'), lat, lng);
        mapAllPubsAdd();
        map_pubinfo_dialog.open();

  }else{
    getSingleTeaserInfo($("#map-info-popup").find("[map-teaser]"));
    redrawMapPubDialog([lat,lng], spot);
    drawThumb($("#map-info-popup").find("[geo-rating]"));
    MapShowPubID($(this).attr('data-id'), lat, lng);
    mapAllPubsAdd();
    map_pubinfo_dialog.open();
  }
});
$("#card-map").show();
});

$("#button-menu-detail-add-ads").click(function(evt){

  if(editableLayers.getLayers()[0] == undefined || editableLayers.getLayers()[0] == null){
    showTextOnSnackbar("Wähle zuerst einen Bereich aus", 4000)
  drawControl._toolbars.draw._modes.rectangle.handler.enable()
  }else{
  evt.preventDefault();
  annotation_ads_dialog.open();
  }
});

$("#button-menu-detail-add-image").click(function(evt){
  if(editableLayers.getLayers()[0] == undefined || editableLayers.getLayers()[0] == null){
    showTextOnSnackbar("Wähle zuerst einen Bereich aus", 4000)
  drawControl._toolbars.draw._modes.rectangle.handler.enable()
  }else{
  evt.preventDefault();
  annotation_image_dialog.open();
}
});

$("#annotation-ads-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
  var data = {
  "@context" : "http://www.w3.org/ns/anno.jsonld",
  "type" : "Annotation",
  "annotype" : "Ads",
  "body" : {
    "brand" : textField_ads_brand.value,
    "comment" : textField_ads_comment.value,
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
DBaddnew(data, DBads);
showTextOnSnackbar("Werbung hinterlegt!", 5000);
});

$("#annotation-image-popup").find('[data-mdc-dialog-action="accept"]').click(function(evt){
  var image_type = $('input[name="image-radios"]:checked').val();
  console.log(image_radioset.value);
  var data = {
  "@context" : "http://www.w3.org/ns/anno.jsonld",
  "type" : "Annotation",
  "annotype" : "Image",
  "body" : {
    "type" : image_type,
    "name" : textField_image_comment.value,
    //$("#annotation-dishes-popup").find("[anno-dishes-name]").val(),
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
  DBaddnew(data, DBimage);
  showTextOnSnackbar("Bild hinterlegt!", 5000);

});

function drawThumb(elem){
//draws an Thumb up/Thumb Down Button to the specified element
//get actual number of ratings of selected annotype and anno_id

//remove all zip_old
$(".rating-thumb").remove();

var up_votes = 0;
var down_votes = 0;
var user_vote = null;
var html = '';
console.log(app_state.anno_typ); // not checked. typ is defined by anno_id and thumb-attribute
console.log(app_state.anno_id);
//count entries
DBrating.find({
  selector: { 'target.anno_id' : app_state.anno_id},
}).then(function(result){
  $.each(result.docs, function (index, value) {
    console.log(value);
    if(value.target.anno_id === app_state.anno_id){
      console.log(value);
      if(value.body.thumb != undefined){ //only thumbs
          if(value.body.thumb === true){
            up_votes += 1;
          }else{
            down_votes += 1;
          }
          if(value.creator.id === user_state.timestamp){
            user_vote = value.body.thumb;
          }
      }
    }
});
//'creator.id' : user_state.timestamp
console.log(result);

html += `<div class="rating-thumb">
 <button class="demo-button mdc-button mdc-button--raised mdc-ripple-upgraded thumbUp">
 <i class="material-icons-outlined mdc-button__icon">thumb_up</i>
 <span class="mdc-button__label">`+up_votes+`</span
 </button>
  <button class="demo-button mdc-button mdc-button--raised mdc-ripple-upgraded thumbDown">
  <i class="material-icons-outlined mdc-button__icon">thumb_down</i>
  <span class="mdc-button__label">`+down_votes+`</span>
  </button>
</div`;

elem.html(html);
if(user_vote === true){

  $(".thumbUp:visible").attr("disabled", true);
  $(".thumbDown:visible").attr("disabled", true);
$(".thumbUp:visible").find("i").toggleClass("material-icons").toggleClass("material-icons-outlined");
//Working?
console.log("user_vote true");
}else if(user_vote == false){
    $(".thumbUp:visible").attr("disabled", true);
    $(".thumbDown:visible").attr("disabled", true);
$(".thumbDown:visible").find("i").toggleClass("material-icons").toggleClass("material-icons-outlined");
}
});

}

//check, if user has already pressed any button

function actionThumbUp(){
//create new rating with thumb down
console.log("thumbUp");
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Rating",
"body" : {
  "rating" : null,
  "comment" : null,
  "skuril" : null,
  "thumb" : true
},
"target" : {
  "pubid": app_state.pubs,
  "menu" : app_state.menu,
  "menupage": app_state.menupage,
  "anno_id" : app_state.anno_id,
  "anno_typ" : app_state.anno_typ
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
DBaddnew(data, DBrating);

}
function actionThumbDown(){
//create new rating with thumb false
console.log("ThumbDown");
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Rating",
"body" : {
  "rating" : null,
  "comment" : null,
  "skuril" : null,
  "thumb" : false
},
"target" : {
  "pubid": app_state.pubs,
  "menu" : app_state.menu,
  "menupage": app_state.menupage,
  "anno_id" : app_state.anno_id,
  "anno_typ" : app_state.anno_typ
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
DBaddnew(data, DBrating);

}
$("#card-dishes-detail").on("click", ".thumbUp", function(evt){
  console.log(this);
  var th = parseInt(($(this).closest("button").find("span").text())) + 1;
  console.log("Up" + th);
  $(".thumbUp:visible").attr("disabled", true);
  $(".thumbDown:visible").attr("disabled", true);
  $(".thumbUp:visible").find("i").toggleClass("material-icons").toggleClass("material-icons-outlined");
  $(this).closest("button").find("span").html(th);

  actionThumbUp();
});



$("#card-dishes-detail").on("click", ".thumbDown", function(evt){
  console.log(this);
  var th = parseInt(($(this).closest("button").find("span").text())) - 1;
  console.log("Up" + th);
  $(".thumbUp:visible").attr("disabled", true);
  $(".thumbDown:visible").attr("disabled", true);

  $(".thumbDown:visible").find("i").toggleClass("material-icons").toggleClass("material-icons-outlined");
  $(this).closest("button").find("span").html(th);

  actionThumbDown();
});


$("#map-info-popup").on("click", ".thumbUp", function(evt){
  console.log(this);
  var th = parseInt(($(this).closest("button").find("span").text())) + 1;
  console.log("Up" + th);
  $(".thumbUp:visible").attr("disabled", true);
  $(".thumbDown:visible").attr("disabled", true);
  $(".thumbUp:visible").find("i").toggleClass("material-icons").toggleClass("material-icons-outlined");
  $(this).closest("button").find("span").html(th);

  actionThumbUp();
});


$("#map-info-popup").on("click", ".thumbDown", function(evt){
  console.log(this);
  var th = parseInt(($(this).closest("button").find("span").text())) + 1;
  console.log("Down" + th);
  $(".thumbUp:visible").attr("disabled", true);
  $(".thumbDown:visible").attr("disabled", true);
  $(".thumbDown:visible").find("i").toggleClass("material-icons").toggleClass("material-icons-outlined");
  $(this).closest("button").find("span").html(th);

  actionThumbDown();
});

$("#annotation-info-popup").on("click", ".thumbUp", function(evt){
  console.log(this);
  var th = parseInt(($(this).closest("button").find("span").text())) + 1;
  console.log("Up" + th);
  $(".thumbUp:visible").attr("disabled", true);
  $(".thumbDown:visible").attr("disabled", true);
  $(".thumbUp:visible").find("i").toggleClass("material-icons").toggleClass("material-icons-outlined");
  $(this).closest("button").find("span").html(th);
  actionThumbUp();
});

$("#annotation-info-popup").on("click", ".thumbDown", function(evt){
  console.log(this);
  var th = parseInt(($(this).closest("button").find("span").text())) + 1;
  console.log("Up" + th);
  $(".thumbUp:visible").attr("disabled", true);
  $(".thumbDown:visible").attr("disabled", true);
  $(".thumbDown:visible").find("i").toggleClass("material-icons").toggleClass("material-icons-outlined");
  $(this).closest("button").find("span").html(th);

  actionThumbDown();
});

$("#pubs-list-sort-atoz").click(function(){
  if($("#pubs-list").hasClass('sort_asc')){
    $("#pubs-list li").sort(asc_sort).appendTo('#pubs-list');
    $("#pubs-list").removeClass('sort_asc')
  }else{
    $("#pubs-list li").sort(dec_sort).appendTo('#pubs-list');
    $("#pubs-list").addClass('sort_asc')
  }
  // accending sort
  function asc_sort(a, b){
      return ($(b).text()) < ($(a).text()) ? 1 : -1;
  }

  // decending sort
  function dec_sort(a, b){
      return ($(b).text()) > ($(a).text()) ? 1 : -1;
  }

})

$("#pubs-list-sort-progress").click(function(){
  if($("#pubs-list").hasClass('sort_pro')){
    $("#pubs-list li").sort(asc_sort).appendTo('#pubs-list');
    $("#pubs-list").removeClass('sort_pro')
  }else{
    $("#pubs-list li").sort(dec_sort).appendTo('#pubs-list');
    $("#pubs-list").addClass('sort_pro')
  }
  // accending sort
  function asc_sort(a, b){
      return ($(b).attr('data-complete')) < ($(a).attr('data-complete')) ? 1 : -1;
  }

  // decending sort
  function dec_sort(a, b){
      return ($(b).attr('data-complete') ) > ($(a).attr('data-complete')) ? 1 : -1;
  }

})



$(".filter-sort > .filter-buttons  > button").on("click", function (evt){
//find next list and filter or sort
console.log(this);
var list = $(this).closest("div .filter-sort").find("ul:visible");
if($(this).attr('filter-user') != undefined){
if($(this).attr("user-filter-active") != undefined){
list.find("li").show();
$(this).removeAttr("user-filter-active");
}else{
  $(this).attr("user-filter-active");
  list.find("li").hide();
  list.find("li[user-created]").show();
}

}else if($(this).attr('sort-time') != undefined){
if($(list).hasClass('sort_time_asc')){
  $(list).find("li").sort(asc_sort).appendTo(list);
  $(list).removeClass('sort_time_asc');
}else{
  $(list).find("li").sort(dec_sort).appendTo(list);
  $(list).addClass('sort_time_asc')
}
// accending sort
function asc_sort(a, b){
  return ($(b).attr('data-timestamp')) < ($(a).attr('data-timestamp')) ? 1 : -1;
}

// decending sort
function dec_sort(a, b){
  return ($(b).attr('data-timestamp')) > ($(a).attr('data-timestamp')) ? 1 : -1;
}

}else if($(this).attr('filter-coord') != undefined){
  if($(this).attr("coord-filter-active") != undefined){
  list.find("li").show();
  $(this).removeAttr("coord-filter-active");
  }else{
    $(this).attr("coord-filter-active", "true");
    list.find("li").hide();
    list.find("li[coord-missing]").show();
  }
}else if($(this).attr('sort-atoz') != undefined){
if($(list).hasClass('sort_atoz_asc')){
  $(list).find("li").sort(asc_sort).appendTo(list);
  $(list).removeClass('sort_atoz_asc');
}else{
  $(list).find("li").sort(dec_sort).appendTo(list);
  $(list).addClass('sort_atoz_asc')
}
// accending sort
function asc_sort(a, b){
  return ($(b).find('mdc-list-item__primary-text').text()) < ($(a).find('mdc-list-item__primary-text').text()) ? 1 : -1;
}

// decending sort
function dec_sort(a, b){
  return ($(b).find('mdc-list-item__primary-text').text()) > ($(a).find('mdc-list-item__primary-text').text()) ? 1 : -1;
}

}else if($(this).attr('filter-category-button') != undefined){
//toggle filter
//add event handlers
//container:
var category = $(this).closest("div .filter-sort").find(".filter-category-options").toggle();

//register event handlers
};
});

$(".filter-category-options").on('click', '.mdc-chip', function(evt){
$(this).toggleClass("mdc-chip--selected");
var data_type = $(this).attr("data-type");
//find next visible list and hide all and show all categories with activated filters
$(this).closest("div .filter-sort").find("ul:visible").find(`[data-type=`+data_type+`]`).toggle();
//show entries with this data-type or hide entries with this data-type

console.log("hide entries");


});

$("#annotation-list").on("click", ".mdc-list-item", function(){
var db = null;
if($(this).attr('data-type') === "Other"){
db = DBanno_other;
}else if($(this).attr('data-type') === "Dishes"){
db = DBdishes;
}else if($(this).attr('data-type') === "Category"){
db = DBcategory;
}else if($(this).attr('data-type') === "OpeningHours"){
db = DBopeninghours;
}else if($(this).attr('data-type') === "Ads"){
db = DBads;
}else if($(this).attr('data-type') === "Image"){
db = DBimage;
}
db.get($(this).attr("data-id")).then(function(result){
var anno_info = result;
app_state.anno_id = anno_info._id;
app_state.anno_type = anno_info.annotype;
console.log(anno_info);
redrawAnnotationInfoDialog(anno_info);
annotation_info_dialog.open();

}).catch(function(err){
  console.log(err);
});
//data-id data-type
//showAnnotationInfoDialog
//set variables
//redraw Dialog and open
});


$("#list-anno-you").on("click", ".mdc-list-item", function(){
  //extend for geo and ratings
var db = null;
if($(this).attr('data-type') === "Other"){
db = DBanno_other;
}else if($(this).attr('data-type') === "Dishes"){
db = DBdishes;
}else if($(this).attr('data-type') === "Category"){
db = DBcategory;
}else if($(this).attr('data-type') === "OpeningHours"){
db = DBopeninghours;
}else if($(this).attr('data-type') === "Ads"){
db = DBads;
}else if($(this).attr('data-type') === "Image"){
db = DBimage;
}
if(db != null){
db.get($(this).attr("data-id")).then(function(result){
var anno_info = result;
console.log(anno_info);
app_state.anno_id = anno_info._id;
app_state.anno_type = anno_info.annotype;
redrawAnnotationInfoDialog(anno_info);
annotation_info_dialog.open();
}).catch(function(err){
  console.log(err);
});
}else if($(this).attr('data-type') === "Geo"){
  DBgeo.get($(this).attr("data-id")).then(function(result){
  var anno_info = result;
  app_state.anno_id = anno_info._id;
  app_state.anno_type = anno_info.annotype;
  app_state.pubs = result.target.pubid;

  redrawMapPubDialog(result.body.latlng, result);
  getSingleTeaserInfo($("#map-info-popup").find("[map-teaser]"));

  drawThumb($("#map-info-popup").find("[geo-rating]"));
  app_state.pubs = this.target.pubid; //prerender Pubs-Dialog
  redrawPubs(app_state.pubs);
  map_pubinfo_dialog.open();
  }).catch(function(err){
    console.log(err);
  });

}else if($(this).attr('data-type') === "Rating"){
//Comment Dishes-Funktion here
DBrating.get($(this).attr("data-id")).then(function(result){
var anno_info = result;
app_state.anno_id = anno_info._id;
app_state.anno_type = anno_info.annotype;
app_state.pubs = result.target.pubid;

drawThumb($("#map-info-popup").find("[geo-rating]"));
app_state.pubs = this.target.pubid; //prerender Pubs-Dialog
redrawPubs(app_state.pubs);
map_pubinfo_dialog.open();
}).catch(function(err){
  console.log(err);
});

}
//data-id data-type
//showAnnotationInfoDialog
//set variables
//redraw Dialog and open
});

$("#button-menu-complete-add").click(function(evt){
  redrawCompleteDialog(app_state.menupage);
complete_dialog.open();

})

$("#dialog-complete").find('[data-mdc-dialog-action="accept"]').click(function(evt){
//save new entry
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Menufinished",
"body" : {
  "status" : true,
  "comment" : complete_comment.value,
},
"target" : {
  "pubid":app_state.pubs,
  "menu" : app_state.menu,
  "menupage": app_state.menupage,
  "selector": null,
  "coord" : null,
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
DBaddnew(data, DBmenu_status);
//redraw PubMenuList with new Status
redrawMenuList(app_state.pubs);

});

$(document).on("click", ".playerinfo", function(evt){
  player_id = $(this).attr("data-id");
  app_state.player = player_id;
  evt.preventDefault();
  showTextOnSnackbarButton("Profilseite anzeigen?", 6000, "Ja", "showprofile");
});

$("#snackbar").find(".mdc-snackbar__action").on("click", function(evt){
  console.log("snackbar clicked");
var action = $("#snackbar").attr("action");
  if(action === "showprofile"){
    let player_id = app_state.player;
    $( "main" ).hide();
    if(player_id === user_state.timestamp || player_id == undefined){
      $( "#card-about-you" ).show();
    }else{
      redrawPlayerInfo(player_id, $("#card-about-other"));
      $( "#card-about-other" ).show();
    }
    drawer.open = false;
  }
})

/* for add-to-home-screen functionality. Only if supperted*/
let deferredPrompt;
$("#tutorial-serviceworker-a2hs-button").hide();

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  console.log("A2HS is supported");
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  $("#tutorial-serviceworker-a2hs-button").show();


  $("#tutorial-serviceworker-a2hs-button").click(function(evt){
    showHelp("A2HS", true , null , null);

    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
      })
  });
//check initial state
if(Notification.permission === "default"){
$("#tutorial-serviceworker-push-button").html('Push Notifications deaktiviert <i class="material-icons mdc-icon-button__icon">notifications_none</i>');
}
if(Notification.permission === "granted"){
$("#tutorial-serviceworker-push-button").html('Push Notifications aktiviert <i class="material-icons mdc-icon-button__icon">notifications</i>');
}
if(Notification.permission === "denied"){
$("#tutorial-serviceworker-push-button").html('Push Notifications deaktiviert <i class="material-icons mdc-icon-button__icon">notifications_off</i>');
}

$("#tutorial-serviceworker-push-button").click(function(evt){
  console.log(Notification.permission);
  if(Notification.permission === "granted"){
    showTextOnSnackbarButton("Zum Deaktivieren Browsereinstellungen ändern", "6000", "Okay");

  }
      const requestNotificationPermission = async () => {
      const permission = window.Notification.requestPermission();
      // value of permission can be 'granted', 'default', 'denied'
      // granted: user has accepted the request
      // default: user has dismissed the notification permission popup by clicking on x
      // denied: user has denied the request.
      /*if(permission !== 'granted'){
          throw new Error('Permission not granted for Notification');
      }
      */
      if(permission === "denied"){
        $("#tutorial-serviceworker-push-button").html('Push Notifications deaktiviert <i class="material-icons mdc-icon-button__icon">notifications_off</i>');
        showTextOnSnackbar("Notifications abgelehnt", "6000");

      }else if(permission === "granted"){
        $("#tutorial-serviceworker-push-button").html('Push Notifications aktiviert <i class="material-icons mdc-icon-button__icon">notifications</i>');
        showTextOnSnackbar("Notifications aktiviert", "6000");

      }else if(permission == "default"){
        $("#tutorial-serviceworker-push-button").html('Push Notifications deaktiviert <i class="material-icons mdc-icon-button__icon">notifications_off</i>');
        showTextOnSnackbar("Notifications nicht aktiviert", "6000");

      }
      }

    const checkPush = async () => {
      if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
      showTextOnSnackbar("Browser unterstützt Funktionalität nicht", "6000");
      }
    const permission =  await requestNotificationPermission();
    //set new checked


    }

    checkPush();
  })

  $("#tutorial-serviceworker-push-send").click(function(evt){
    if(Notification.permission === "granted"){

    console.log("Send local Notification!");
    var options = {};
    //console.log(swRegistration);
    console.log(app_state.sw);
    var text = "Timestamp : " + Date.now() + " : Push-Benachrichtigungen sind aktiviert. Noch nutzt GastroGrantler dieses Feature aber nicht!";
    app_state.sw.showNotification(text, {
      "icon" : "assets/logo/Gastro_Grantler_favicon.png",
    });
  }else{
    showTextOnSnackbar("Push Notifications sind nicht aktiviert", "3000")
  }
});

$("#about-us-like").click(function(evt){
  showTextOnSnackbarButton("Schön, dass dir diese Anwendung gefällt. Empfehl uns doch anderen Leuten Weiter", "10000", "Wird gemacht!")
})


$("#about-us-like").click(function(evt){
  showTextOnSnackbarButton("Schön, dass dir diese Anwendung gefällt. Empfehl uns doch anderen Leuten Weiter", "10000", "Wird gemacht!")
})

$("#nav-gastro-about").click(function(evt){
  var text = "Gastrograntler || + Version: " +config.version;
  showTextOnSnackbarButton(text, "10000", "OKAY")

})

$("#tutorial-help-list").on("click", ".mdc-chip", function(evt){
  showHelp($(this).attr("data-id"), true, null, null);
})

$("#guestbook-list").click(function(evt){
  redrawGuestBook($("#guestbook_entries"));

  guestbook_dialog.open();
})

$("#guestbook_add_entry").click(function(evt){
var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Guestbook",
"body" : {
  "type" : "comment",
  "name" : guestbook_comment.value,

},
"target" : {
	"pubid":app_state.pubs,
  "menu" : null,
	"menupage": null,
  "selector": null,
  "coord" : null,
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

showTextOnSnackbar("Gästebucheintrag hinterlegt!", 5000);

DBaddnew(data, DBguestbook)
console.log(data);
redrawGuestBook($("#guestbook_entries"));
})

$("#dash-sync-help").click(function(evt){
//showHelp
showHelp("Sync", false, null, null)
$("#dash-sync-up").removeAttr("disabled");
$("#dash-sync-down").removeAttr("disabled");

});
