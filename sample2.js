TEIJI = 8
//記録シートの設定
LOG_SHEET = SpreadsheetApp.openById('sheet_id').getSheetByName('write');
LOG_SHEET_START_ROW = 2 //記入する最初のセルのROW（行）位置　ex)2017/01/01のROW番号
LOG_SHEET_MY_COL = 2 //自分の名前がある記入するセルの行位置
LOG_COL_POSITION = 3 //自分の名前があるROW（行）番号

//稼働表のシート設定
//例：四半期
KADO_SHEET_ID = 'AAAAAAAAAAA' //ex)https://docs.google.com/spreadsheets/d/AAAAAAAAAAA/edit#gid=0
KADO_SHEET_NAME = 'agenda' //ex)
KADO_SHEET = SpreadsheetApp.openById(KADO_SHEET_ID).getSheetByName(KADO_SHEET_NAME);
KADO_START_ROW = 3 //稼働時間があるセルのROW（行）位置
KADO_START_COL = 3 //稼働時間がある最初のセルのCOLUMN（列）位置

//自分の残業時間を記録
function myLog(){
  LogTime(KADO_SHEET, LOG_SHEET_START_ROW, LOG_COL_POSITION)
}

//時間を記録処理
function logTime(kado_sheet, row_number, col_number) {
  //稼働シートから稼働時間を取得
  data = kado_sheet.getRange(KADO_START_ROW, KADO_START_COL, 1, kado_sheet.getLastColumn() - 1).getValues()
  //残業時間を計算
  time_list = calcOverwork(data[0])
  //Logger.log(time_list)
  //シートに記録
  LOG_SHEET.getRange(row_number, col_number, 1, time_list.length).setValues([time_list])
}

function calcOverwork(workhour) {
  time_list = []
  for (var i = 0; i < workhour.length; i++) {
    time = ''
    if(workhour[i] != ''){
      time = workhour[i] - TEIJI
    }
    time_list.push(time)
  }
  return time_list
}

//ボタンを作成
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
      .addItem('残業時間を記録', 'myLog')
      .addToUi();
}