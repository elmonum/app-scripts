**シート指定**  
~~~~
var mySheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name)
var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_name)
~~~~
  
**データの取得**  
~~~~
mySheet.getRange(指定行(start_row), 最初の列(start_col), 行数（number_rows）, 列数(number_cols)).getValues()
~~~~
  
**データの記入**  
~~~~
var test_list = ['a', 'b', 'c']
mySheet.getRange(指定行(start_row), 最初の列(start_col), 行数（number_rows）, 列数(number_cols)).setValues([test_list])
~~~~
  
TODO:
