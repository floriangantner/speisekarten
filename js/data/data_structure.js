//############0##################################################################
//#################  <<  data_structure.js >> ############################################
//##############################################################################
//contains global variables
//contains constructor for the classes/objects and their attributes/functions

const tourList = [];
const spotList = [];
const helpList = [];
const locationList = [];

//##############################################################################
//class Descriptions as follows (order can be distinguished):
// --> symbolizes inheritance to following Objects
/*
Tour

Spot -->
GOTOSpot
INFOSpot

Precondition

Location

HelpModul

*/
//##############################################################################
//Tour
function Tour(id, name, begintext, beginimage, endtext, endimage, spots, prec, done, color, logo, active){
	this._id = id,
	this.id = this._id,
  this.name = name,
  this.begintext = begintext,
  this.beginimage = beginimage,
  this.endtext = endtext,
  this.endimage = endtext,
  this.spots = spots,
  this.prec = prec,
  this.done = done,
  this.color = color,
  this.logo = logo,
  this.active = active,
  this.registerInList = function (){
    console.log("test");
    if(this.id != undefined){
     tourList[this.id] = this
     console.log("test123");
     }
   },
   this.createPrec = function(){
     //create precondition elements form the given information
     var obj_dummy, created_obj = [];
     if(this.prec.length != 0){
     for (var ee in this.prec){
       obj_dummy = new Precondition();
       obj_dummy = extend(obj_dummy, this.prec[ee]);
       created_obj[ee] = obj_dummy;
     }
     this.prec = created_obj;
     }

   },
   this.checkPrec = function(){
     var numberPrecFulfilled = 0
     var numberPrec = 0;
       for(var pr in this.prec){
         if(this.prec[pr].checkPrecStatus() == true){
             console.log("prec checked success")
         numberPrecFulfilled++;
         }
         numberPrec++;
       }
       if(numberPrecFulfilled == numberPrec){
         return true;
       }
         return false;
   },
   this.setDone = function(){
       this.done = true;
       DBupd(this.ToString(), DBtour);
   },
   this.setActive = function(){
      this.active = true;
      DBupd(this.ToString(), DBtour);
   },
   this.checkDone = function (){
     //control all spots
     //check Status of TaskContainer
     //check Status of Task
     var spots_done = true;
     //if all are done, set episode to Done
     if(this.spots != undefined){
       for(var spot in this.spots){
         if(spotList[this.spots[spot]] != undefined && spotList[this.spots[spot]].getDone() == false){
           spots_done = false;
         break;
         }
       }

       if(spots_done){
       this.setDone();
       console.log("Tour completed! : " + this.id)
       }
     }
   },
   this.ToString = function(){ //returns a String Representation
     return JSON.stringify(this);
   }
}

//#############################################################################
//Spot
function Spot(id, typ, name, desctext, descimage, content, image, tour, prec, done, icon){
	this._id = id,
  this.id = this._id,
	this.typ = typ,
  this.name = name,
  this.desctext = desctext,
  this.descimage = descimage,
  this.content = content,
  this.image = image,
  this.tour = tour,
  this.prec = prec,
  this.done = done,
	this.icon = icon,
  this.registerInList = function (){
    if(this.id != undefined){
     spotList[this.id] = this
     }
   },
   this.createPrec = function(){
     //create precondition elements form the given information
     var obj_dummy, created_obj = [];
     if(this.prec.length != 0){
     for (var ee in this.prec){
       obj_dummy = new Precondition();
       obj_dummy = extend(obj_dummy, this.prec[ee]);
       created_obj[ee] = obj_dummy;
   }
   this.prec = created_obj;
   }
   },
   this.checkPrec = function(){
     var numberPrecFulfilled = 0
     var numberPrec = 0;
       for(var pr in this.prec){
         if(this.prec[pr].checkPrecStatus() == true){
             console.log("prec checked success")
         numberPrecFulfilled++;
         }
         numberPrec++;
       }
       if(numberPrecFulfilled == numberPrec){
         return true;
       }
         return false;
   },
   this.setDone = function(){
     if(tourList[this.tour] != undefined){
       tourList[this.tour].checkDone();
     }
     this.done = true;
     DBupd(this.ToString(), DBspot);
   },
   this.setActive = function(){
     this.active = true;
     DBupd(this.ToString(), DBspot);
   }
}

