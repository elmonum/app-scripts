TEIJI = 8
LOG_SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('write')
//一半期のシート時の設定
KADO_START_1_ROW = 3
KADO_START_1_COL = 3
KADO_SHEET_1_NAME = 'kado1'
//四半期のシート時の設定
KADO_START_4_ROW = 3
KADO_START_4_COL = 3
KADO_SHEET_4_NAME = 'agenda'
//記録シートの設定
LOG_SHEET_START_ROW = 2 //IDの記入がある最初のセルの列位置
LOG_SHEET_START_COL = 2 //IDの記入があるセルの行位置
LOG_COL_POSITION = 3 //記入する最初のセルの行位置
NUMER_PPL = 5 //人数

//記録できるか確認
function testRecord(){
  LogTime('xxxxxxxxx', 21, 7) 
}

//メイン処理、全員の記録
function LogCdAll(){
    id_list = LOG_SHEET.getRange(LOG_SHEET_START_ROW, LOG_SHEET_START_COL, NUMER_PPL, 1).getValues()
    row_number = LOG_SHEET_START_ROW
    for (var i = 0; i < id_list.length; i++) {
        LogTime(id_list[i], row_number, LOG_COL_POSITION)
        row_number++
    }
}

//個人の記録
function LogTime(sheet_id, row_number, col_number) {
    var kado_name = KADO_SHEET_4_NAME
    var kado_row = KADO_START_4_ROW
    var kado_col = KADO_START_4_COL
    //稼働シートから稼働時間を取得
    data = getKadoData(sheet_id, kado_name, kado_row, kado_col)
    //残業時間を取得
    time_list = calcOverwork(data[0])
    //シートに記録
    result = LOG_SHEET.getRange(row_number, col_number, 1, time_list.length).setValues([time_list])
    //Logger.log(result)
}

function getKadoData(sheet_id, sheet_name, row_number, col_number) {
    var mySheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);
    return mySheet.getRange(row_number, col_number, 1, mySheet.getLastColumn() - 1).getValues()
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