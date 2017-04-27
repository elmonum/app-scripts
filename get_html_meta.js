//HTMLからメタデータ取得
var MYSHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('log')
function logMetaData() {
  //対象URL取得
  var rows = MYSHEET.getLastRow()
  var url_list = MYSHEET.getRange(1, 1, rows).getValues()
  //データ取得
  meta_list = []
  for (var i = 0; i < url_list.length; i++) {
    var response = UrlFetchApp.fetch(url_list[i])
    //var titleRegexp = /<title>([\s\S]*?)<\/title>/i;
    var keywordRegexp = /<meta name="keywords" content="([\s\S]*?)">/i
    var descRegexp = /<meta name="description" content="([\s\S]*?)" >/i
    var keyword = keywordRegexp.exec(response.getContentText("SHIFT-JIS"))
    var description = descRegexp.exec(response.getContentText("SHIFT-JIS"))
    meta_list[i] = [keyword[1], description[1]]
  }
  //ファイルに記録
  //var newData = [[1,2,3,4],[5,6,7,8]]
  //MYSHEET.getRange(始まりRow, 始まりcolum, row数, col数).setValues(newData)
  MYSHEET.getRange(1, 2, rows, 2).setValues(meta_list);
}