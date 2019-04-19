//snackbar.js
//contains definition and functions of the snackbar
//const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));



function showTextOnSnackbar(message, time, actionText){
  //TODO: define actionhandler for different type of tasks
  const dataObj = {
    message: message,
    timeout: time,
    actionText: actionText,
    actionHandler: function () {
      console.log('my cool function');
    }
  };
snackbar.timeoutMs = timeour;
snackbar.labelText = message;
snackbar.actionButtonText = actionText;
snackbar.open();
}

//showTextOnSnackbar("Hallo", 2750, "OK");

function showTextOnSnackbar(message, time){
  //TODO: define actionhandler for different type of tasks
  const dataObj = {
    message: message,
    timeout: time,
  };

  snackbar.timeoutMs = time;
  snackbar.labelText = message;
  snackbar.actionButtonText = '';
  snackbar.open();

}

/*
import {MDCSnackbar} from '@material/snackbar';

var snackbar = {};
var snackBarElement = document.querySelector('.app__snackbar');
var snackbarMsg = null;

//To show notification

exports.snackbar = snackbar;


const dataObj = {
  message: messageInput.value,
  actionText: 'Undo',
  actionHandler: function () {
    console.log('my cool function');
  }
};

snackbar.show(dataObj);
*/
