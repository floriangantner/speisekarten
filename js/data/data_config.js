//############0##################################################################
//#################  <<  data_confif.js >> #####################################
//##############################################################################
//common configuration settings
const config = {
'iiifserver' : "http://localhost:8182/iiif/2/", //path to iiifserver, e.g. http://localhost:8182/iiif/2/
'couchDB' : "http://localhost:5984/", //path to couchDB instance
'path_folder_images' : "", //path to images, relative from index.html file
'url' : "" //path to index.html
};

//contains global variables
//contains constructor for the classes/objects and their attributes/functions

const user_state = {
	'account_created' : false,
	'identity' : "",
	'timestamp' : 0,
	'name' : "",
	'help' : []
};
//contains infos about the view. Information and id's for the view.
//Should avoid useless jquery-querys and easier access to render new pages
const app_state = {
'pubs' : "",
'menu' : "",
'menupage' : "",
'anno_id' : "",
'anno_typ' : "",
'player' : "",
'histperson' : "",
'intro' : 0,
'help' : [], //add help-intros here to check, if help dialog has been shown,
'sw' : null
};
