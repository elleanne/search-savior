// search bar - here

// fetch the name to be seacrhed : activated only when search button is pressed

// console.log("in search_bar.js");

var bool = document.getElementById("Submit");
if (bool) {
  bool.addEventListener("click", addSearch);
}

function addSearch(){
    // console.log("In addSearch Bar");

    // item to be searched
    var input_search_name = document.getElementById("search").value;

    // console.log(input_search_name);

    // retrieving all the searches
    
    chrome.storage.sync.get(null, function(items) {

      // list of all the searches
      var allKeys = Object.keys(items);
      // console.log(allKeys);


      // length of object
      len = Object.keys(allKeys).length;
      // console.log(len);


      // checking if allKeys[i] has input_search_name as a substring
      var i;
      var resultsFound = 0
      for (i = 0; i < len; i++) {
        var str = allKeys[i];
        var n = str.includes(input_search_name, 0);

      // excluding dates from searches
        if(str.includes("&&date-",0)){
          continue;
        }
      
        // if the substring exists return the 'search_name'
        if (n == true){
          console.log("Related Searches : " + str);

          // retrieving the info from chrome storage
          // localStorage.getItem("input_name");
          resultsFound += 1;
          continue;
        }
      }

      if (resultsFound == 0){
        console.log("No Results found for '" + input_search_name + "'");
      }

  });
  
}


