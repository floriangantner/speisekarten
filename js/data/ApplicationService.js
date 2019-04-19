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
  console.log(value)
  card_html += `<li class="mdc-list-item" data-id="${value.id}">${value.doc.name}</li>`;
});
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
      //var list = newPubListElement(doc.rows);
      console.log(doc);
      //$("#pubs-list").html('');
      //$(" #pubs-list").append(list);

      });
};

function newPubCard(data){
  //generated Code for Entry.
  app_state.pubs = data.id
  $("#card-pubs-detail > .mdc-card > .demo-card__primary > h2  ").text(`${data.name}`);
}

function redrawMenuList(pubid){
var List = [];
//TODO: refine query

DBmenu.allDocs({
    include_docs: true
  },function(err, doc){
    var list = newMenuListElement(doc.rows);
    console.log(list);
    $("#pubs-menu-list").html('');
    $(" #pubs-menu-list").append(list);
});

function newMenuListElement(data){
      //generated Code for Entry.
      //using images
     var card_html = '';
$.each(data, function (index, value) {
  console.log(value);
    card_html += `<li>${value.doc.name} (${value.doc.date})</li>`;
    $.each(value.doc.menupages, function (index1, value1) {
      card_html += `<li class="mdc-image-list__item" data-id="${value1.id}">
        <img class="mdc-image-list__image" src="assets/${value1.file}">
        <div class="mdc-image-list__supporting">
          <span class="mdc-image-list__label">${value1.desc}</span>
        </div>
      </li>`;

    });
  });
    return card_html;
}


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
   console.log(value)
   card_html += `<li class="mdc-list-item" data-id="${value.id}">${value.doc.name}</li>`;
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
            newMenuCard(row);
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

      $("#card-menu-detail > div > .mdc-card__primary-action > .demo-card__primary > h2 ").html(`${data.key.desc}`);
      $("#card-menu-detail > div > .mdc-card__primary-action > .mdc-card__media ").attr('style', `background-image: url(assets/${data.key.file})`);
      app_state.menupage = data.key.id;
     //TODO: hange son menu card
}

function redrawPubsDishesList(pubid){
  DBdishes.find({
    selector: {pubid : pubid},
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
       <span class="mdc-list-item__primary-text">${value.name}</span>
       <span class="mdc-list-item__secondary-text">${value.price}</span>
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

function registerPlayer(){
console.log("Player with Identity registred");
var identity_id = app_state.histperson;
//add selected player to db
var timestamp = Date.now();
var player = {"_id" : JSON.stringify(timestamp),
"id" : JSON.stringify(timestamp),
"identity" : identity_id,
timestamp }
DBadd(player, DBuser);
user_state.setAccount = true;
user_state.identity = identity_id;
user_state.timestamp = timestamp;
//getIdentityInfos(identity_id);
//redraw
redrawUserInfo();

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
  if(!data[0]){
    $("#person-selector > div > h2").html("Keine Person gefunden. Versuch es nochmal.");
    $("#person-selector > * > img").attr('src',``);
    app_state.histperson = ``;
  }else{

    if(!data[0].file.startsWith("http")){
      data[0].file = "assets/" + data[0].file;
    }
    $("#person-selector > div > h2").html("");
  $("#person-selector > * > img").attr('src',`${data[0].file}`);

  app_state.histperson = data[0]._id;
  }
  //$("#person-selector").show();
}

function redrawMapPubDialog(addressinfo, latlng){
  DBpubs.get(addressinfo.pubid).then( function(doc){
      //var list = newPubListElement(doc.rows);
      console.log(doc);
      //$("#pubs-list").html('');
      //$(" #pubs-list").append(list);
      $("#map-showpubinfo-popup").find('.mdc-dialog__title').html(`${doc.name}`);
      });
      $("#map-showpubinfo-popup").find('.mdc-dialog__content').html(`<p>${addressinfo.street}</p><p>${addressinfo.zip} ${addressinfo.city}</p>`);
}

function redrawAboutYou(){
  console.log(user_state.identity);
    DBhist_persons.get(user_state.identity).then(function(doc){
      $("#card-about-you").find('.mdc-typography--headline6').html(`${doc.firstname} ${doc.name}`);
      $("#card-about-you").find('.mdc-typography--subtitle2').html(`${doc.job}`);
    });

};

function redrawUserInfo(){
    DBhist_persons.get(user_state.identity).then(function(doc){
      $("[user-name]").html(`${doc.firstname} ${doc.name}`);
      $("[user-status]").html(`${doc.job}`);
    });

};

function identity_check(){
  //init for intro card
  DBuser.allDocs({
      include_docs: true
    }).then(function (result) {
      var docs = result.rows.map(function (row) {
        return row.doc;
      });
      console.log(docs);
          if(docs.length != 0){
            	user_state.account_created = true,
            	user_state.identity = docs[0].identity;
            	user_state.timestamp = docs[0].timestamp;
              console.log("Identity Data found " + user_state.identity + ". Skipping.")
              showTextOnSnackbar("Wir haben deine Identität gefunden!", 4500, "OK");

              redrawUserInfo();
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
