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
  if(user_state.identity == ""){
  alert("Keine Identität ausgewählt!");
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
  if(user_state.account_created == false){
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
    //alert($(this).attr('data-id'));
    redrawPubs($(this).attr('data-id'));
$( "#card-pubs-detail" ).show();

});

$('#dishes-all-list').on('click', '.mdc-list-item', function(evt){
console.log("clicked");
$( "#card-dishes-all" ).hide();
    //alert($(this).attr('data-id'));
    redrawDishes($(this).attr('data-id'));
$( "#card-dishes-detail" ).show();

});

$('#pubs-dishes-list').on('click', '.mdc-list-item', function(evt){
console.log("clicked");
$( "#card-pubs-dishes-list" ).hide();
    //alert($(this).attr('data-id'));
    redrawDishes($(this).attr('data-id'));
$( "#card-dishes-detail" ).show();
});

$("#button-pubs-menu").click(function(evt){
  evt.preventDefault();
  //get list of menus
  //populate menu-list
  var pubid = $(" #card-pubs-detail").attr("data-id")
redrawMenuList(pubid);
  $( "#card-pubs-detail" ).hide();
  $( "#card-pubs-menu-list" ).show();
});


$("#button-pubs-dishes").click(function(evt){
  evt.preventDefault();
  $( "#card-pubs-detail" ).hide();
  //show all dishes from this pub
  var pubid = $("#card-pubs-detail").attr("data-id");
redrawPubsDishesList(pubid);
  $( "#card-pubs-dishes-list" ).show();

});

$('#pubs-menu-list').on('click', '.mdc-image-list__item', function(evt){
console.log("clicked");
$( "#card-pubs-menu-list" ).hide();
    //alert($(this).attr('data-id'));
    redrawMenu($(this).attr('data-id'));
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

$("#button-pubs-back").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  $( "#card-pubs-detail" ).show();

});

$("#button-menu-detail-add-dish").click(function(evt){
  evt.preventDefault();
  annotation_dishes_dialog.open();
//  $( "#card-pubs-detail" ).show();
});

$("#button-menu-detail-add-openinghours").click(function(evt){
  evt.preventDefault();
  console.log(annotation_openinghours_dialog);
  annotation_openinghours_dialog.open();
//  $( "#card-pubs-detail" ).show();
});

$("#button-menu-detail-add-announcement").click(function(evt){
  evt.preventDefault();
  console.log(annotation_announcement_dialog);
  annotation_announcement_dialog.open();
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

$("#dialog-dishes-confirm").click(function(evt){
//look for
//menupageid
var menupageid = $("#card-menu-detail").attr("data-id");
var pubid = $("#card-pubs-detail").attr("data-id");
var price = $("#dialog-dishes-price > input").val();
var name =  $("#dialog-dishes-name > input").val();
var data = {"name" : name,
"menupage" : menupageid,
"price" : price,
"pubid" : pubid
}
console.log(data);
DBaddnew(data,DBdishes);
//DBadd(data,DBdishes);
//add name and price as new dished to the database

});

$("#dialog-openinghours-confirm").click(function(evt){
//look for
//menupageid
var menupageid = $("#card-menu-detail").attr("data-id");
var pubid = $("#card-pubs-detail").attr("data-id");
var value =  $("#dialog-openinghours-name > input").val();
var data = {
"menupage" : menupageid,
"pubid" : pubid,
"value" : value
}
console.log(data);
DBaddnew(data,DBopeninghours);
//DBadd(data,DBdishes);
//add name and price as new dished to the database

});

$("#dialog-geolocation-confirm").click(function(evt){
//look for
//menupageid
var menupageid = $("#card-menu-detail").attr("data-id");
var pubid = $("#card-pubs-detail").attr("data-id");
var city = $("#dialog-geolocation-city > input").val();
var address =  $("#dialog-geolocation-address > input").val();
var data = {"city" : city,
"menupage" : menupageid,
"address" : address,
"pubid" : pubid
}
console.log(data);
DBaddnew(data,DBgeo);
//DBadd(data,DBdishes);
//add name and price as new dished to the database

});

$("#dialog-announcement-confirm").click(function(evt){
//look for
//menupageid
var menupageid = $("#card-menu-detail").attr("data-id");
var pubid = $("#card-pubs-detail").attr("data-id");
var value = $("#dialog-announcement-name > input").val();
var data = {"value" : value,
"menupage" : menupageid,
"pubid" : pubid,
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
registerPlayer();
$("#card-tutorial").show();
});

$("#button-identity-random").click(function(evt){
  progress_identify_face.open();
  progress_identify_face.determinate = false;
  // select random person
$("#button-identity-confirm").attr("disabled", false);
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
alert("ähnliche Person wird gesucht. naja eigentlich noch nicht!");
$("#button-identity-camera").attr("disabled", false);
$("#button-identity-submit").attr("disabled", false);
//TODO: Select Code for for selection
redrawRandomIdentityChoice();
// select random person
$("#button-identity-confirm").attr("disabled", false);
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
  redrawMapPubDialog(this.addressinfo, this._latlng);
  //prerender view of pub when clicking this
  //redrawPubs(this.pubid);
  redrawPubs(this.addressinfo.pubid);

map_pubinfo_dialog.open();
//Get info about Put
}

$("#map-showpubinfo-popup").find('[data-mdc-dialog-action="accept"]').click(function(){
  map_pubinfo_dialog.close();
  $( "#card-map" ).hide();
$( "#card-pubs-detail" ).show();

});
