function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Emails');
  var email = e.parameter.email || '';

  // Valida e-mail basico
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, msg: 'E-mail invalido.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Evita duplicatas
  var dados = sheet.getDataRange().getValues();
  for (var i = 1; i < dados.length; i++) {
    if (dados[i][1] === email) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: true, msg: 'ja_cadastrado' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // Salva
  sheet.appendRow([new Date().toLocaleString('pt-BR'), email]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'salvo' }))
    .setMimeType(ContentService.MimeType.JSON);
}
