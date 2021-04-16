# Directory Structure 📜

## HTML FILES
1. [index.html](https://github.com/eliboss/search-savior/blob/main/projectpage/index.html): It is the landing page of our chrome extension. It has a `navbar` which allows you to navigate between various tabs such as: `Developer Info` and a `How To GUIDE`. The landing page keeps track of all your previous search trees, with an assigned `name`, `date`, and `category`. The `index.html` page also contains the logic of `Deleting a Row` and `Renaming a Search`.

2. [demo.html](https://github.com/eliboss/search-savior/blob/main/projectpage/demo.html): It is the `How to: GUIDE` which will help the first time users to get started on how to get the best out of the chrome extension.

3. [search.html](https://github.com/eliboss/search-savior/blob/main/projectpage/search.html): It is a dynamic HTML page that contains all the searches made when the chrome extension is toggled on. It contains the links to all the searches in the order of search made.

4. [popup.html](https://github.com/eliboss/search-savior/blob/main/popup.html): It is the popup for the chrome extension. It contains an `on/off toggle button to activate and deactivate the chrome extension. It contains two form elements: `name` - for entering the name of the search and `category` -  for entering a category to the search for handy use. It also has a `SAVE` button to save a search, a search will only be saved when it has a valid name. Clicking the `SAVE` button is important to ensure that your searches are saved. It also contains the link to the `projects` i.e. the list of personal searches. 

## Javascript Files

1. [js](https://github.com/eliboss/search-savior/tree/main/projectpage/js) folder :

    1.1 [addRow.js](https://github.com/eliboss/search-savior/blob/main/projectpage/js/addRow.js): It is responsible for creating a new row whenever a new search is made. It has an active listener, which toggles on when a new search is made and saved. It has a function [addEntry](https://github.com/eliboss/search-savior/blob/8d0e9df9feaa43cd373e73d718466bf3f07344d4/projectpage/js/addRow.js#L45) which creates a new row and adds in the values in each of the columns and at the end stores it in the chrome storage.

    ###### Triggerd From : [background.js](https://github.com/eliboss/search-savior/blob/main/background.js)

    1.2 [deleteRow](https://github.com/eliboss/search-savior/blob/main/projectpage/js/deleteRow.js) : It contains logic of deleting the info in row(s). It has an active listener which gets activated whenever the user presses the `DELETE ROW` button present in the [index.html](https://github.com/eliboss/search-savior/blob/main/projectpage/index.html). It has a function called [deleteRow](https://github.com/eliboss/search-savior/blob/8d0e9df9feaa43cd373e73d718466bf3f07344d4/projectpage/js/deleteRow.js#L11) which completely deleted all the instances of that row from the chrome storage.
    
    ###### Triggerd From : [index.html](https://github.com/eliboss/search-savior/blob/main/projectpage/index.html)

    1.3 [jquery-3.2.1.min.js](https://github.com/eliboss/search-savior/blob/main/projectpage/js/jquery-3.2.1.min.js) :

    1.4 [logic.js](https://github.com/eliboss/search-savior/blob/main/projectpage/js/logic.js) : It contains the logic for the carets. It allows creating a tree-like drop-down structure representing the flow of the searches made.

    ###### Triggerd From : []()

    1.5 [main.js](https://github.com/eliboss/search-savior/blob/main/projectpage/js/main.js) : It contains the logic for the `responsive webpage`, `preload effect`, and the `back to top` button. 

    ###### Triggerd From : [index.html](https://github.com/eliboss/search-savior/blob/main/projectpage/index.html), [search.html](https://github.com/eliboss/search-savior/blob/main/projectpage/search.html), [demo.html](https://github.com/eliboss/search-savior/blob/main/projectpage/demo.html)

    1.6 [modernizr.js](https://github.com/eliboss/search-savior/blob/main/projectpage/js/modernizr.js) : 

    1.7 [page_title.js](https://github.com/eliboss/search-savior/blob/main/projectpage/js/page_title.js) : It contains the logic for generating the `page tile` for every search.

    ###### Triggerd From : [search.html](https://github.com/eliboss/search-savior/blob/main/projectpage/search.html)

    1.8 [search.js](https://github.com/eliboss/search-savior/blob/main/projectpage/js/search.js) : It **will** contain the logic for a dynamic search bar.

    ###### Triggerd From : [index.html](https://github.com/eliboss/search-savior/blob/main/projectpage/index.html)

    1.9 [year.js](https://github.com/eliboss/search-savior/blob/main/projectpage/js/year.js): It contains the logic for creating a date instance, and putting it in the `copyrights` section.

    ###### Triggerd From : [index.html](https://github.com/eliboss/search-savior/blob/main/projectpage/index.html)

2. [background.js](https://github.com/eliboss/search-savior/blob/main/background.js): It is the main javascript file which is responsible for creating an instance in the chrome storage for every valid search. It contains functions, `save_name`: for saving the name for each search, `save_project`: for mapping all the values with its keys and saving it in the chrome storage and reflecting the changes in the UI by creating a new row in the [index.html]() and `getProject`: to get all the information related to a project by its name and retrieving it in the [search.html](https://github.com/eliboss/search-savior/blob/main/projectpage/search.html) page.

###### Triggerd From : [index.html](https://github.com/eliboss/search-savior/blob/main/projectpage/index.html)

3. [background.test.js](https://github.com/eliboss/search-savior/blob/main/background.test.js): It has the test cases for the [background.js](https://github.com/eliboss/search-savior/blob/main/background.js) files. It for the testing purpose it creates some dummy trees and searches and stores it in the chrome storage and reflect the changes in the respective `.html` pages

4. [foreground.js](https://github.com/eliboss/search-savior/blob/main/foreground.js): It contains the logic for handling and saving the information related to searches and how to create a tree out of them and storing it in the chrome storage.

###### Triggerd From : [search.html](https://github.com/eliboss/search-savior/blob/main/projectpage/search.html), [demo.html](https://github.com/eliboss/search-savior/blob/main/projectpage/demo.html)

5. [foreground-home.js](https://github.com/eliboss/search-savior/blob/main/foreground-home.js): it contains the script for checking if a new search is null or not and if not creating a new instance of it in the chrome storage.

## CSS Files

1. [base.css]((https://github.com/eliboss/search-savior/blob/main/projectpage/css/base.css)

2. [main.css](https://github.com/eliboss/search-savior/blob/main/projectpage/css/main.css)

3. [slider](https://github.com/eliboss/search-savior/blob/main/slider.css)

4. [main.min.css](https://github.com/eliboss/search-savior/blob/main/projectpage/css/compressed/main.min.css)

## JSON Files

1. [manifest.json](https://github.com/eliboss/search-savior/blob/main/manifest.json): It is the driver file which is the most essential part of the chrome extension. It contains all the necessary information about the chrome extension on how it performs and its version info etc

2. [package.json](https://github.com/eliboss/search-savior/blob/main/package.json)

3. [package-lock.json](https://github.com/eliboss/search-savior/blob/main/package-lock.json)
