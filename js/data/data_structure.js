//############0##################################################################
//#################  <<  data_structure.js >> ############################################
//##############################################################################
//contains global variables
//contains constructor for the classes/objects and their attributes/functions

const user_state = [
	this.account_created = false,
	this.identity = "",
	this.timestamp = 0
];
//contains infos about the view. Information and id's for the view.
//Should avoid useless jquery-querys and easier access to render new pages
const app_state = [
this.pubs = "",
this.menu = "",
this.menupage = "",
this.dish = "",
this.rating = "",
this.player = "",
this.histperson = "",
this.intro = 0,
this.help = [], //add help-intros here to check, if help dialog has been shown
];

//##############################################################################
//class Descriptions as follows (order can be distinguished):
//as a schema for the json-file
// --> symbolizes inheritance to following Objects

/*
Pubs
Dishes
Rating
Menu
Person
*/
/*
this.shown = shown,
this.registerInList = function (){
	if(this.id != undefined){
	 helpList[this.id] = this
	 }
 },
*/

function Pubs(id, name, menu){
this.id = id,
this.name = name,
this.menu = [];
};

function Menu(){
this.id = id,
this.name = name,
this.pub = pub,
this.menupages = [];
};

function Menupage(){
this.id = id,
this.file = file,
this.filesize = size,
this.name = name,
this.type = type,
this.date = date,
this.menu = menu,
this.Annotations = [];
};

function Category(){
this.id = id,
this.name = name,
this.menupage = menupage,
this.dishes = [];
};

function Annotation(){
	//upper class for annotations
this.id = id,
this.time = time,
this.person = person,
this.confidence = confidence,
this.menucard = menucard;
}

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
