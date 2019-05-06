//Access to the DB

function app_init(){

  //function called when init the game.
  //check for game-data
  //check for identity
  //fixme: async load of data
  dataStructure_check();
  progress_loader.progress = 0.6;
identity_check();
  progress_loader.progress = 1;
  $("#menu").attr("disabled", false);
  $("#button-intro-go").attr("disabled", false);

}

function newPubListElement(data, elem){
  //generated Code for Entry.
 var card_html = '';
$.each(data, function (index, value) {

      card_html = `<li class="mdc-list-item mdc-ripple-upgraded" tabindex="0" data-id="${value.id}">
        <span class="mdc-list-item__text"><span class="mdc-list-item__primary-text">${value.doc.name}</span>
        <span class="mdc-list-item__secondary-text"><span data-stat></span><span data-geo></span></span></span>
        <span class="mdc-list-item__meta" aria-hidden="true" data-status><i class="material-icons">check</i></span>
      </li>`;
      elem.append(card_html);
    })

console.log(data.length + " Pubs written to PubsList");
}

function enrichPubListwithStatistic(elem){
  //icons -> done, done_all, help_outline
  //print more information -> Geolocation, if available, number of dishes, number of menu_pages, sterne, total status,
  /*
  <span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">${logo}</span>
  </li>`;
  */
  var counter = 0;
elem.find("li").each(function(index, value){
  let id = $(this).attr("data-id");
getPubsStatistic(id).then(function(result){
$(value).find("[data-stat]").html(`${result.menupage} <i class="material-icons">chrome_reader_mode</i>`)
return getGeoStatistic(id)
}).then(function(result){
  if(result.geo <= 0){
$(value).find("[data-geo]").html(`<i class="material-icons">location_off</i>`)
}else if(result.geo === 1){
$(value).find("[data-geo]").html(`<i class="material-icons">location_on</i>`)
}else{
$(value).find("[data-geo]").html(`${result.geo}<i class="material-icons">location_on</i>`)
}
counter += result.geo;
if(counter === 0){
$(value).find("[data-status]").html(`<i class="material-icons">help_outline</i>`)
}else if(counter < 4){
$(value).find("[data-status]").html(`<i class="material-icons">done</i>`)
}else if(counter > 4){
  //TODO Check with menupages, if all are finished
$(value).find("[data-status]").html(`<i class="material-icons">done_all</i>`)

}

}).catch(function(err){
  console.log(err);
})


});
}

//return List of all Pubs
function redrawPubList(){
var List = [];
DBpubs.allDocs({
    include_docs: true
  },function(err, doc){
    elem = $("#pubs-list");
    elem.html('');
    newPubListElement(doc.rows, elem);
    if($.trim($(elem).html()) === ''){
      elem.html('Es wurden keine Gasthäuser gefunden.');
    };

    enrichPubListwithStatistic(elem);
    //enrich with statistics?
    });
  };

  //return List of all Pubs
  function redrawPubs(id){
  DBpubs.get(id).then( function(doc){
      newPubCard(doc)
      redrawPubsDishesList(app_state.pubs);
      redrawMenuList(app_state.pubs);
      $(".pubs-tab-element").hide();
      $(`.pubs-tab-element[data-tab="info"]`).show();
      //var list = newPubListElement(doc.rows);
      console.log(doc);
      //$("#pubs-list").html('');
      //$(" #pubs-list").append(list);

      });
};

function newPubCard(data){
  //generated Code for Entry.
  app_state.pubs = data.id
  $("#pubs-detail-tabs-info > .demo-card__primary > h2  ").text(`${data.name}`);
  redrawPubsAdressList();
  redrawPubsRatingInfo();

}

function redrawPubsRatingInfo(){
getPubsRatingStatistic(app_state.pubs).then(function(result){
console.log(result);
  $("#pubs-detail-tabs-info").find("[pubs-rating]").html('').html(visualizeRating(((result.rating)/(result.rating_count)).toFixed(1))+ " aus " + result.rating_count + " Bewertungen!");
}).catch(function(err){
  console.log(err);
})

}

function redrawPubsAdressList(){
  DBgeo.allDocs({
      include_docs: true
    },function(err, doc){
      $("#pubs-adress-list").html('');
      $.each(doc.rows, function (index, value) {
        if(value.doc.language != "query" && value.doc.target.pubid === app_state.pubs){
              var list = newAdressListElement(value.doc);
              console.log(list);
              $("#pubs-adress-list").prepend(list);
            }
      });

});
}

function newAdressListElement(data){
  console.log(data);
   var card_html = `<li class="mdc-list-item" data-id="${data._id}">
           <span class="mdc-list-item__graphic">
           <button class="mdc-icon-button material-icons" title="Geolocate" data-mdc-ripple-is-unbounded="true" >map</button>
           </span>
           <span class="mdc-list-item__text">${data.body.street} ${data.body.number},  ${data.body.zip} ${data.body.city}</span>
         </li>`;
  return card_html;
}

function redrawMenuList(pubid){
//TODO: refine query

DBmenu.find({
  selector: {pub : pubid},
}, function (err, result) {
  console.log(result);
$("#pubs-menu-list").html('');
  $.each(result.docs, function (index, value) {
  var list = newMenuListElement(value);
  if($.trim($("#pubs-menu-list").html()) === ''){
    elem.html('Zurzeit gibt es in diesem Gasthaus keine Speisekarten. Versuche es später noch einmal, vielleicht finden wir noch eine..');
  };


  $(" #pubs-menu-list").append(list);
  });
});
}

