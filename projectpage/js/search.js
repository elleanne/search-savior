// Authors: MLH POD 2.1.3 Goofy Goffy {Elizabeth Crouther, Sakshi Gupta, Myat Thu Ko}
function search_result() {
  var bool = document.getElementById("search_input");
  if (bool) {
    bool.addEventListener("click", search_result);
  }

  function search_result() {
    console.log(bool);
  }
}
