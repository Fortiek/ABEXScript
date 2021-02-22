function onOpen() { //function to run on startup that generates a menu item to automate the task
  
  //Try to get a button on the nav bar to automate the process on a named sheet
  var ui = SpreadsheetApp.getUi();
    
  //make the menu button
  ui.createMenu('Auto Doc').addItem('Populate Doc', '');
}

function sheetGrabber() { //function to call and use the important cells in the spreadsheet

  //get the currently working sheet
  var currentSheet = SpreadsheetApp.getActiveSpreadsheet();

  /*May be best to just write the values into the table that gets called
  /in the opened document...
  /
  //select headers to port to document
  var vanHeader = currentSheet.getRange("L3").getValue();
  var timeHeader = currentSheet.getRange("M3").getValue();
  var driverHeader = currentSheet.getRange("N3").getValue();
  var routerHeader = currentSheet.getRange("O3").getValue();
  */

  //Selects the range from cell A1 through cell F100
  var todaysDrivers = currentSheet.getRange("A1:F100");

  //Testing functions
  Logger.log(todaysDrivers.getValues());
  Logger.log(todaysDrivers.getHeight());
  callPrintSheet();

}

function populateDriverValues(sheetGrabber) {

  /**************************************
   * This is supposed to grab all data
   * from the 'todaysDrivers' range on the
   * current sheet
   * ************************************
   */
  for (i = 0; i < todaysDrivers.getHeight(); i++){
    var vanNum = [i][0];
    var startTime = [i][1];
    var driverName = [i][2];
    var routeNum = [i][3];
  }

  //test for output
  Logger.log(vanNum + " " + startTime + " " + driverName + " " + routeNum);

}

function callPrintSheet(){
  /******************************************************
   * This one should call a pre-defined google doc and
   * recycle it with all the data we need for the day. 
   * This will likely need to call several functions...
   * for starters, see if we can define a couple in-
   * document table cells with a variable name and try to 
   * do a one-for-one with driver data iteratively.
   * ****************************************************
   */
  var doc = DocumentApp.openById("1Wio3m8t60u024E_w3K15_5CrISVR8Uv4F6YUI41Gpaw");

  //This is a dummy table, with two string values
  //per cell.
  var test = [
    ['Tester, Cell 1', 'Row 1, Cell 2'],
    ['Test 1, Test1', 'Test 2, Test 2'],
    ['Tester', 'Tested']
  ];

  //Need to ensure the body is cleared every time the function runs
  doc.getBody().clear();

  doc.getBody().insertTable(0, test);

}
