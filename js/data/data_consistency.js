//##############################################################################
//###########  <<  game_state.js >> ############################################
//##############################################################################
//checks the game state
//loads the DATA from JSON into DB
//generate datastructure from JSON

//gameState_check
//gameState_accountExists
//gameState_dataload
//gameState_createDataStructure

//function dataStructure_check(){
//checks the game state at beginning
//pouchDB is initiated by DB.js on load

//check pouchDB-size: if length of episodes-table = 0, then load all gameData new
  /*DBtour.info().then(function(response) {
    if(response.doc_count == 0){
      console.log("no entries in database: create Datastructure");

      DBtour.bulkDocs(data_tour).then(function (result) {
      return DBspot.bulkDocs(data_spot);
      }).then(function (result) {
      return DBhelp.bulkDocs(data_help);
      }).then(function (result) {
      //TODO: extend
      console.log("Game data written to PouchDB");
      dataStructure_create();
        $("#intro-dialog-start").html("ready");
          $("#intro-dialog-start").removeAttr("disabled");
      }).catch(function (err) {
        console.log(err);
      });

    }else{

    console.log(response);
      console.log(response.doc_count + " entries in DBtour :: expected >0; Data should also exist in other Databases")

      if(helpList["entry"] == undefined){
        console.log("undefined Game Information; no DataStructure should exist")
        console.log(helpList["entry"]);
        dataStructure_create();
        $("#intro-dialog-start").html("ready");
          $("#intro-dialog-start").removeAttr("disabled");
      }else{
        //this should be not the case?
        console.log("GameInformation exists");
        $("#intro-dialog-start").html("ready");
          $("#intro-dialog-start").removeAttr("disabled");
        }
    }
  }).catch(function (err){
        console.log(err);
      });
  };

function dataStructure_loadData(){
//loads the data from objects generated in a List; Demo-Data
//adds JSON-Data into pouchDB, using ajax load

DBtour.bulkDocs(data_tour).then(function (result) {
return DBspot.bulkDocs(data_spot);
}).then(function (result) {
return DBlocation.bulkDocs(data_location);
}).then(function (result) {
//TODO: extend
console.log("Game data written to PouchDB");
dataStructure_create();
}).catch(function (err) {
  console.log(err);
});

}

function dataStructure_create(){
  //Create objects and dependencies from PouchDB
  //create game-variables from DBspiderapp

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