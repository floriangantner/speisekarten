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

Menu-Infos -> {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"id" : "",
"_id" : "",
"type" : "Annotation",
"annotype" : "Menufinished",
"body" : {
	"status" : "true",
	"comment" : ""
},
"target" : {"pubid":"p1",
"menu" : "p1/m1",
"menupage" : "p1/m1/mp1"},
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
"name": thisentry.name,
"vorname" : thisentry.Vorname,
"job":  [thisentry.job],
"gnd" : thisentry.gnd,
"motto" : thisentry.Motto,
"gender" : thisentry.gender,
"birthdate": thisentry.gebDay + "." + thisentry.gebMonth + "." + thisentry.gebYear,
"birthday" : thisentry.gebDay,
"birthmonth" : thisentry.gebMonth,
"birthyear" : thisentry.gebYear,
"deathdate": thisentry.deathDay + "." + thisentry.deathMonth + "." + thisentry.deathYear,
"deathday" : thisentry.deathDay,
"deathmonth" : thisentry.deathMonth,
"deathyear" : thisentry.deathYear,
"fileid" : thisentry.imageID,
"personid" : personid,
"personid_count" : "person" + personid,
"_id": thisentry.imageID,
"id": thisentry.imageID,
"file": thisentry.imageID + ".jpg",
"xmlfile" : "http://www.digiporta.net/opendata/dm/xml/"+thisentry.imageID+".xml",
};
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
"target" : {"pubid":"p1",
"menu" : "p1/m1"},
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

var data = {
"@context" : "http://www.w3.org/ns/anno.jsonld",
"type" : "Annotation",
"annotype" : "Dishes",
"body" : {
  "type" : "meal|drink|other",
  "name" : "",
  "price" : "",
  "price_currency" : "",
  "amount" : "",
	"description" : "",
  "categoryName" : "",
  "categoryID" : ""
},
"target" : {
	"pubid": "p1",
  "menu" : "p1/m1",
	"menupage": "p1/m1/mp1",
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
};

OpeningHours ->
{
	"@context" : "http://www.w3.org/ns/anno.jsonld",
	"type" : "Annotation",
	"annotype" : "OpeningHours",
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
	"upperCategory" : "",
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


Head-Infos -> {
	{
		"@context" : "http://www.w3.org/ns/anno.jsonld",
		"type" : "Annotation",
		"annotype" : "PersonHead",
		"body" : {
			"selector": {
	      "type": "FragmentSelector",
	      "conformsTo": "Prozent des Bildes",
	      "value": "xywh=0.455,0.5444,0.200,0.300"";
	      },
	      "coord" : {
	        "type": "Displayed and NaturalWidth/Height Values",
	        "conformsTo": "px",
	        "value": {"prozent" :
					{"x" : "0.555", "y" : "0.4", "w" : "0.444", "h" : "0.786" },
					"selection" : { x1 : 133 ,y1,x2,y2,w,h}, //selected area of viewed image
					"displayedValue" : {clientWidth : selectImg[0].clientWidth, //values of viewed and original image
							clientHeight : selectImg[0].clientHeight,
							naturalHeight : selectImg[0].naturalHeight,
							naturalWidth : selectImg[0].naturalWidth,
							width : selectImg[0].width,
							height : selectImg[0].height
							},
	      }
		},
		"target" : {
			"personID" : "",,
			"file" : "http://www.digiporta.net/opendata/dm/img/*.jpg",
			"filexml" : ".xml",
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


Rating ->

{
"@context" : "http://www.w3.org/ns/anno.jsonld",
"id" : "",
"_id" : "",
"type" : "Annotation",
"annotype" : "Rating",
"body" : {
	"rating" : "somewhat",
	"comment" : "",
	"skuril" : true/false/undefined,
	"thumb" : true/false/undefined
	}
},
"target" : {
	"pubid":"p1",
	"menu" : "p1/m1",
	"menupage": "p1/m1/mp3",
	"anno_id" : "",
	"anno_typ" : "DishThumb | Dish | Geo | OpeningHours | Category | Other | DishRating "
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


Ads ->
{
"@context" : "http://www.w3.org/ns/anno.jsonld",
"id" : "",
"_id" : "",
"type" : "Annotation",
"annotype" : "Ads",
"body" : {
	"brand" : "Spaten bier",
	"comment" : "Wird hier beworben: Text der Anzeige:",
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

Image ->
{
"@context" : "http://www.w3.org/ns/anno.jsonld",
"id" : "",
"_id" : "",
"type" : "Annotation",
"annotype" : "Image",
"body" : {
	"type" : "photo | draw | ornament | other",
	"name" : "",
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
//
Menu TeaserInfo ->
	{
	"@context" : "http://www.w3.org/ns/anno.jsonld",
	"id" : "",
	"_id" : "",
	"type" : "Info",
	"annotype" : "TeaserInfo",
	"body" : {
		"type" : "photo | comment | rating | skuril",
		"filename" : "",
		"comment" : "",
		"rating" : "",
		"heading" : "",
		"cite" : "",
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

Guestbook ->

Menu TeaserInfo ->
	{
	"@context" : "http://www.w3.org/ns/anno.jsonld",
	"id" : "",
	"_id" : "",
	"type" : "Info",
	"annotype" : "Guestbook",
	"body" : {
		"type" : " comment",
		"comment" : "",
	},
	"target" : {
		"pubid":"p1",
		"menu" : "",
		"menupage": "",
		"selector": null
			"coord" : null
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

//##############################################################################
