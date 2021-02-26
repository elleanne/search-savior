// Authors: MLH POD 2.1.3 Goofy Goffy {Elizabeth Crouther, Sakshi Gupta, Myat Thu Ko}
// get current year and add it to the footer
var date = document.createTextNode(" " + new Date().getFullYear());
var copyright = document.getElementById("copyright");
copyright.appendChild(date);
