// listen for delete button clicked
var bool = document.getElementById("deleteR");
if (bool) {
  bool.addEventListener("click", deleteRow);
}
//When delete button pressed in index.html, delete row in table and data in storage.sync
function deleteRow() {
  try {
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;

    for (var i = 0; i < rowCount; i++) {
      var row = table.rows[i];
      var chkbox = row.cells[0].childNodes[0];
      if (null != chkbox && true == chkbox.checked) {
        // delete from storage
        var v1 = table.rows[i]
          .getElementsByTagName("form")[0].id;
        console.log(table.rows[i].getElementsByTagName("form").outerText);
        
        console.log(v1);
        // delete from storage
        chrome.storage.sync.get(v1, function (data) {
          console.log(v1);
          chrome.storage.sync.remove(v1);
          console.log(v1);
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
