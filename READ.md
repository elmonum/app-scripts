# LIST
| file / directory name     | summary    |
| :------------- | :------------- |
|get_html_meta.js | webページからhtmlのmetaタグの情報を取得し、シートに記録する。 |
| get_overworktime.js | 各稼働表シートにボタンを設置する。ボタンをクリックすると自分の残業時間を取得し、全体シートにそれを記録する。 |

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

**カラムの文字からそのコード数値を取得**  
~~~~
function execute(){
  var result = letterToColumn("HA")
  Logger.log(result)
}

function letterToColumn(letter){
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}
~~~~
