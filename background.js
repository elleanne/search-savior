

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
    chrome.storage.local.get('enabled', function (result) {

        console.log("initial status: " + result.enabled);
        if (result.enabled != null) {
            checkbox.checked = result.enabled;
        }
    });
  
if(checkbox){
    checkbox.addEventListener('click', function () {
        console.log("current status: " + checkbox.checked);
        chrome.storage.local.set({ 'enabled': checkbox.checked }, function () {
            console.log("confirmed");
        
        });
    });
}
});
