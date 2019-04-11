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
  redrawPubList();
drawer.open = false;
$( "#card-pubs-list" ).show();
});



$("#nav-map").click(function(evt){
  map.invalidateSize();
  evt.preventDefault();
  $( "main" ).hide();
  drawer.open = false;
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

$("#button-menu-detail-add-dish").click(function(evt){
  evt.preventDefault();
  console.log(annotation_dishes_dialog);
  annotation_dishes_dialog.open();
//  $( "#card-pubs-detail" ).show();
});

$("#button-pubs-back").click(function(evt){
  evt.preventDefault();
  $( "main" ).hide();
  $( "#card-pubs-detail" ).show();

});

$("#dialog-dishes-confirm").click(function(evt){
//look for
//menupageid
var menupageid = $("#card-menu-detail").attr("data-id");
var price = $("#dialog-dishes-price > input").val();
var name =  $("#dialog-dishes-name > input").val();
var data = {"name" : name,
"menupage" : menupageid,
"price" : price,
}
console.log(data);
DBaddnew(data,DBdishes);
//DBadd(data,DBdishes);
//add name and price as new dished to the database

});
