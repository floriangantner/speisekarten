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

function newPubListElement(data){
  //generated Code for Entry.
 var card_html = '';
$.each(data, function (index, value) {
  card_html += `<li class="mdc-list-item" data-id="${value.id}">${value.doc.name}</li>`;
});
console.log(data.length + " Pubs written to PubsList");
return card_html;
}

//return List of all Pubs
function redrawPubList(){
var List = [];
DBpubs.allDocs({
    include_docs: true
  },function(err, doc){
    var list = newPubListElement(doc.rows);
    $("#pubs-list").html('');
    $(" #pubs-list").append(list);
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
}

function redrawPubsAdressList(){
  DBgeo.allDocs({
      include_docs: true
    },function(err, doc){
      $("#pubs-adress-list").html('');
      $.each(doc.rows, function (index, value) {
        console.log(value);
        console.log(app_state.pubs);
        if(value.doc.target === app_state.pubs){
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
console.log("Hallo" + pubid);

DBmenu.find({
  selector: {pub : pubid},
}, function (err, result) {
  console.log(result);
$("#pubs-menu-list").html('');
  $.each(result.docs, function (index, value) {
  var list = newMenuListElement(value);
  $(" #pubs-menu-list").append(list);
  });
});
}

function newMenuListElement(data){
      //generated Code for Entry.
      //using images
     var card_html = '';
  console.log(data);
    card_html += `<li class="mdc-list__item"><h3 mdc-typography mdc-typography--headline6>${data.name} (${data.date}) - ${data.typ}</h3><ul class="mdc-image-list mdc-image-list--masonry my-masonry-image-list">`;
    $.each(data.menupages, function (index1, value1) {
      card_html += `<li class="mdc-image-list__item" data-id="${value1.id}">
        <img class="mdc-image-list__image" src="assets/${value1.filepath}">
        <div class="mdc-image-list__supporting">
        </div>
      </li>`;
      //<span class="mdc-image-list__label">${value1.category}</span>

  });
  card_html += `</ul></li>`;
    return card_html;
};

  function redrawDishesAllList(){
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
   card_html += `<li class="mdc-list-item" data-id="${value.doc.id}">${value.doc.body.name}</li>`;
 }
 });
 return card_html;
}

//return List of all Pubs
function redrawDishes(id){
DBdishes.get(id).then( function(doc){
    newDishesCard(doc)
    //var list = newPubListElement(doc.rows);
    console.log(doc);
    //$("#pubs-list").html('');
    //$(" #pubs-list").append(list);
    });
};

function newDishesCard(data){
//generated Code for Entry.
$("#card-dishes-detail > .mdc-card > .demo-card__primary > h2  ").text(`${data.name}`);
DBrating.find({
  selector: {dishes : data.id},
}, function (err, result) {
  console.log(result);
  if (err) { return console.log(err); }
  $("#dishes-rating-list").html('');
  for(var doc in result.docs){
    console.log(doc)
    var list = newDishesRatingElement(result.docs[doc]);
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
<span class="mdc-list-item__primary-text">${data.comment} ${data.rating}</span>
<span class="mdc-list-item__secondary-text">${data.historic_person.name} : ` + convertTimestamp(data.time) + `</span>
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

      $("#card-menu-detail > div > .mdc-card__primary-action > .demo-card__primary > h2 ").html(`${data.name} - ${data.date} - ${data.typ} - ID: ${data.category}`);
      $("#card-menu-detail > div > .mdc-card__primary-action > .mdc-card__media ").attr('style', `background-image: url(assets/${data.filename})`);
      app_state.menupage = data.id;
     //TODO: change some menu card
}

function redrawPubsDishesList(pubid){
  DBdishes.find({
    selector: {'target.pubid' : pubid},
  }, function (err, result) {
    if (err) { return console.log(err); }
    var list = newPubsDishesListElement(result);
    console.log(list)
    $("#pubs-dishes-list").html('');
    $("#pubs-dishes-list").append(list);
    // handle result
  });
}

function newPubsDishesListElement(data){
  var card_html = '';
 $.each(data.docs, function (index, value) {
   console.log(value)
   card_html +=`<li class="mdc-list-item" tabindex="0" data-id="${value._id}">
     <span class="mdc-list-item__text">
       <span class="mdc-list-item__primary-text">${value.body.name}</span>
       <span class="mdc-list-item__secondary-text">${value.body.price}</span>
     </span>`
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
  return DBuser.putAttachment(timestamp, imagename, result._rev, img2DB, 'image/jpeg' );
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
    registerPlayer(coord, blob);

}

  });
  };
  }
  //$("#person-selector").show();

function redrawAnnotationInfoDialog(anno){
  //get Data from klicked Annotation
  //distinguish different AnnotationTypes -> TODO: first only for dishes
  DBdishes.get(anno.id).then( function(doc){
      //var list = newPubListElement(doc.rows);
      console.log(doc);
$("#annotation-info-title").html(JSON.stringify(doc));
      //$("#pubs-list").html('');
      //$(" #pubs-list").append(list);}

});
}

function redrawMapPubDialog(latlng, infos){
  console.log("Hallo Karte2!");
  console.log(addressinfo);
  var addressinfo = infos.body;
  console.log(latlng);
  DBpubs.get(infos.target).then( function(doc){
      //var list = newPubListElement(doc.rows);
      console.log(doc);
      //$("#pubs-list").html('');
      //$(" #pubs-list").append(list);

      $("#map-info-title").html(`${doc.name}`);

      $("#map-info-content").html(`<div><p>${infos.creator.name} meldet:</p>
        <p>${addressinfo.street} ${addressinfo.number}, ${addressinfo.zip} ${addressinfo.city}</p>
        <p>Alte Adresse:${addressinfo.street_old} ${addressinfo.number_old}, ${addressinfo.zip_old} ${addressinfo.city_old} </p>
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

function convertTimestamp(givenTimestamp){
var time_now = Date.now();
var newDate = new Date();
newDate.setTime(givenTimestamp);
dateString = newDate.toUTCString();
return dateString;
}

function redrawYourDishes(){
//Go through Dishes and Ratings and view all from this user
//selector as below
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
}

function newYourDishesElement(data){
  //TODO: seperate between dishes, annotations, lokations
  console.log(data);
  return `<li class="mdc-list-item" tabindex="0" data-timestamp="${data.timestamp}">
    <span class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">${data.name} ${data.price}</span>
      <span class="mdc-list-item__secondary-text">${data.comment} : ` + convertTimestamp(data.timestamp) + ` : ` + convertTimestamp(data.time) + `</span>
    </span>
  </li>`;
}
