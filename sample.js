TEIJI = 8
LOG_SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('write')
KADOU_START_ROW = 3
KADOU_START_COL = 3
CD_CUSTOM_ROW = 7
//四半期時
CD_CUSTOM_COL = 3
SHEET_NAME = "agenda"
LOG_SHEET_START_ROW = 2
LOG_SHEET_START_COL = 2
CD_PPL = 5

//メイン処理、全員の記録
function LogCdAll(){
id_list = LOG_SHEET.getRange(LOG_SHEET_START_ROW, LOG_SHEET_START_COL, CD_PPL, 1).getValues()
row_number = LOG_SHEET_START_ROW
for (var i = 0; i < id_list.length; i++) {
LogTime(id_list[i], row_number)
row_number++
}
}

//個人の記録
function LogTime(sheet_id, row_number) {
//稼働シートから稼働時間を取得
data = getKadoData(sheet_id)
//残業時間を取得
time_list = calcOverwork(data[0])
//シートに記録
result = LOG_SHEET.getRange(row_number, CD_CUSTOM_COL, 1, time_list.length).setValues([time_list])
Logger.log(result)
}

function getKadoData(sheet_id) {
var mySheet = SpreadsheetApp.openById(sheet_id).getSheetByName(SHEET_NAME);
return mySheet.getRange(KADOU_START_ROW, KADOU_START_COL, 1, mySheet.getLastColumn() - 1).getValues()
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
