//############0##################################################################
//#################  <<  data_confif.js >> #####################################
//##############################################################################
//common configuration settings
const config = [
this.path_folder_images = "", //path to images, relative from index.html file
this.url = "" //path to index.html
];

//contains global variables
//contains constructor for the classes/objects and their attributes/functions

const user_state = [
	this.account_created = false,
	this.identity = "",
	this.timestamp = 0,
	this.name = ""
];
//contains infos about the view. Information and id's for the view.
//Should avoid useless jquery-querys and easier access to render new pages
const app_state = [
this.pubs = "",
this.menu = "",
this.menupage = "",
this.anno_id = "",
this.anno_typ = "",
this.player = "",
this.histperson = "",
this.intro = 0,
this.help = [], //add help-intros here to check, if help dialog has been shown
];
