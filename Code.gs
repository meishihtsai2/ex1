/**
 * 提供 Web 應用程式首頁
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Python 程式自評系統')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 接收學生提交的自評結果並寫入試算表
 */
function recordSubmission(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('評測記錄') 
                  || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    sheet.appendRow([
      new Date(),
      data.studentId,
      data.studentName,
      data.score,
      data.status,
      data.code
    ]);
    
    return { success: true, message: '成績與程式碼已成功記錄！' };
  } catch (error) {
    return { success: false, message: '記錄失敗：' + error.toString() };
  }
}
