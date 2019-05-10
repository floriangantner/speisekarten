//snackbar.js
//contains definition and functions of the snackbar
//const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));

function showTextOnSnackbarButton(message, time, actionText, action){
  //TODO: define actionhandler for different type of tasks
snackbar.timeoutMs = time;
snackbar.labelText = message;
console.log(actionText);
snackbar.actionButtonText = actionText;
snackbar.open();
$("#snackbar").attr("action", action);
}

//showTextOnSnackbar("Hallo", 2750, "OK");

function showTextOnSnackbar(message, time){
  //TODO: define actionhandler for different type of tasks

  snackbar.timeoutMs = time;
  snackbar.labelText = message;
  snackbar.actionButtonText = '';
  snackbar.open();
  $("#snackbar").attr("action", "");
}
