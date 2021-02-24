console.log("execute foreground.home");

checkKeys();

// If a new project was made on the index page, add it to the table
// checking for null
var bool = document.getElementById('addR');
if(bool){
  bool.addEventListener("click", () => {
    var projTable = document
      .getElementById("dataTable")
      .getElementsByTagName("tbody")[0];
    if (projTable.rows[1].getElementsByTagName("input")[1].value !== null) {
      addRow(); // add row to index.html table
      checkKeys(); // add tree to search page

    }
  });
}

// if delete button clicked, delete row
var bool = document.getElementById("deleteR").addEventListener("click", () => {
  deleteRow();
});

// listen for a new tree added to storage.sync
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    if (key === "enabled" && storageChange.newValue === false) {
      window.open("/projectpage/search.html"); // solution for now to refresh page when index.html is open is doesn't want to refresh
      checkKeys();
    }
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    );
  }
});


// if there are new trees added to sync storage, add them to the page
function checkKeys() {
  var setAllKeys;
  chrome.storage.sync.get(null, function (items) {
    var allKeys = Object.keys(items);
    if (allKeys !== null) {
      setAllKeys = allKeys;
      for (i in allKeys) {
        if (
          document.getElementById(allKeys[i]) === null &&
          allKeys[i] !== "z"
        ) {
          addEntry(allKeys[i]);
        }

      }
    }
  });
}
