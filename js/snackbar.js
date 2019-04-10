//snackbar.js
//contains definition and functions of the snackbar
const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));

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
snackbar.show(dataObj);
}

//showTextOnSnackbar("Hallo", 2750, "OK");

function showTextOnSnackbar(message, time){
  //TODO: define actionhandler for different type of tasks
  const dataObj = {
    message: message,
    timeout: time,
  };
snackbar.show(dataObj);
}




/*
import {MDCSnackbar} from '@material/snackbar';

var snackbar = {};
var snackBarElement = document.querySelector('.app__snackbar');
var snackbarMsg = null;

//To show notification
snackbar.show = (msg, options=4000) => {
  if (!msg) return;

  if (snackbarMsg) {
  	snackbarMsg.remove();
  }

  snackbarMsg = document.createElement('div');
  snackbarMsg.className = 'app__snackbar-msg';
  snackbarMsg.textContent = msg;
  snackBarElement.appendChild(snackbarMsg);

  //Show toast for 3secs and hide it
  setTimeout(() => {
    snackbarMsg.remove();
  }, options);
};

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
