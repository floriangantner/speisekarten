//DB.js
//contains Definition of pouchDB

//DBupd
//DBadd
const DBpubs = new PouchDB('pubs');
const DBmenu = new PouchDB('menu');
const DBhist_persons = new PouchDB('persons_hist');
const DBuser = new PouchDB('user');

const DBdishes = new PouchDB('dishes');
const DBrating = new PouchDB('rating');
const DBopeninghours = new PouchDB('openinghours');
const DBgeo = new PouchDB('geo_adresses');
const DBanno_other = new PouchDB('anno_other');
const DBcategory = new PouchDB('category');
const DBpersons_head = new PouchDB('person_head');
var doc;

//adds a String to a specific DB
//data = String, DB = pouchDB-database

function DBadd(data,DB){
  DB.put(data, function callback(err, result) {
    if (!err) { console.log('Successfully added ' + data.id + ' to ' + DB + ' data:' + data);
  }else{ console.log('error' + err + DB); }
  });
}

function DBaddnew(data,DB){
  DB.post(data, function callback(err, result) {
    if (!err) { console.log('Successfully added data without id to ' + DB + ' data:' + data);
  }else{ console.log('error' + err + DB); }
  });
}


//updates a entry in the pouchDB
function DBupd(data, DB){
//data = String, DB = pouchDB-database
//converts JSON-String to object
data = JSON.parse(data);
console.log(data);

DB.get(data.id, function(err, doc) {
  if (err) { return console.log(err); }
  data._rev = doc._rev;

    DB.put(data, function(err, response) {
      if (err) { return console.log(err); }
      else{
        console.log(data);
        return console.log("successfully updated")}
      // handle response
    });
  });
}
