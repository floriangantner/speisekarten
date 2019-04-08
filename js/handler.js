//##############################################################################
//###########  <<  handler.js >> ###############################################
//##############################################################################
//contains handlers for click on DOM in index.html

//##############################################################################
//init: the following stuff is done, when loading the CODE at beginning
$( "main" ).hide(); //hide by default in css code
$("#card-intro").show();

//show main intro
$("#menu").click(function(evt){
  drawer.open = true;

});

$("#nav-pubs-list").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  $( "#card-pubs-list" ).show();
});


$("#nav-map").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  $( "#card-map" ).show();
});

$("#nav-dishes-you").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  $( "#card-dishes-you" ).show();
});

$("#nav-dishes").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  $( "#card-dishes" ).show();
});

$("#nav-about-you").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
  $( "#card-about-you" ).show();
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
  $( "#card-tutorial" ).show();
});

$("#button-tutorial-go").click(function(evt){
  evt.preventDefault();
  $( "#card-intro" ).hide();
  drawer.open = true;
});

$(".pubs-list .mdc-list-item").click(function(evt){
  evt.preventDefault();
  $( "#card-pubs-list" ).hide();
  $( "#card-pubs-detail" ).show();
});


$("#button-pubs-menu").click(function(evt){
  evt.preventDefault();
  $( "#card-pubs-detail" ).hide();
  $( "#card-pubs-menu-list" ).show();
});


$("#button-dishes").click(function(evt){
  evt.preventDefault();
  $( "#card-pubs-detail" ).hide();
  $( "#card-pubs-dishes-list" ).show();

});

$(".pubs-menu-list .mdc-image-list__item").click(function(evt){
  evt.preventDefault();
  $( "#card-pubs-menu-list" ).hide();
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
