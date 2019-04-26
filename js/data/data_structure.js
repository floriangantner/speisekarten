//############0##################################################################
//#################  <<  data_structure.js >> ############################################
//##############################################################################
//Information about Entities etc...
//For Creation and Querys
//_id and _rev are also added from pouchDB, if not fixed

//May not represent the actual state (see code/Constructors/DBadd methods)


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
	"coord" : {"prozent" :
	{"x" : "0.555", "y" : "0.4", "w" : "0.444", "h" : "0.786" },
	"selection" : { x1 : 133 ,y1,x2,y2,w,h}, //selected area of viewed image
	"displayedValue" : {clientWidth : selectImg[0].clientWidth, //values of viewed and original image
			clientHeight : selectImg[0].clientHeight,
			naturalHeight : selectImg[0].naturalHeight,
			naturalWidth : selectImg[0].naturalWidth,
			width : selectImg[0].width,
			height : selectImg[0].height
			},
}//coordinates of selected crop in several ways, may be redundant
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

{
"name":"Abbe, Ernst",
"job":
["Astronom","Physiker","Physiker","Astronom","Astronomie/Astrophysik","Physik","Optik","http://d-nb.info/gnd/118646419","http://de.wikipedia.org/wiki/Ernst_Abbe","https://www.deutsche-digitale-bibliothek.de/entity/118646419","http://www.deutsche-biographie.de/pnd118646419.html?anchor=index","http://www.herder-institut.de/gnd/118646419","http://cgi-host.uni-marburg.de/~omgesa/gs/xs1.php?f1=pnd&s1=118646419","Deutschland"],
"birthdate":"1840-01-23",
"deathdate":"1905-01-14",
"fileid":"PT_00001_02_GF",
"_id":"PT_00001_02_GF",
"id":"PT_00001_02_GF",
"file":"PT_00001_02_GF.jpg",
"xmlfile" : "http://www.digiporta.net/opendata/dm/xml/PT_00001_02_GF.xml",
"filejpeg_small":"http://www.digiporta.net/ires/DMA/s1/DMA_PT_00001_02_GF.jpg"
},

Annotations:
//using some modified and extended https://www.w3.org/TR/annotation-model/
//f.e. no geo information is conidered in protocol
//Schema not existing yet, multiple contexts have to be devlared

Geo ->
{
"@context" : "http://www.w3.org/ns/anno.jsonld",
"id" : "",
"_id" : "",
"type" : "Annotation",
"annotype" : "Geo",
"body" : {
	"latlng" : [48.4 , 23.4],
	"country" : "",
	"city" : "",
	"zip" : "",
	"street" : "",
	"number" : "",
	"street_old" : "",
	"zip_old" : "",
	"city_old" : "",
	"number_old" : "",
	"comment" : ""
},
"target" : "p1",
"creator" : {
	"id" : "",
	"name" : "",
	"identity" : ""
},
"generator" : {
	"name" : "tripadviswurst"
},
"created" : "timestamp",
"motivation" : "assessing"
}

Anno-Other ->
{
"@context" : "http://www.w3.org/ns/anno.jsonld",
"id" : "",
"_id" : "",
"type" : "Annotation",
"annotype" : "Other",
"body" : {
	"comment" : "",
	}
},
"target" : {
	"pubid":"p1",
	"menupage": "",
	"selector": {
		"type": "FragmentSelector",
		"conformsTo": "http://www.w3.org/TR/media-frags/",
		"value": "xywh=0,0,30,60"
		},
		"coord" : {
			"type": "AnnoSelector",
			"conformsTo": "",
			"value": "lat1lng1lat2lng2=0,0,30,60"
		}
},
"creator" : {
	"id" : "",
	"name" : "",
	"identity" : ""
},
"generator" : {
	"name" : "tripadviswurst"
},
"created" : "timestamp",
"motivation" : "commenting"
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
	"@context" : "http://www.w3.org/ns/anno.jsonld",
	"type" : "Annotation",
	"annotype" : "OpeningHour",
	"body" : {
		"value" : "Mo-Fr 10-18",
	},
	"target" : {
		"pubid": "",
	  "menu" : "",
		"menupage": "",
		"selector": {
			"type": "FragmentSelector",
			"conformsTo": "http://www.w3.org/TR/media-frags/",
			"value": "xywh=0,0,30,60"
			},
			"coord" : {
				"type": "AnnoSelector",
				"conformsTo": "",
				"value": "lat1lng1lat2lng2=0,0,30,60"
			}
	},
	"creator" : {
		"id" : "",
		"name" : "",
		"identity" : ""
	},
	"generator" : {
		"name" : "tripadviswurst"
	},
	"created" : "",
	"motivation" : "commenting"
	}
}
Category -> {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"id" : "",
"_id" : "",
"type" : "Annotation",
"annotype" : "Category",
"body" : {
	"name" : "somewhat",
	"upperCategoryName" : "",
	"upperCategoryID" : ""
	}
},
"target" : {
	"pubid":"p1",
	"menu" : "p1/m1",
	"menupage": "p1/m1/mp3",
	"selector": {
		"type": "FragmentSelector",
		"conformsTo": "http://www.w3.org/TR/media-frags/",
		"value": "xywh=0,0,30,60"
		},
		"coord" : {
			"type": "AnnoSelector",
			"conformsTo": "",
			"value": "lat1lng1lat2lng2=0,0,30,60"
		}
},
"creator" : {
	"id" : "",
	"name" : "",
	"identity" : ""
},
"generator" : {
	"name" : "tripadviswurst"
},
"created" : "timestamp",
"motivation" : "commenting"
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

Head-Infos -> {

}

function Rating(){
	this.id = id,
	this.dishes = dishes,
	this.pub = pub,
	this.rating = rating,
	this.name = name,
	this.person = person,
	this.time = time;
};


//##############################################################################
