//not real a json-Format
//data_episodes
//data_friends


//TODO: create one JSON-File for processing in game_State etc...

var data_pubs = [{
  "name" : "Armbrustschützenzelt",
  "id" : "pub1",
  "_id" : "pub1"
}, {
  "name" : "Bogenschützenzelt",
  "id" : "pub2",
  "_id" : "pub2"
},{
  "name" : "Haxnzelt",
  "id" : "pub3",
  "_id" : "pub3 "
}];

var data_menu = [{
"_id" : "101",
"id" : "101",
"name" : "Speißekarte 1",
"date" : "1900",
"pub" : "pub1",
"menupages" : [{
  "_id" : "101a",
  "id" : "101a",
  "file" : "file1.jpeg",
  "category" : "",
  "desc" : "Test-Beschreibung 1 Speisekarte",
},{
    "_id" : "101b",
    "id" : "101b",
    "file" : "file2.jpeg",
    "category" : "",
    "desc" : "Test-Beschreibung 2 Speisekarte",
},{
    "_id" : "101c",
    "id" : "101c",
    "file" : "file3.jpeg",
    "category" : "",
    "desc" : "Test-Beschreibung 3 Speisekarte",
}]
}];

var data_dishes = [{
  "_id" : "1001",
  "id" : "1001",
  "pubid" : "pub1",
  "name" : "Spätzle",
  "menupage" : "101a",
  "price" : "10DM"
},{
    "_id" : "1002",
    "id" : "1002",
    "pubid" : "pub2",
    "name" : "Schnitzel",
    "menupage" : "101b",
    "price" : "5€"
},{
    "_id" : "1003",
    "id" : "1003",
    "pubid" : "pub1",
    "name" : "Steak",
    "menupage" : "101b",
    "price" : "23 Goldtaler"
}];

var data_hist_persons = [{
  "id" : "1",
  "_id" : "1",
"name" : "Max",
"firstname" : "Mustermann",
"job" : "Restaurantkenner",
"file" : "http://www.digiporta.net/ires/DMA/s0/DMA_PT_00001_02_GF.jpg"
},{
  "id" : "2",
  "_id" : "2",
  "name" : "Max",
  "firstname" : "Musterfrau",
  "job" : "Restaurantkennerin",
  "file" : "http://www.digiporta.net/ires/DMA/s0/DMA_PT_00001_03_GF.jpg"
},{
  "id" : "3",
  "_id" : "3",
  "name" : "Albert",
  "firstname" : "Einstein",
  "job" : "Physik-Kenner",
  "file" : "person3.jpeg"
}];

var data_map_points = [{
  "id" : "geo1",
  "street" : "Testpunkt 1",
  "zip" : "86000",
  "city" : "München-Au",
  "country" : "",
  "pubid" : "pub1",
  "latlng" : [48.14286146470259, 11.59856379032135],
},
  {
    "id" : "geo2",
    "street" : "Testpunkt 2",
    "zip" : "86001",
    "city" : "München",
    "country" : "",
    "pubid" : "pub2",
    "latlng" : [48.14376146470259, 11.59756379032135]
  },{
      "id" : "geo3",
      "street" : "Testpunkt 3",
      "zip" : "86002",
      "city" : "Mingaa",
      "country" : "",
      "pubid" : "pub3",
      "latlng" : [48.14386146470259, 11.59846379032135]
    }
];

var data_ratings = [{
  "_id" : "rat1",
  "id" : "rat1",
  "dishes" : "1001",
  "rating" : "1 Stern",
  "pub" : "pub1",
  "historic_person" : {
    "name" : "Peter Pan",
    "id" : ""},
  "time" : "",
  "playerid" : ""
},
{ "_id" : "rat2",
  "id" : "",
  "dishes" : "1001",
  "rating" : "2 Sterne",
  "pub" : "pub1",
  "historic_person" : {
    "name" : "Gustav Gustus",
    "id" : ""},
  "time" : "",
  "playerid" : ""
},
{ "_id" : "rat3",
  "id" : "",
  "dishes" : "",
  "pub" : "pub1",
  "rating" : "Super Lokal!",
  "historic_person" : {
    "name" : "Max Mehlwurm",
    "id" : ""},
  "time" : "",
  "playerid" : ""
}];
