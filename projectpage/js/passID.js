function saveName(name) {
  console.log(name + " in passid");
  chrome.storage.local.set({ projectName: name });
}