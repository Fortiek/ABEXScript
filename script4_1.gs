/**************************************
Does it work?
**************************************/
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
  Selects all data in sheet, need to designate the 
  appropriate columns to grab to print
  ******************************************************
  */
  var todaysDrivers = currentSheet.getDataRange();

  //a counter that will pass along how many slips we'll need to print.
  var driverCount = todaysDrivers.getHeight();

  //variables for necessary data ranges
  const vanNumber = currentSheet.createTextFinder("VAN NUMBER").findNext().getColumn();
  const startTime = currentSheet.createTextFinder("WAVE").findNext().getColumn();
  const driverName = currentSheet.createTextFinder("DRIVER").findNext().getColumn();
  const routeNumber = currentSheet.createTextFinder("ROUTE NUMBER").findNext().getColumn();

  //Testing methods
  //Logger.log(todaysDrivers.getValues());
  Logger.log(vanNumber + " " + startTime + " " + driverName + " " + routeNumber);
  callPrintSheet(todaysDrivers, driverCount, vanNumber, startTime, driverName, routeNumber);
  

}


function callPrintSheet(todaysDrivers, numberOfDrivers, vanNumber, startTime, driverName, routeNumber){
  const slipTemplate = DocumentApp.openById('1-qZr_1jygyrJWmIADQT61DMHzCzEOfMXqjfp-xrYc2U').getBody().getChild(1);
  const printSlip = DocumentApp.openById('1Wio3m8t60u024E_w3K15_5CrISVR8Uv4F6YUI41Gpaw');
  
  //clear the body from previous runs
  printSlip.getBody().clear();

  let rows = todaysDrivers.getValues();

  rows.forEach(function(row, index){
    
      Logger.log(row[startTime - 1] + " " + row[vanNumber - 1] + " " + row[driverName - 1] + " " + row[routeNumber - 1]);

    printSlip.getBody().appendTable(slipTemplate.copy());

    //set values
    if(row[routeNumber - 1] != ""){
      printSlip.replaceText('{{Route Num}}', row[routeNumber - 1]);
    }
    else return;
    if(row[driverName - 1] != ""){
      printSlip.replaceText('{{Driver Name}}', row[driverName - 1]);
    }
    else return;
    if(row[vanNumber - 1] != ""){
      printSlip.replaceText('{{Van Num}}', row[vanNumber - 1].substring(0, 3));
    }
    else return;
    if(row[startTime - 1] != ""){
      printSlip.replaceText('{{Start Time}}', (row[startTime - 1].toString()));
    }
    else{
      printSlip.replaceText('{{Start Time}}', "12:15");
    }
  });
}
