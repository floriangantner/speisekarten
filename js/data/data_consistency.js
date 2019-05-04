//##############################################################################
//###########  <<  game_state.js >> ############################################
//##############################################################################
//checks the game state
//loads the DATA from JSON into DB
//generate datastructure from JSON

//Method for loading Application Data into App

//gameState_check
//gameState_dataload
//gameState_createDataStructure


function dataStructure_loadData(){
//loads the data from objects generated in a List; Demo-Data
//adds JSON-Data into pouchDB, using ajax load

DBpubs.bulkDocs(data_pubs).then(function (result) {
  return DBdishes.bulkDocs(data_dishes);
}).then(function(result) {
  return DBmenu.bulkDocs(data_menu);
}).then(function(result){
  return DBhist_persons.bulkDocs(data_hist_persons);
}).then(function(result){
  return DBgeo.bulkDocs(data_map_points);
}).then(function(result){
//Create Indexes for Searching
  return DBmenu.createIndex({
    index: {
      fields: ['menupages']
    }});
}).then(function(result){
  return DBdishes.createIndex({
    index: {
      fields: ['pubid', 'playerid']
    }});
  }).then(function(result){
    return DBrating.createIndex({
      index: {
        fields: ['pubid', 'dishes', 'playerid', 'target.anno_id']
      }});
  }).then(function(result){
    console.log("Datastructure filled from sample data")
    return true;
  }).catch(function (err) {
  console.log("Error occured:");
  console.log(err);
});



}


function dataStructure_check(){

//checks the game state at beginning
//pouchDB is initiated by DB.js on load
//check pouchDB-size: if length of pubs-table = //usually after first visit or after deleting cache, then load all gameData new
//user user-db here
  DBpubs.info().then(function(response) {
    if(response.doc_count == 0){
      console.log("No pubs entries in database found: create Datastructure");
      return true;
    }else{
      return false;
    }
      }).then(function (result) {
      //TODO: extend
      if(result === true){
        console.log("Loading Data");
        dataStructure_loadData();
      }else{
        console.log("Data have been already loaded to DB. Not Loading agains")
        //creating indexes for search
        DBmenu.createIndex({
          index: {
            fields: ['menupages', 'pub']
          }}).then(function(result2){
        return DBdishes.createIndex({
          index: {
            fields: ['pubid']
          }}).then(function(result2){
          return DBrating.createIndex({
            index: {
              fields: ['pubid', 'dishes', 'target.anno_id']
            }}).then(function(result2){

            }).catch(function (err) {
              console.log(err);
            });
            })
});
}
})
}
