chrome.tabs.onActivated.addListener(tab => {
    console.log(tab);
    chrome.tabs.insertCSS(null, {file: './slider.css'});
    chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log("ran foreground"));
});