//#############################################################################
//GOTOSpot
function GOTOSpot(id, typ, name, desctext, descimage, content, image, tour, prec, done, coord, icon, modus, modus_desc){
  Spot.call(this, id, typ, name, desctext, descimage, content, image, tour, prec, done, icon),
  this.coord = coord,
	this.modus = modus,
	this.modus_desc = modus_desc,
  this.ToString = function(){ //returns a String Representation
    return JSON.stringify(this);
  }
}

//#############################################################################
//INFOSpot
function INFOSpot(id, typ, name, desctext, descimage, content, image, tour, prec, done, icon){
  Spot.call(this, id, typ, name, desctext, descimage, content, image, tour, prec, done, icon),
  this.ToString = function(){ //returns a String Representation
    return JSON.stringify(this);
  }
}

//Precondition
function Precondition(){
  //different Types of Preconditions exist, before a task/episode/taskC can be Done
  //taskdone, taskcdone, episodedone, accesstime
  //parameter are saved and used in every other way
  this.typ = typ,
  this.ref = ref,
  this.par1 = par1,
  this.par2 = par2,
  this.par3 = par3,

  this.checkPrecStatus = function(){
  //check Done-Status
    if(this.typ == "spotdone"){
      if(TaskList[this.ref] != undefined && TaskList[this.ref].getDone() == true){
      return true;
      }
    }else if(this.typ == "taskcdone"){
      if(TCAllList[this.ref].getDone() == true){
      return true;
      }
    }else if(this.typ == "access_start_hours"){
    //hours after start of the game, the * can be done/activated [lower bound]
    // par1: amount of hours after start
    var starttime = game.startingtime;
    var seconds = this.par1*3600000;
    var now = new Date();
    now = now.getTime(); //actual Date
    if((starttime + seconds) > now ){
      //is not yet accessible
      return false;
    }else{
      //is accessible
      return true;
    }

    }else if(this.typ == "access_stop_hours"){
    //hours after start of the game, the * can latest be done [higher bound]
    //par 1: amount of hours
    //TODO
    var starttime = game.startingtime;
    var seconds = this.par1*3600000;
    var now = Date().getTime(); //actual Date

    if((starttime + seconds) < now ){
      //is not yet accessible
      return false;
    }else{
      //is accessible
      return true;
    }
    }else if(this.typ == "access_day_time"){
    //daytime the task can be done, e.g. 0 to 23
    //par 1: lower bound
    //par 2: upper bound
    //TODO
    var now = Date().getHours(); //read Hours
    if( this.par1 <= low < this.par2 ){
      return true;
    }else{
      return false;
    }

    }else{
    console.log("undefined typ of Precondition to check");
  }
  return false; //TODO: testing
  }
  this.ToString = function(){ //returns a String Representation
    return JSON.stringify(this);
  }
}

//#############################################################################
//Location
function Location(id, coord, timestamp, accuracy){
  this._id = id,
  this.id = this._id,
  this.coord = coord,
  this.timestamp = timestamp,
  this.accuracy = accuracy,
  this.registerInList = function (){
    if(this.id != undefined){
     locationList[this.id] = this
     }
   },
   this.ToString = function(){ //returns a String Representation
     return JSON.stringify(this);
   }
}

//#############################################################################
//HelpModul
function HelpModul(id, message, title, image, shown){
	this._id = id,
	this.id = this._id,
	this.message = message,
	this.title = title,
	this.image = image,
	this.shown = shown,
	this.registerInList = function (){
    if(this.id != undefined){
     helpList[this.id] = this
     }
   },
   this.ToString = function(){ //returns a String Representation
     return JSON.stringify(this);
   },
	 this.setShown = function(){
		 this.shown = true;
		 DBupd(this.ToString(), DBhelp);
	 }
}