function newMenuListElement(data){
      //generated Code for Entry.
      //using images
     var card_html = '';
  console.log(data);
    card_html += `<h3 mdc-typography mdc-typography--headline6>${data.name}</h3>
    <div class="mdc-chip mdc-chip--selected">
          <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">date_range</i>
          <div class="mdc-chip__text">${data.date}</div>
        </div>
        <div class="mdc-chip mdc-chip--selected">
              <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">date_range</i>
              <div class="mdc-chip__text" menupage-search-type>${data.typ}</div>
            </div>
    <ul class="mdc-image-list mdc-image-list--masonry my-masonry-image-list">`;
    //get preview image from iiif server
    $.each(data.menupages, function (index1, value1) {
      var img_url = config['iiifserver'] + value1.filepath.replace(/\//g, "%2F") + "/full/!200,200/0/default.jpg";
      card_html += `<li class="mdc-image-list__item" data-id="${value1.id}">
        <img class="mdc-image-list__image" src="${img_url}" alt="Kein Bild">`;
        //<div class="mdc-image-list__supporting">Beschreibung der Liste
        //card_html += `</div>`;
      card_html += `</li>`;

      //<span class="mdc-image-list__label">${value1.category}</span>

  });
  card_html += `</ul>`;
    return card_html;
};

  function redrawDishesAllList(){
    //deprecated?
  var List = [];
  DBdishes.allDocs({
      include_docs: true
    },function(err, doc){
      $("#dishes-all-list").html('');
      var list = newDishesAllListElement(doc.rows);
      console.log(list);
      $("#dishes-all-list").append(list);
      });
    };

function newDishesAllListElement(data){
  var card_html = '';
 $.each(data, function (index, value) {
   if(value.doc.language != "query"){
   console.log(value)
   var logo = value.doc.body.type;
if(logo === "drink"){
logo = 'restaurant';
}else if(logo === "meal"){
logo = 'local_drink';
}else if(logo === "other"){
logo = 'device_unknown';
  }
   card_html += `<li class="mdc-list-item mdc-ripple-upgraded" tabindex="0" data-id="${value.doc._id}">
     <span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">${logo}</span>
     <span class="mdc-list-item__text"><span class="mdc-list-item__primary-text">${value.doc.body.name}</span>
     <span class="mdc-list-item__secondary-text">${value.doc.body.description}</span></span>
     <span class="mdc-list-item__meta" aria-hidden="true">${value.doc.body.price} ${value.doc.body.price_currency}</span>
   </li>`;
 }
 });
 return card_html;
}

//return List of all Pubs
function redrawDishes(id){
  console.log(id);
DBdishes.get(id).then( function(doc){
    newDishesCard(doc)
    //var list = newPubListElement(doc.rows);
    console.log(doc);
    //$("#pubs-list").html('');
    //$(" #pubs-list").append(list);
    var elem = $("#card-dishes-detail").find("[dish-rating]");
    console.log(elem);
    drawThumb(elem);
    return getIIIfPreviewSnippetUrl(doc._id, doc.target);
  }).then(function(result){
    let url = config.iiifserver + result;
    $("#dish-iiif-preview").attr("src",url);
  });
};

function newDishesCard(data){
//generated Code for Entry.
//set menu and pub from dishes-id //may come from allDishes etc..
app_state.pubs = data.target.pubid;
app_state.menu = data.target.menu;
app_state.menupage = data.target.menupage;
app_state.anno_id = data._id;
app_state.anno_typ = data.annotype;

let logo = data.body.type;
if(logo === "drink"){
logo = `<span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">restaurant</span>`;
}else if(logo === "meal"){
logo = `<span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">local_drink</span>`;
}else if(logo === "other"){
logo = `<span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">device_unknown</span>`;
}
$("#card-dishes-detail").find("[dish-name]").html(data.body.name);
$("#card-dishes-detail").find("[dish-type]").html(logo);
$("#card-dishes-detail").find("[dish-comment]").html(data.body.description);
$("#card-dishes-detail").find("[dish-amount]").html(data.body.amount);
$("#card-dishes-detail").find("[dish-price]").html(data.body.price);
$("#card-dishes-detail").find("[dish-currency]").html(data.body.price_currency);

let category = data.body.categoryName;
if(category === "none"){
  category = "in keiner Kategorie";
}
$("#card-dishes-detail").find("[dish-category]").html(`<div class="mdc-chip mdc-chip--selected">
  <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">category</i>
  <div class="mdc-chip__text">${category}</div>
</div>`);

$("#card-dishes-detail").find("[iiif-preview]").html(`<div><img id="dish-iiif-preview" alt="Kein Bild"></div>`);


DBrating.find({
  selector: {'target.anno_id' : data._id, 'target.anno_typ' : 'Dish' },
}, function (err, result) {
  console.log(result);
  if (err) { return console.log(err); }
  $("#dishes-rating-list").html('');
  for(var doc in result.docs){
    console.log(doc)
    if(result.docs[doc].target.anno_typ === "Dish" && result.docs[doc].body.comment != null && result.docs[doc].body.comment != undefined){
    var list = newDishesRatingElement(result.docs[doc]);
    }
    console.log(list)
    $("#dishes-rating-list").prepend(list);
  }
  // handle result
});
}

function newDishesRatingElement(data){
  //TODO: Sterne und Zeit formatieren
return `<li class="mdc-list-item" tabindex="0" data-id="${data._id}">
<span class="mdc-list-item__text">
<span class="mdc-list-item__primary-text">${data.body.comment} `+ visualizeRating(data.body.rating) +`</span>
<span class="mdc-list-item__secondary-text">${data.creator.name} : ` + timeDifference(Date.now(), data.created) + `</span>
</span>
</li>`;
}

function redrawMenu(menupageid){
//TODO: refine query to show menupage
//maybe not performant?

DBmenu.query((doc, emit) => {
          for (let element of doc.menupages) {
            if (element.id === menupageid) {
              emit(element);
            }
          }
        }).then((result) => {
          for (let row of result.rows) {
            console.log(row);
            newMenuCard(row.key);
          }
        })

/*
DBmenu.find({
  selector: {menupages : "101b"},
}, function (err, result) {
  if (err) { return console.log(err); }
  console.log(result)
  // handle result
}); */
/*
DBmenu.allDocs({
    include_docs: true
  },function(err, doc){
    newMenuCard(doc.rows);
    console.log(list);
}); */
}

function newMenuCard(data){
      //generated Code for Entry.
      //using images

      console.log(data);
      //encoding not working properly with iiif-server, thus replacing
      var uri = config['iiifserver'] + data.filepath.replace(/\//g, "%2F") + "/info.json";
      console.log(uri);
      loadTileLayer(uri, data.category);

      $("#card-menu-detail").find("[menupage-name]").html(data.name);
      $("#card-menu-detail").find("[menupage-date]").html(data.date);
      $("#card-menu-detail").find("[menupage-typ]").html(data.typ);
      //$("#card-menu-detail > div > .mdc-card__primary-action > .mdc-card__media ").attr('style', `background-image: url(assets/${data.filename})`);

      app_state.menupage = data.id;
      let menu = app_state.menupage.split("/")
      app_state.menu = menu[0] + "/" + menu[1];
     //TODO: change some menu card
}

function redrawPubsDishesList(pubid){
  DBdishes.find({
    selector: {'target.pubid' : pubid},
  }, function (err, result) {
    if (err) { return console.log(err); }
    var list = newPubsDishesListElement(result);

    if($.trim($(list).html()) === ''){
      list = `<li class="mdc-ripple-upgraded" tabindex="0"">
      Noch sind für dieses Gasthaus keine Gerichte bekannt.
      Sei der erste Gast hier und probiere ein paar Gerichte.
      </li>`;
    }
    $("#pubs-dishes-list").html('');
    $("#pubs-dishes-list").append(list);
    // handle result
  });
}

function newPubsDishesListElement(data){
  var card_html = '';
 $.each(data.docs, function (index, value) {
   console.log(value)
   var logo = value.body.type;
   if(logo === "drink"){
   logo = 'restaurant';
   }else if(logo === "meal"){
   logo = 'local_drink';
   }else if(logo === "other"){
   logo = 'device_unknown';
   }

   card_html +=`<li class="mdc-list-item mdc-ripple-upgraded" tabindex="0" data-id="${value._id}">
     <span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">${logo}</span>
     <span class="mdc-list-item__text"><span class="mdc-list-item__primary-text">${value.body.name}</span>
     <span class="mdc-list-item__secondary-text">${value.body.description}</span></span>
     <span class="mdc-list-item__meta" aria-hidden="true">${value.body.price} ${value.body.price_currency}</span>
   </li>`;
 });
 return card_html;
}

function redrawRandomIdentityChoice(){
  //performant? or other function in PouchDB
  DBhist_persons.info().then(function(response) {

    let max = response.doc_count;
    let min = 1;

    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(min + " <-> " + max + " <-> " + rand);

    DBhist_persons.find({
       selector: {_id: {$gte : '1'}},
       limit : 1,
       skip : rand-1,
    },function(err, doc){
      console.log(doc);
      newIdentityInfo(doc.docs);

      });
});
}

function registerPlayer(coord, img2DB){
console.log("Player with Identity registred");
var identity_id = app_state.histperson;
//add selected player to db
var timestamp = JSON.stringify(Date.now());
var player = {"_id" : timestamp,
"id" : timestamp,
"identity" : identity_id,
"coord" : coord }
//write player data to DB, get data and add image attachement
//DBadd(player, DBuser);
//var url = URL.createObjectURL(img2DB);
//$('#nav-drawer > * > [user-image]').attr('src', url);
//.attr('width', '64px').attr('height', '64px');

var imagename = timestamp + "_" + identity_id + ".jpeg"
DBuser.put(player).then(function (){
return DBuser.get(timestamp)
}).then(function(result){
  //add image here
  console.log(result);
  console.log(imagename);
  console.log(img2DB);
  return DBuser.putAttachment(result._id, imagename, result._rev, img2DB, 'image/jpeg');
}).then(function(result){
  console.log(result);
  return DBuser.getAttachment(timestamp, imagename);
}).then(function(blob) {
  redrawUserImage(blob);
 }).catch(function(err){
  console.log(err);
});
user_state.setAccount = true;
user_state.identity = identity_id;
user_state.timestamp = timestamp;
//getIdentityInfos(identity_id);
//redraw
//$("#card-about-you > * > [user-image]").attr('src', doc.file).attr('width', '50%').attr('height','50%');

redrawUserInfo();
//create Head-Entry from the given entries, coords and id
DBhist_persons.get(user_state.identity).then(function(doc){
coord_prozent = coord.prozent.x + "," + coord.prozent.y + "," + coord.prozent.w + "," + coord.prozent.h;
var data_head = {
  "@context" : "http://www.w3.org/ns/anno.jsonld",
  "type" : "Annotation",
  "annotype" : "PersonHead",
  "body" : {
    "selector": {
      "type": "FragmentSelector",
      "conformsTo": "Prozent des Bildes",
      "value": "xywh="+coord_prozent+"",
      },
      "coord" : {
        "type": "Displayed and NaturalWidth/Height Values",
        "conformsTo": "px",
        "value": coord
      }
  },
  "target" : {
    "personID" : doc.id,
    "file" : "http://www.digiporta.net/opendata/dm/img/"+doc.file,
    "filexml" : doc.xmlfile,
  },
  "creator" : {
    "id" : user_state.timestamp,
    "name" : doc.name,
    "identity" : user_state.identity
  },
  "generator" : {
    "name" : "tripadviswurst"
  },
  "created" : JSON.stringify(Date.now()),
  "motivation" : "commenting"
  }
  console.log('Info to historical Person added!')
console.log(data_head);
DBaddnew(data_head, DBpersons_head);
});
}

function redrawUserImage(blob){
    console.log(blob);
     var url = URL.createObjectURL(blob);
     console.log(url);
     $('#nav-image').attr('src', url).attr('width', '128px').attr('height', 'auto');

}

//TODO: not used yet
function getIdentityInfos(byID){
console.log("fetch Identity Infos");
DBhist_persons.get(byID).then( function(doc){
    //var list = newPubListElement(doc.rows);
    console.log(doc);
    //$("#pubs-list").html('');
    //$(" #pubs-list").append(list);
    });


}

function newIdentityInfo(data){
  console.log(data);
  var selectImg = $("#person-selector-image");
  if(!data[0]){
    $("#person-selector > div > h2").html("Keine Person gefunden. Versuch es nochmal.");

    selectImg.attr('src',``);
    app_state.histperson = ``;
  }else{

    if(!data[0].file.startsWith("http")){
      data[0].file = "assets/" + data[0].file;
    }
    $("#person-selector > div > h2").html("");

  selectImg.attr('src',`${data[0].file}`);
  console.log(selectImg);
  //Cropper Selector for person image
var areaselector = selectImg.imgAreaSelect({
        handles: true,
        onSelectStart: snackbarPortrait,
        onSelectEnd: setNextButtonvisible,
        aspectRatio:"3:4",
        minWidth:32,
        minHeight:32,
        x1:0,
        y1:0,
        enable:true,
        instance:true
    });
  app_state.histperson = data[0]._id
  var coord_image = {};
  function snackbarPortrait(){
    showTextOnSnackbar("Wähle auf dem Portrait das Gesicht aus", 7000)
  }
  function setNextButtonvisible(){
    //after first selection, Button gets visible
    $("#button-identity-confirm").show();
    $("#button-identity-confirm").attr("disabled", false);
    coord_image = {    clientWidth: selectImg[0].clientWidth,
        clientHeight: selectImg[0].clientHeight,
        naturalHeight: selectImg[0].naturalHeight,
        naturalWidth: selectImg[0].naturalWidth,
      width: selectImg[0].width,
    height: selectImg[0].height
  }

  };
//Skalierungen der Bilder
//ursprüngliches Bild
//angezeigtes Bild  -> (evtl. kleiner oder größer als ursprüngliches Bild)
//markiertes Bild -> bezieht sich auf angezeigtes Bild
//-> deswegen Berechnung von Prozentwerten
//Punkt * (angezeigte Breite / ursprüngliche Breite)
//Bild ist ursprünglich 100 Breit, angezeigt in Breite 200, Punkt 150 ist ausgewählt -> 75% -> ursprünglicher Punkt 75
//Bild ist ursprünglich 200 Breit, angezeigt in Breite 100, Punkt  25 ist ausgewählt -> 25% -> ursprünglihcer Punkt 50
//Abweichung im Prozentbereich ist gegeben. (beim runter/hochskalieren der Bilder) -> Runden auf zwei nachkommastellen
console.log("Höhe c: " + selectImg[0].clientHeight + "Weite c: " + selectImg[0].clientWidth + "Höhe n: " + selectImg[0].naturalHeight  + "Weite n" + selectImg[0].naturalWidth);

  $("#button-identity-confirm").on('click', function(){
    coord = {"selection" : areaselector.getSelection(),
  "displayedValue" : coord_image };
  console.log("Höhe c: " + selectImg[0].clientHeight + "Weite c: " + selectImg[0].clientWidth + "Höhe n: " + selectImg[0].naturalHeight  + "Weite n" + selectImg[0].naturalWidth);

  //bild umwandeln und mit den vorhandenen Koordinaten beschneiden
  //Zum Speichern in der Datenbank
  //Prozent des angeklickten Bildes:

  function extround(zahl) {
    //runden auf drei Nachkommastellen
    //50/(100/200)
    zahl = (Math.round(zahl * 100) / 100);
    return zahl * 1 / 1000; //prozentzahl
  }

  var prozent_x = (coord.selection.x1) / (coord_image.width/coord_image.naturalWidth) ,
  prozent_y = (coord.selection.y1) / (coord_image.height/coord_image.naturalHeight),
  prozent_w = (coord.selection.width) / (coord_image.width/coord_image.naturalWidth),
  prozent_h = (coord.selection.height) / (coord_image.height/coord_image.naturalHeight);
  coord.prozent = {x : extround(prozent_x),
        y : extround(prozent_y),
        w : extround(prozent_w),
        h : extround(prozent_h)};
    var canvas_img = document.createElement('canvas');
    var context = canvas_img.getContext('2d');
    //canvas_img.width =  coord.selection.width;
    //canvas_img.height = coord.selection.height;
    canvas_img.width = (Math.round(coord.selection.width * (coord_image.naturalWidth/coord_image.width)));
    canvas_img.height = (Math.round(coord.selection.height * (coord_image.naturalHeight/coord_image.height)));
    console.log(canvas_img.width + " - " + canvas_img.height )
    //https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas
    //Math.round(coord.selection.x1*(coord_image.width/coord_image.naturalWidth))
    context.drawImage(selectImg[0],
    (Math.round(coord.selection.x1 * (coord_image.naturalWidth/coord_image.width))),
    (Math.round(coord.selection.y1 * (coord_image.naturalHeight/coord_image.height))),
    (Math.round(coord.selection.width * (coord_image.naturalWidth/coord_image.width))),
    (Math.round(coord.selection.height * (coord_image.naturalHeight/coord_image.height))),
    0 , 0 ,
    (Math.round(coord.selection.width * (coord_image.naturalWidth/coord_image.width))),
    (Math.round(coord.selection.height * (coord_image.naturalHeight/coord_image.height))) )
   // Warning: toBlob() isn't supported by every browser.
     // You may want to use blob-util.

$('#button-identity-camera').one('click', function(){
  $('#person-selector-image').imgAreaSelect({remove:true});
})

$('#button-identity-camera').one('click', function(){
  $('#person-selector-image').imgAreaSelect({remove:true});
})

$('#person-selector-image').imgAreaSelect({remove:true});
console.log(coord);

canvas_img.toBlob(saveImage, 'image/jpeg');
//callback function from toBlob
function saveImage(blob) {
  console.log(blob);
    registerPlayer(coord, blob);

}

  });
  };
  }
  //$("#person-selector").show();

function redrawAnnotationInfoDialog(anno){
  //get Data from klicked Annotation
  //distinguish different AnnotationTypes -> TODO: first only for dishes
  let creator_name;
  if(anno.creator.name === undefined || anno.creator.name == ""){
    creator_name = "Anonym";
  }
var html = `<div anno-rating></div><div><p>${creator_name}, `+timeDifference(Date.now(), anno.created)+`:</p></div><div>`;
if(anno.annotype === "Dishes"){
$("#annotation-info-title").html(`${anno.body.name}`);
let icon = ``;
if(anno.body.type === "meal"){
  icon += `<i class="material-icons">restaurant</i> `;
}else if(anno.body.type === "drink"){
 icon += `<i class="material-icons">local_drink</i> `;
}else if(anno.body.type === "other"){
  icon += `<i class="material-icons">device_unknown</i> `;
}
$("#annotation-info-title").prepend(icon);
let category = anno.body.categoryName;
if(category === "none" || category === undefined){
  category = "in keiner Kategorie";
}
html += `<div class="mdc-chip mdc-chip--selected">
  <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">category</i>
  <div class="mdc-chip__text">${category}</div>
</div>`;
html += `<p>Preis: ${anno.body.price} ${anno.body.price_currency}</p>
<p>Anzahl: ${anno.body.amount}</p><p>Beschreibung: ${anno.body.description}</p><p></div>`; //TODO: Link zur Kategorie
html += `<div><img id="anno-iiif-preview" alt="Kein Bild"></div>`
$("#annotation-info-content").html(html);

}else if(anno.annotype === "OpeningHours"){
  $("#annotation-info-title").html(`Öffnungszeiten`);
  $("#annotation-info-title").prepend(`<i class="material-icons-outlined">access_time</i> `);
  html += `<div><p> ${anno.body.value}</p></div>`;
  html += `<div><img id="anno-iiif-preview" alt="Kein Bild"></div>`
  $("#annotation-info-content").html(html);

}else if(anno.annotype === "Category"){
    $("#annotation-info-title").html(anno.body.name);
    $("#annotation-info-title").prepend(`<i class="material-icons-outlined">category</i> `);
    let category = anno.body.upperCategoryName;
    if(category === "none" || category === undefined){
      category = "in keiner Kategorie";
    }
      html+= `<div class="mdc-chip mdc-chip--selected">
          <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">category</i>
          <div class="mdc-chip__text">${category}</div>
        </div>`;
    html += `<div><img id="anno-iiif-preview" alt="Kein Bild"></div>`
    $("#annotation-info-content").html(html);

}else if(anno.annotype === "Other"){
  $("#annotation-info-title").html(``);
  $("#annotation-info-title").prepend(`<i class="material-icons-outlined">device_unknown</i> `);
  html += `<p><i class="material-icons-outlined"></i> ${anno.body.comment}</p></div>`;
  html += `<div><img id="anno-iiif-preview" alt="Kein Bild"></div>`
  $("#annotation-info-content").html(html);

}else if(anno.annotype === "Image"){
    $("#annotation-info-title").html(`Bild`);
    let icon = ``;
    if(anno.body.type === "photo"){
      icon += `<i class="material-icons">camera_roll</i> `;
    }else if(anno.body.type === "draw"){
      icon += `<i class="material-icons">border_color</i> `;
    }else if(anno.body.type === "ornament"){
      icon += `<i class="material-icons">polymer</i> `;
    }else if(anno.body.type === "other"){
      icon += `<i class="material-icons">device_unknown</i> `;
    }
    $("#annotation-info-title").prepend(icon);
    let desc = anno.body.comment
    if(anno.body.comment === "" || anno.body.comment === undefined || anno.body.comment === null){
      desc = "(ohne Beschreibung)"
    }
    html += `<p> ${desc}</p></div>`;
    html += `<div><img id="anno-iiif-preview" alt="Kein Bild"></div>`
    $("#annotation-info-content").html(html);

}else if(anno.annotype === "Ads"){
  $("#annotation-info-title").html(`Werbeanzeige`);
  let desc = anno.body.comment
  if(anno.body.comment === "" || anno.body.comment === undefined || anno.body.comment === null){
    desc = "(ohne Beschreibung)"
  }
  $("#annotation-info-title").prepend(`<i class="material-icons-outlined">format_paint</i> `);
  html += `<p>Beworbene Marke/Geschäft: ${anno.body.brand}</p><p> ${desc}</p></div>`;
  html += `<div><img id="anno-iiif-preview" alt="Kein Bild"></div>`
  $("#annotation-info-content").html(html);

}else if (anno.annotype === "Geo"){
//not implemented, own dialog on map

}
//add iiif-image

getIIIfPreviewSnippetUrl(anno._id, anno.target).then(function(result){
  let link = config.iiifserver + result;
  $("#anno-iiif-preview").attr("src", link);
}).catch(function(err){
  console.log(err);
})

drawThumb($("[anno-rating]"));

};

function redrawMapPubDialog(latlng, infos){
  var addressinfo = infos.body;
  console.log(latlng);
  DBpubs.get(infos.target.pubid).then( function(doc){
      //var list = newPubListElement(doc.rows);
      console.log(doc);
      //$("#pubs-list").html('');
      //$(" #pubs-list").append(list);

      $("#map-info-title").html(`${doc.name}`);

      $("#map-info-content").html(`<div>
        <p>${infos.creator.name} meldete `+timeDifference(Date.now(), infos.created )+`:</p>
        <p>${addressinfo.street} ${addressinfo.number}, ${addressinfo.zip} ${addressinfo.city}</p>
        <p>${addressinfo.comment}</p></div>`);

      });

    }

function redrawAboutYou(){
    //redrawn once
    /*
    DBhist_persons.get(user_state.identity).then(function(doc){
      $("#card-about-you").find('.mdc-typography--headline6').html(`${doc.name}`);
      $("#card-about-you").find('.mdc-typography--subtitle2').html(`${doc.job}`);
    });
    */
};

function redrawUserInfo(){
    DBhist_persons.get(user_state.identity).then(function(doc){
      $("[user-name]").html(`${doc.name}`);
      $("[user-status]").html(`${doc.job[0]}`);
      $("#card-about-you").find(`[user-status]`).append(` (${doc.birthdate} - ${doc.deathdate})`);
      user_state.name = doc.name; // set display name
    });

};

function identity_check(){
  //init for intro card
  DBuser.allDocs({
      include_docs: true,
      attachments:true,
      binary: true
    }).then(function (result) {
      var docs = result.rows.map(function (row) {
        return row.doc;
      });
      console.log(docs);
          if(docs.length != 0){
            	user_state.account_created = true,
            	user_state.identity = docs[0].identity;
            	user_state.timestamp = docs[0].id;
              user_state.help = docs[0].help;

              console.log("Identity Data found: " + user_state.identity + " -> Skipping.")
              DBhist_persons.get(user_state.identity).then(function(result){
              console.log(result);
              user_state.name = result.name;
              var text = 'Willkommen zurück: ' + result.name ;
              showTextOnSnackbar(text , 4500, "OK");
              var path = user_state.timestamp+'_'+user_state.identity+'.jpeg';
              //redrawUserImage(docs[0]._attachments[0].data);
              console.log(path);
              $("#card-about-you > div > div > img[user-image]").attr('src', 'assets/'+result.file).attr('width', '50%').attr('height','auto%');
                redrawUserInfo();

              return DBuser.getAttachment(docs[0]._id, path);
            }).then(function(blob){
              redrawUserImage(blob);

            }).catch(function(err){
              console.log(err);
            })
              return true;
          }else{
            console.log("No Identity Data found");
            return true;
          }

    }).catch(function (err) {
      console.log(err);
    });
    return false;
}



function redrawYourDishes(){
//Go through Dishes and Ratings and view all from this user
//selector as below
var list = $("#list-anno-you");
list.html('');
drawPersonAnnotationList(list);
//TODO: add Ratings to list!
/*
DBrating.find({
  selector: {'playerid' : user_state.timestamp},
}, function (err, result) {
  console.log(result);
  if (err) { return console.log(err); }
  $("#list-dishes-you").html('');
  for(var doc in result.docs){
    console.log(doc)
    var list = newYourDishesElement(result.docs[doc]);
    console.log(list)
    $("#list-dishes-you").prepend(list);
  }
  // handle result
}).then(function(ee){
return DBdishes.find({
  selector: {'playerid' : user_state.timestamp},
}, function (err, result) {
  console.log(result);
  if (err) { return console.log(err); }
  for(var doc in result.docs){
    console.log(doc)
    var list = newYourDishesElement(result.docs[doc]);
    console.log(list)
    $("#list-dishes-you").prepend(list);
  }

}).then(function(ff){
  function sort_li(a, b){
      return ($(b).data('timestamp')) < ($(a).data('timestamp')) ? 1 : -1;
  }

   $("#list-dishes-you > li").sort(sort_li) // sort elements
                     .appendTo('#list-dishes-you'); // append again to the list
   // sort function callback

})

}).catch(function(err){
  console.log(err);
});
*/
}

function newYourDishesElement(data){
  //DEPRECATED
  //TODO: seperate between dishes, annotations, lokations
  /*
  console.log(data);
  return `<li class="mdc-list-item" tabindex="0" data-timestamp="${data.timestamp}">
    <span class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">${data.name} ${data.price}</span>
      <span class="mdc-list-item__secondary-text">${data.comment} : ` + timeDifference(data.timestamp, Date.now()) + `</span>
    </span>
  </li>`;
  */
}

function newCategoryList(elem){
//read all Categories from this menu (not menupage)
//DBcategory
console.log(app_state.menu);
DBcategory.find({
  selector: {'target.menu' : app_state.menu},
}, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log(result);
  var html_text = '<option value="none" selected>ohne Kategorie</option>';
  $.each(result.docs, function (index, value) {
    if(!(value == undefined)){
      console.log(value);
      html_text += `<option value="${value._id}">${value.body.name}</option>`;
    }
  });
  console.log(html_text);
  elem.html('').append(html_text);

});
}

function timeDifference(current, previous) {
//print out time-difference between now and previous time
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < 0) return 'in der Zukunft';
    if (elapsed < msPerMinute) return 'vor ' + Math.round(elapsed/1000) + ' Sekunden';
    else if (elapsed < msPerHour) return 'vor ' + Math.round(elapsed/msPerMinute) + ' Minuten';
    else if (elapsed < msPerDay ) return 'vor ' + Math.round(elapsed/msPerHour ) + ' Stunden';
    else if (elapsed < msPerMonth) return 'vor ' + Math.round(elapsed/msPerDay) + ' Tagen';
    else if (elapsed < msPerYear) return 'vor ' + Math.round(elapsed/msPerMonth) + ' Monaten';
    else return 'vor ' + Math.round(elapsed/msPerYear ) + ' Jahren';

}

