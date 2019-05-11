//DB.js
//contains Definition of pouchDB

//DBupd
//Remote Databases:
var DBremote_dishes = new PouchDB(config.couchDB+'dishes');
var DBremote_rating = new PouchDB(config.couchDB+'ratingdishes');
var DBremote_geo = new PouchDB(config.couchDB+'geo');
var DBremote_opening = new PouchDB(config.couchDB+'opening');
var DBremote_other = new PouchDB(config.couchDB+'other');
var DBremove_category = new PouchDB(config.couchDB+'category');
var DBremote_ads = new PouchDB(config.couchDB+'ads');
var DBremote_image = new PouchDB(config.couchDB+'image');
var DBremote_heads = new PouchDB(config.couchDB+'heads');
var DBremote_player = new PouchDB(config.couchDB+'player');

//DBadd
//Local Databases:

const DBpubs = new PouchDB('pubs');
const DBmenu = new PouchDB('menu');
const DBhist_persons = new PouchDB('persons_hist');
const DBuser = new PouchDB('user');
const DBplayer = new PouchDB('player');

const DBmenu_info = new PouchDB('menu_info'); //contains image/teaser material
const DBmenu_status = new PouchDB('menu_status'); //contains menupaged finishes status
const DBdishes = new PouchDB('dishes');
const DBrating = new PouchDB('rating');
const DBopeninghours = new PouchDB('openinghours');
const DBgeo = new PouchDB('geo_adresses');
const DBanno_other = new PouchDB('anno_other');
const DBcategory = new PouchDB('category');
const DBpersons_head = new PouchDB('person_head');
const DBads = new PouchDB('ads');
const DBimage = new PouchDB('image');

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
