//Access to the DB

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
    console.log(list);
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
   $("#card-pubs-detail").attr("data-id", `${data.id}`);
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

//get pubid and pubname
/*var pubid = $("#card-pubs-detail").attr("data-id");
DBpubs.get(pubid).then( function(doc){

    });
*/
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
$("#card-dishes-detail").attr("data-id", `${data.id}`);
$("#card-dishes-detail > .mdc-card > .demo-card__primary > h2  ").text(`${data.name}`);
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
      $("#card-menu-detail").attr("data-id", `${data.key.id}`);
     //TODO: hange son menu card
}

/*
  then(function (result) {
    var docs = result.rows.map(function (row) {
      return row.doc;
    });
    for(i in docs){
      var obj = new Pubs();
      obj = extend(obj, docs[i]);
      List.push(obj)
    }
    return List;
  }).then (function (result){

    $.each(result, function (index, value) {
      console.log(value);
      });
      console.log(card_html);
      return card_html;

  }).catch(function (err) {
    console.log(err);
  });
  */

//returning one Pub given by id
