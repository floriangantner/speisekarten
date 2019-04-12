//##############################################################################
//###########  <<  game_state.js >> ############################################
//##############################################################################
//checks the game state
//loads the DATA from JSON into DB
//generate datastructure from JSON

//Method for loading Application Data into App

//gameState_check
//gameState_accountExists
//gameState_dataload
//gameState_createDataStructure

function dataStructure_check(){
//checks the game state at beginning
//pouchDB is initiated by DB.js on load

//check pouchDB-size: if length of episodes-table = 0, then load all gameData new
  DBpubs.info().then(function(response) {
    if(response.doc_count == 0){
      console.log("no entries in database: create Datastructure");
    }
      }).then(function (result) {
      //TODO: extend
      console.log("Game data written to PouchDB");
      dataStructure_loadData();
      //  $("#intro-dialog-start").html("ready");
      //    $("#intro-dialog-start").removeAttr("disabled");
      }).catch(function (err) {
        console.log(err);
      });
  };

function dataStructure_loadData(){
//loads the data from objects generated in a List; Demo-Data
//adds JSON-Data into pouchDB, using ajax load

DBpubs.bulkDocs(data_pubs).then(function (result) {
console.log("Pubs data written to PouchDB");
}).catch(function (err) {
  console.log(err);
});

DBdishes.bulkDocs(data_dishes).then(function (result) {
console.log("Dishes data written to PouchDB");
}).catch(function (err) {
  console.log(err);
});

DBmenu.bulkDocs(data_menu).then(function (result) {
console.log("Menu data written to PouchDB");
}).catch(function (err) {
  console.log(err);
});
DBhist_persons.bulkDocs(data_hist_persons).then(function (result) {
console.log("Historic Person data written to PouchDB");
}).catch(function (err) {
  console.log(err);
});

progress_loader.progress = 0.7;
//Create Index for searching
DBmenu.createIndex({
  index: {
    fields: ['menupages']
  }
}, function (err, result) {
  if (err) { return console.log(err); }
  console.log(result);
  // handle result
});
DBdishes.createIndex({
  index: {
    fields: ['pubid']
  }
}, function (err, result) {
  if (err) { return console.log(err); }
  console.log(result);
  // handle result
});
progress_loader.progress = 1;
progress.close(); 

}
/*
function dataStructure_create(){
  //Create objects and dependencies from PouchDB

//writes value from src to object
//use extend(obj2, src) instead of $.extend()
//because inheritance/instanceof is not transfered

//Load game Data
DBtour.allDocs({
    include_docs: true
  }).then(function (result) {
    var docs = result.rows.map(function (row) {
      return row.doc;
    });

    for(i in docs){
      var obj = new Tour();
      obj = extend(obj, docs[i]);
      obj.registerInList();
      obj.createPrec();
    }

  }).catch(function (err) {
    console.log(err);
  });


  DBlocation.allDocs({
      include_docs: true
    }).then(function (result) {
      var docs = result.rows.map(function (row) {
        return row.doc;
      });

      for(i in docs){
        var obj = new Location();
        obj = extend(obj, docs[i]);
        obj.registerInList();
      }

    }).catch(function (err) {
      console.log(err);
    });

  DBspot.allDocs({
      include_docs: true
    }).then(function (result) {
      var docs = result.rows.map(function (row) {
        return row.doc;
      });

      for(i in docs){ // should always be 1 entry in this DB

        if(docs[i].typ == "INFO"){
          //obj = $.extend({}, new InfoTask(), obj);
          obj = new INFOSpot();
          obj = extend(obj, docs[i]);
          obj.registerInList();
          obj.createPrec();
          //new InfoTask(obj.id, obj.typ, obj.name, obj.taskcontainer, obj.done, obj.visited, obj.content);
        }else if(docs[i].typ == "GOTO"){
          obj = new GOTOSpot();
          obj = extend(obj, docs[i]);
          obj.registerInList();
          obj.createPrec();
          //new GOTOTask(obj.id, obj.typ, obj.name, obj.taskcontainer, obj.done, obj.visited, obj.content, obj.valid, obj.coord);
          }
        }

    }).catch(function (err) {
      console.log(err);
    });

    DBhelp.allDocs({
        include_docs: true
      }).then(function (result) {
        var docs = result.rows.map(function (row) {
          return row.doc;
        });

        for(i in docs){
          var obj = new HelpModul();
          obj = extend(obj, docs[i]);
          obj.registerInList();
        }

      }).catch(function (err) {
        console.log(err);
      });


console.log("OOJS Data structure generated from data in PouchDB");
return true;
}
*/
