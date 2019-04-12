//not real a json-Format
//data_episodes
//data_friends


//TODO: create one JSON-File for processing in game_State etc...

var data_pubs = [{
  "_id" : "1",
  "id" : "1",
  "name" : "Gasthaus from json1"
}, {
  "_id" : "2",
  "id" : "2",
  "name" : "Gasthaus from json2"
}];

var data_menu = [{
"_id" : "101",
"id" : "101",
"name" : "Speißekarte 1",
"date" : "1900",
"pub" : "1",
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
  "pubid" : "1",
  "name" : "Spätzle",
  "menupage" : "101a",
  "price" : "10DM"
},{
    "_id" : "1002",
    "id" : "1002",
    "name" : "Schnitzel",
    "menupage" : "101b",
    "price" : "5€"
},{
    "_id" : "1003",
    "id" : "1003",
    "name" : "Steak",
    "menupage" : "101b",
    "price" : "23 Goldtaler"
}];

var data_hist_persons = [{
  "id" : "1",
"name" : "Max",
"firstname" : "Mustermann",
"job" : "Restaurantkenner",
"file" : "person1.jpeg"
},{
  "id" : "2",
  "name" : "Max",
  "firstname" : "Musterfrau",
  "job" : "Restaurantkennerin",
  "file" : "person2.jpeg"
},{
  "id" : "3",
  "name" : "Albert",
  "firstname" : "Einstein",
  "job" : "Physik-Kenner",
  "file" : "person3.jpeg"
}];



/*
var data_tour = [{
  "_id" : "1",
  "id" : "1",
  "name" : "Tour 1",
  "begintext" : "Tour 1 goes to these Places ....",
  "beginimage" : null,
  "endtext" : "Tour 1 done",
  "endimage" : null,
  "spots" : "",
  "prec" : [],
  "done" : false,
  "color" : "orange",
  "logo" : null,
  "active" : false
},{
  "_id" : "2",
  "id" : "2",
  "name" : "Tour 2",
  "begintext" : "Tour 2 goes to these Places ....",
  "beginimage" : null,
  "endtext" : "Tour 2 done",
  "endimage" : null,
  "spots" : "",
  "prec" : [],
  "done" : false,
  "color" : "red",
  "logo" : null,
  "active" : false
}];

var data_spot = [{
    "id" : "1.1",
    "_id" : "1.1",
    "typ" : "INFO",
    "name" : "Visit Bahnhof",
    "desctext" : "description Tourspot 1",
    "descimage" : null,
    "content" : "Bahnhof Description Full Text",
    "image" : null,
    "tour" : 1,
    "prec" : [],
    "done" : false,
    "icon" : null,
},{
  "id" : "1.2",
  "_id" : "1.2",
"typ" : "GOTO",
"name" : "Visit Gießübel",
"desctext" : "description Tourspot 2",
"descimage" : null,
"content" : "Gießübel Full Text",
"image" : null,
"coord" : [10.615169405937195,
          47.66196600148934],
"modus" : "input",
"modus_desc" : "123",
"tour" : 1,
"prec" : [],
"done" : false,
"icon" : null,
},{
  "id" : "2.1",
  "_id" : "2.1",
"typ" : "GOTO",
"name" : "Visit Lobach",
"desctext" : "description Tourspot 2.1",
"descimage" : null,
"content" : "Lobach Full Text",
"image" : null,
"coord" : [10.623629093170166,
          47.66706362996035],
"modus" : "input",
"modus_desc" : "Lobach",
"tour" : 2,
"prec" : [],
"done" : false,
"icon" : null,
},{
  "id" : "2.2",
  "_id" : "2.2",
"typ" : "GOTO",
"name" : "Visit Jodquelle",
"desctext" : "description Tourspot 2.2",
"descimage" : null,
"content" : "Jodquelle Full Text",
"image" : null,
"coord" : [10.643069744110107,
          47.65756885192011],
"modus" : "input",
"modus_desc" : "Salz",
"tour" : 2,
"prec" : [],
"done" : false,
"icon" : null,
},{
    "id" : "2.3",
    "_id" : "2.3",
    "typ" : "INFO",
    "name" : "Visit Sulzberg",
    "desctext" : "description Tourspot 2.3",
    "descimage" : null,
    "content" : "Sulzberg Full Text",
    "image" : null,
    "tour" : 2,
    "prec" : [],
    "done" : false,
    "icon" : null,
}];

var data_location= [];

var data_help = [{
    "_id" : "entry",
    "id" : "entry",
    "message" : "Willkommen im Spiel. Ich bin ein Hilfe-Popup",
    "title" : "Welcome",
    "image" : null,
    "shown" : false,
  },{
      "_id" : "map",
      "id" : "map",
      "message" : "Willkommen auf der Karte. Hier siehst du .....",
      "title" : "Karte",
      "image" : null,
      "shown" : false,
    },{
        "_id" : "dash",
        "id" : "dash",
        "message" : "Willkommen auf dem Dashboard. Hier siehst du neue Orte, wo du hingehen kannst.",
        "title" : "Dashboard",
        "image" : null,
        "shown" : false,
      },{
          "_id" : "gps",
          "id" : "gps",
          "message" : "Nutze das GPS deines Gerätes, um dich zu lokalisieren.",
          "title" : "Dashboard",
          "image" : null,
          "shown" : false,
        }
];
//TO-DELETE
/*
var data_game = [{
  "_id" : "1",
"id" : "1",
"startingtime" : date_now.getTime(), //in milliseconds
"endtime" : date_now.getTime() + 7200000,
"language" : "english",
"loaded_data_version" : "0.03",
"response" : "Game has ended. Please visit the final event from the agency to compare your results with other agents.",
"responseimage" : null

}];
*/