function visualizeRating(rating){
//visualize Rating, return Stars
console.log(rating);
var counter_printed = 0;
var text_html = '';
var it = 0;
for(; it < rating; it++ ){
  text_html += '<i class="material-icons">star</i>';
  counter_printed++;

}
if((rating - it) >= 0.49){
  text_html += '<i class="material-icons">star_half</i>';
  counter_printed++;
}
for(; counter_printed < 5; counter_printed++){
  text_html += '<i class="material-icons">star_border</i>';

}
return text_html;
}


//get PubsData
function getPubsStatistic(pubsid){
//get infos about all menupages, numbers, ratings and status, and geolocation infos
//returned in object
//DFS Search
return new Promise(function(resolve, reject){
var obj = { menu : 0,
menupage : 0};
/*DBmenu.find({
  selector: {pub : pubsid},
}, function (err, result) {
  $.each(result.docs, function (index, value) {
  obj.menu += 1;
  obj.menupage += value.menupages.length;
  });
*/
  resolve(obj);

// });

});

}

function getGeoStatistic(pubsid){
  var obj = { geo : 0};
  return new Promise(function(resolve, reject){

  DBgeo.find({
    selector: {'target.pubid' : pubsid},
  }, function (err, result) {
    obj.geo = result.docs.length;
    resolve(obj);
  });
})
  }

  function getPubsRatingStatistic(pubid){
    //including rating from pub
    return new Promise(function(resolve, reject){
      var obj = {
        rating : 0,
        rating_count : 0
      }
    DBrating.find({
      selector: {'target.pubid' : pubid},
    }, function (err, result) {
      $.each(result.docs, function (index, value) {
        if(value.body.rating != undefined && value.body.rating != null){
          obj.rating += value.body.rating
          obj.rating_count += 1;
        }
      });
      resolve(obj);

    });

  })
}

  function addToAnnotationList(data,target){
    //data -> type,
    //target element -> jquery elem
    //draw Annotation listed with a menupage

    //Switch Cases -> Logo, Description Value
    //Filter: Coords available
    //Filter: Timestamp
    //Filter: Your Coordinates creator.id
    var data2 = JSON.stringify(data.body);
    var icon = "", display_value = "", display_value2 = "";
    var by_user_created = "", user_created_logo = ""
    var timestamp = JSON.stringify(data.created);
    var coord = "", coord_logo = "";
    if(data.target.coord && data.target.coord.value == ""){
      coord = "coord-missing";
      coord_logo = '<i class="material-icons" title="Nicht auf der Karte">location_disabled</i>';
    };
    if(data.creator.id === user_state.timestamp){
      by_user_created = "user-created";
      user_created_logo = '<i class="material-icons" title="Von dir verzeichnet">person_pin</i>';
    }

    if(data.annotype === "Other"){
      icon = 'announcement';
      display_value = data.body.comment;
}else if(data.annotype === "Dishes"){
  icon = 'note_add';
  if(data.body.type === "drink"){
  icon = 'restaurant';
}else if(data.body.type === "meal"){
  icon = 'local_drink';
}else if(data.body.type === "other"){
  icon = 'device_unknown';
    }
  display_value = data.body.name;
  display_value2 = data.body.price + " " + data.body.price_currency;
}else if(data.annotype === "OpeningHours"){
  icon = 'access_alarm';
  display_value = data.body.value;
}else if(data.annotype === "Category"){
  icon = 'category';
  display_value = data.body.name;
}else if(data.annotype === "Ads"){
  icon = 'format_paint';
  display_value = data.body.brand;
  display_value2 = data.body.comment;
}else if(data.annotype === "Image"){
  icon = 'image';
  display_value = data.body.name;
}else if(data.annotype === "Geo"){
  icon = 'location_city';
  display_value = data.body.street + " " + data.body.number + " ( " + data.body.street_old + data.body.number_old +")";
  if(data.body.latlng.length > 1){
    coord_logo = '<i class="material-icons" title="Geolokalisiert">location_on</i>';
    coord = "";
  }
}else if(data.annotype === "Rating" && data.body.comment != "" && data.body.thumb == null){
  icon = 'comment';
  display_value = data.body.comment;
  display_value2 = visualizeRating(data.body.rating);
}

    html = `<li class="mdc-list-item mdc-ripple-upgraded" tabindex="0" data-id="${data._id}" data-type="${data.annotype}" data-timestamp="${data.created}" ${by_user_created} ${coord}>
      <span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">${icon}</span>
      <span class="mdc-list-item__text"><span class="mdc-list-item__primary-text">${display_value}</span>
      <span class="mdc-list-item__secondary-text">${display_value2}</span></span>
      <span class="mdc-list-item__meta" aria-hidden="true">${coord_logo} ${user_created_logo}</span>
    </li>`;

    //annotation-list
    target.append(html);
  }
  function drawPersonAnnotationList(list){
    //find all Annotations by this user
    //include Geo and Rating (special mode needed to access these)
    DBdishes.find({
      selector: {'creator.id' : user_state.timestamp},
    }).then(function(result){
      $.each(result.docs, function (index, value) {
        if(value.language != "query") addToAnnotationList(value, list);
      });

      return DBopeninghours.find({selector : {'creator.id' : user_state.timestamp}});
    }).then(function(result){
        $.each(result.docs, function (index, value) {
          if(value.language != "query") addToAnnotationList(value, list);
        });
      return DBanno_other.find({selector : {'creator.id' : user_state.timestamp}});
    }).then(function(result){
        $.each(result.docs, function (index, value) {

          if(value.language != "query") addToAnnotationList(value, list);
        });
      return DBads.find({selector : {'creator.id' : user_state.timestamp}});
    }).then(function(result){
        $.each(result.docs, function (index, value) {
            if(value.language != "query") addToAnnotationList(value, list);
        });
      return DBcategory.find({selector : {'creator.id' : user_state.timestamp}});
    }).then(function(result){
        $.each(result.docs, function (index, value) {
            if(value.language != "query") addToAnnotationList(value, list);
        });
      return DBimage.find({selector : {'creator.id' : user_state.timestamp}});
    }).then(function(result){
        $.each(result.docs, function (index, value) {
            if(value.language != "query") addToAnnotationList(value, list);
        });
      return DBgeo.find({selector : {'creator.id' : user_state.timestamp}});
    }).then(function(result){
        $.each(result.docs, function (index, value) {
            if(value.language != "query") addToAnnotationList(value, list);
        });
      return DBrating.find({selector : {'creator.id' : user_state.timestamp, 'target.anno_typ' : 'Dish'}});
      }).then(function(result){
          $.each(result.docs, function (index, value) {
                if(value.target.anno_typ === "Dish" && value.body.thumb === null){
                console.log(value);
                addToAnnotationList(value, list);
                }
                //if AnnotationList is emptyImageUrl


          });
          console.log(list);

          if($.trim($(list).html()) === ''){
            var list_other = `<li class="mdc-ripple-upgraded" tabindex="0">
            Noch hast du kein Gasthaus besucht. Stöber durch das Verzeichnis oder Entdecke neues auf der Karte
            und probiere ein paar Gerichte.
            </li>`;
            console.log("Keine Annotationen gefunden!")
            list.append(list_other);
          }

    }).catch(function(err){
console.log(err);
    });

    $("#pubs-menu-list").html('');

  }

