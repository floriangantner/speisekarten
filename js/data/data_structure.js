//############0##################################################################
//#################  <<  data_structure.js >> ############################################
//##############################################################################
//Information about Entities etc...
//For Creation and Querys
//_id and _rev are alo added from pouchDB

Pub ->

{ "filename":"Armbrustschützenzelt",
"name":"Armbrustschützenzelt",
"category":"",
"date":"",
"number":"",
"format":"DIR",
"filesize":"26,848 MB",
"_id":"p1",
"id":"p1" }

{ "filename":"Armbrustschützenzelt", //path to folder
"name":"Armbrustschützenzelt",
"category":"", //not uses
"date":"", //not uses
"number":"", //not used
"format":"DIR", //folder size
"filesize":"26,848 MB", //size of folder
"_id":"p1",
"id":"p1" }

Menu & Menupage ->

{
	"filename":"Armbrustschützenzelt_Speisenkarte_1975",
	"name":"Armbrustschützenzelt",
	"category":"",
	"typ":"Speisenkarte",
	"date":"28.05.1905",
	"number":"",
	"format":"DIR",
	"filesize":"9,782 MB",
	"pub":"p1",
	"_id":"p1/m1",
	"id":"p1/m1",
	"folderpath":"Armbrustschützenzelt/Armbrustschützenzelt_Speisenkarte_1975/",
	"menupages":[
		{"filename":"Armbrustschützenzelt_Speisenkarte_1975_01.jpg",
		"name":"Armbrustschützenzelt",
		"category":"",
		"typ":"Speisenkarte",
		"date":"28.05.1905",
		"number":"1",
		"format":"JPG",
		"filesize":"9,782 MB",
		"_id":"p1/m1/mp1",
		"id":"p1/m1/mp1",
		"filepath":"Armbrustschützenzelt/Armbrustschützenzelt_Speisenkarte_1975/Armbrustschützenzelt_Speisenkarte_1975_01.jpg"}
	]
}


Player ->
{
	"_id" : JSON.stringify(timestamp),
	"id" : JSON.stringify(timestamp),
	"identity" : identity_id,
	timestamp
}


Identity ->
{
"id" : "1",
"_id" : "1",
"name" : "Max",
"firstname" : "Mustermann",
"job" : "Restaurantkenner",
"file" : "http://www.digiporta.net/ires/DMA/s0/DMA_PT_00001_02_GF.jpg"
}

Geo ->
{ "id" : "",
"_id" : "",
	"city" : "",
"menupage" : "p1/m2/mp3",
"street" : "",
"country" : "",
"latlng" : [48.4 , 23.4],
"pubid" : "",
"playerid" : "",
"country" : ""
}

Anno-Other ->
{
"value" : $("#dialog-announcement-name > input").val(),
"menupage" : app_state.menupage,
"pubid" : app_state.pubid,
"playerid" : user_state.timestamp
}

Rating ->
{
"time" : Date.now(),
"rating" : "5",
"comment" : "Freitext",,
"dishes" : "a21",
"pubid" : "p1",
"playerid" : "person1",
"historic_person" : {
	"name" : "Tester Testeintrag",
	"id" : "h1",
}
}

Dishes ->
{ "name" : "",
"menupage" : "p1/mp3",
"price" : "5€",
"pubid" : "p1",
"playerid" : "per1",
"time" : Date.now(),
"coord" : [[-10,10],[-20,20]],
"latlng" : [[-10,10],[-30,30]]
}

OpeningHours ->
{
	"menupage" : "p1/m1/mp1",
	"pubid" : "",
	"value" : "",
	"playerid" : ""
}
Category -> {

}


function Annotation(){
	//upper class for annotations
this.id = id,
this.time = time,
this.person = person,
this.confidence = confidence,
this.menucard = menucard;
}

function Category(){
this.id = id,
this.name = name,
this.menupage = menupage,
this.dishes = [];
};

function Address(){
Annotation.call(this),
this.street = street,
this.city = city,
this.zip = zip,
this.geox = geox,
this.geoy = geoy,
this.comment = comment,
this.menucard = menucard;
}

function OpeningHours(){
Annotation.call(this),
this.value = value;
};

function Otherthing(){
Annotation.call(this),
this.value = value,
this.comment = comment;
}

function Dishes(){
Annotation.call(this),
	this.name = name,
	this.price = price,
	this.price_currency = price_currency,
	this.price_comment = price_comment,
	this.comment = comment,
	this.category = category;
	this.menupage = menupage;
};

function Rating(){
	this.id = id,
	this.dishes = dishes,
	this.pub = pub,
	this.rating = rating,
	this.name = name,
	this.person = person,
	this.time = time;
};

//Upper Class for Player and HistoricPerson
function Person(){
	this.id = id,
	this.gender = gender,
	this.name = name,
	this.firstname = firstname;
};

function Player(){
	Person.call(this),
this.timestart = timestart,
this.historicperson = historicperson,
this.imagecropped_x = imagecropped_x,
this.imagecropped_y = imagecropped_y,
this.imagecropped_w = imagecropped_w,
this.imagecropped_y = imagecropped_y,
this.imagecropped = imagecroppen;
};

function HistoricPerson(){
Person.call(this),
this.biography = biography,
this.birthdate = birthdate,
this.birthplace = birthplace,
this.gndnumber = gndnumber,
this.affiliation = affiliation,
this.deathplace = deathplace,
this.deathdate = deathdate,
this.file = file;

};

//##############################################################################
