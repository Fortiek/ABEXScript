function onOpen() { //function to run on startup that generates a menu item to automate the task
  
  //Try to get a button on the nav bar to automate the process on a named sheet
  var ui = SpreadsheetApp.getUi();
    
  //make the menu button
  ui.createMenu('Auto Doc').addItem('Populate Doc', 'sheetGrabber').addToUi();
}

function sheetGrabber() { //function to call and use the important cells in the spreadsheet

  //get the currently working sheet
  var currentSheet = SpreadsheetApp.getActiveSpreadsheet();

  /*
  *****************************************************
  Selects from L4 to O53 which SHOULD COVER the range of
  possible cells with values populated by the query 
  in the sheet. (This needs to stay in the same cells
  referenced or it breaks)
  ******************************************************
  */
  var possibleDrivers = currentSheet.getRange("L4:O53");

  //a counter that will pass along how many slips we'll need to print.
  var driverCount = possibleDrivers.getHeight();

  //Testing methods
  Logger.log(possibleDrivers.getValues());
  callPrintSheet(possibleDrivers, driverCount);

}


function callPrintSheet(todaysDrivers, numberOfDrivers){
  const slipTemplate = DocumentApp.openById('1-qZr_1jygyrJWmIADQT61DMHzCzEOfMXqjfp-xrYc2U').getBody().getChild(1);
  const printSlip = DocumentApp.openById('1Wio3m8t60u024E_w3K15_5CrISVR8Uv4F6YUI41Gpaw');
  
  //clear the body from previous runs
  printSlip.getBody().clear();

  let rows = todaysDrivers.getValues();

  rows.forEach(function(row, index){
    if (row[2] == "") return;
    if (row[3] == "") return;

    printSlip.getBody().appendTable(slipTemplate.copy());

    //set values
    printSlip.replaceText('{{Route Num}}', row[3]);
    printSlip.replaceText('{{Driver Name}}', row[2]);
    printSlip.replaceText('{{Van Num}}', row[0].substring(0, 3));
    if(row[1] != undefined){
      printSlip.replaceText('{{Start Time}}', (row[1].getHours().toString() + ":" + row[1].getMinutes().toString()));
    }
    else{
      printSlip.replaceText('{{Start Time}}', "12:15");
    }
  });
}
