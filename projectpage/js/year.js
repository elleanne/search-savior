// get current year and add it to the footer
var date = document.createTextNode(" " + new Date().getFullYear());
var copyright = document.getElementById("copyright");
copyright.appendChild(date);
