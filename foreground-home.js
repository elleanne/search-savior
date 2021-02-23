console.log("execute foreground.home");

checkKeys();

// If a new project was made on the index page, add it to the table
var bool = document.getElementById("addR");
if (bool) {
  bool.addEventListener("click", () => {
    var projTable = document
      .getElementById("dataTable")
      .getElementsByTagName("tbody")[0];
    if (projTable.rows[1].getElementsByTagName("input")[1].value !== null) {
    //   chrome.tabs.executeScript(null, { file: "/js/addRow.js" }, () =>
    //     console.log("ran addRow.js")
    //   );
        addRow();
        checkKeys();
    }
  });
}
var bool = document.getElementById("deleteR").addEventListener("click", () => {
    deleteRow();
});

// listen for
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
      console.log(allKeys);
      setAllKeys = allKeys;
      for (i in allKeys) {
        //console.log(document.getElementById(allKeys[i]));
        if (
          document.getElementById(allKeys[i]) === null &&
          allKeys[i] !== "z"
        ) {
          console.log(allKeys[i]);
          addEntry(allKeys[i]);
        }
      }
    }
  });
}