function getSingleTeaserInfo(elem){
  elem.html('');

//returns one or two of available Infos, Image or Comment
DBmenu_info.find({
  selector: {'target.pubid' : app_state.pubid},
}).then(function(result){
  console.log(result);
  var random = result.docs[ result.docs.length * Math.random() << 0];
  value = result.docs[random];
  var html = "<div>"
  if(value.type === "photo"){
    html += `<p><img src="assets/${value.filename}" alt="Kein Bild vorhanden"></p>`;
  }else if (value.type === "comment" ){
    html += `<p>$(value.comment)</p>`;
  }else if(value.type === "skuril"){
    html += `<p>$(value.comment)</p>`;
  }else if(value.type === "rating"){
    html += `<p>$(value.comment)</p>`;
  }

  html += "</div>"
  elem.html(html);
}).catch(function(err){
console.log(err);
});

}

function getAllTeaserInfo(elem){
  //get all Teaser-Infos -> Use Slider-Module for images
elem.html('');
var html = '';
  DBmenu_info.find({
    selector: {'target.pubid' : app_state.pubid},
  }).then(function(result){
    console.log(result);
    $.each(result.docs, function (index, value) {

    var html2 = "<div>"
    if(value.type === "photo"){
      html2 += `<p><img src="assets/${value.filename}" alt="Kein Bild vorhanden"></p>`;
    }else if (value.type === "comment" ){
      html2 += `<p>$(value.comment)</p>`;
    }else if(value.type === "skuril"){
      html2 += `<p>$(value.comment)</p>`;
    }else if(value.type === "rating"){
      html2 += `<p>$(value.comment)</p>`;
    }
    html2 += "</div>"
    html.append(html2);
  });
}).catch(function(err){
  console.log(err);
})

elem.html(html);
}

function getIIIfPreviewSnippetUrl(id, target){

  return new Promise(function(resolve, reject){
//get File from Menupage
//access iiif-server and generate URL for the Snippet
//TODO: faster querys with mango possible?
DBmenu.query((doc, emit) => {
          for (let element of doc.menupages) {
            if (element.id === target.menupage) {
              emit(element);
            }
          }
        }).then((result) => {
          for (let row of result.rows) {
            value = row.key;
            //Koordinaten bestimmen
            var coord = target.selector.value.split("=");
            console.log(value.filepath.replace(/\//g, "%2F") + "/" +coord[1] +"/!200,200/0/default.jpg")
            resolve(value.filepath.replace(/\//g, "%2F") + "/" +coord[1] + "/!200,200/0/default.jpg")

          }
        })
});
}
