/* delete a project from the table in index.html AND from chrome.storage.sync
 */
// listen for button pressed
var bool = document.getElementById("deleteR");
if (bool) {
  bool.addEventListener("click", deleteRow);
}
// When delete button pressed in index.html, delete row in table and data in storage.sync
function deleteRow() {
  try {
    var table = document.getElementById("dataTable"); // get the table from index.html
    var rowCount = table.rows.length;

    for (var i = 0; i < rowCount; i++) {
      var row = table.rows[i];
      var chkbox = row.cells[0].childNodes[0]; // only delete project that is checked
      if (null != chkbox && true == chkbox.checked) {
        // delete from storage
        var v1 = table.rows[i]
          .getElementsByTagName("form")[0]
          .innerText;
        // delete from storage
        chrome.storage.sync.get(v1, function (data) {
          chrome.storage.sync.remove(v1);
        });
        // delete from table
        table.deleteRow(i);
        rowCount--;
        i--;
      }
    }
  } catch (e) {
    alert(e);
  }
}
