# Directory Structure 📜

## HTML FILES
1. [index.html]() : It is the landing page of our chrome extension. It has a `navbar` which allows you to navigate between various tabs such as : `Developer Info` and a `How To: GUIDE`. The landing page keeps track of all your previous search trees, with an assigned `name`, `date` and `category`. The `index.html` page also contains the logic of `Deleting a Row` and `Renaming a Search`.

2. [demo.html]() : It is the `How to: GUIDE` which will help the first time users to get started on how to get the the best out of the cgrome extension.

3. [search.html]() : It is a dynamic html page which contains all the searches made when the chrome extension is toggled on. It contains the links to all the searches in the order of search made.

4. [popup.html]() : It is the popup for the chrome extension. It contains an `on/off` toggle button to activate and deactivate the chrome extension. It contains two form elements: `name` - for entering the name of the search and `category` -  for enetering a category to the search for handy use. It also has a `SAVE` button to save a search, a search will only be saved when it has a valid name. Clicking the `SAVE` button is important to ensure that your searches are saved. It also contains the link to the the `projects` i.e. the list of personal searches. 

## Javascript Files

1. [js]() folder :

    1.1 [addRow.js]() : It is responsible for creating a new row whenever a new search is made. It has an action listener, which toggles on when a new search is made and saved. It has a function [addEntry]() which creates a new row and adds in the values in each of the column, and at the end stores it in the chrome storage.

    ###### Triggerd From : []()

    1.2 [deleteRow]() : It contains logic of deleting the info in row(s). It has an action listener which gets activated whenever user presses the `DELETE ROW` button present in the [index.html](). It has a function called [deleteRow]() which completely deleted all the instances of that row form the chrome storage.
    
    ###### Triggerd From : [index.html]()

    1.3 [jquery-3.2.1.min.js]() :

    1.4 [logic.js]() : It contains the logic for the carets. It allows to create a tree like in a drop down structure represnting the flow of the searches made.

    ###### Triggerd From : []()

    1.5 [main.js]() : It contains the logic for the `responsive webpage`, `preload effect`, and the `back to top` button. 

    ###### Triggerd From : [index.html](), [search.html](), [demo.html]()

    1.6 [modernizr.js]() : 

    1.7 [page_title.js]() : It contains the logic for generating the `page tile` for every search.

    ###### Triggerd From : [search.html]()

    1.8 [search.js]() : It **will** contain the logic for a dynamic search bar.

    ###### Triggerd From : [index.html]()

    1.9 [year.js]() : It contains the logic for creating a date instance, and putting it in the `copyrights` section.

    ###### Triggerd From : [index.html]()

2. [background.js]() : It is the main javascript file which is responsible for creating an instance in the chrome storage for every valid search. It contains functions, `save_name` : for saving the name for each search, `saveProject`: for mapping all the values with its keys and saving it in the chrome storage and reflecting the changes in the UI by creating a new row in the [index.html]() and `getProject`: to get all the information related to a project by its name and retriving it in the [search.html]() page.

###### Triggerd From : [index.html]()

3. [background.test.js]() : It has the test cases for the [background.js]() files. It for the testing purpose it creates some dummy trees and searches and stores it in the chrome storage and reflect the changes in the respective `.html` pages

4. [foreground.js]() : It contains the logic for handling and saving the information related to searches and how to create a tree out of them and storing it in the chrome storage.

###### Triggerd From : [search.html](), [demo.html]()

5. [foreground-home.js]() : it contains the script for checking if a new search is null or not, and if not creating a new instance of it in the chrome storage.

## CSS Files

1. [base.css]()

2. [main.css]()

3. [slider]()

4. [main.min.css]()

## JSON Files

1. [manifest.json]() : It is the driver file which is the most essential part of the chrome extension. It contains all the neccessary information about the chrome extension on how it performs and it's version info etc

2. [package.json]()

3. [package-lock.json]()
