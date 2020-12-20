chrome.browserAction.onClicked.addListener(function(activeTab){
  chrome.windows.create({
	  'url': chrome.extension.getURL('index.html'),
	  'width':600,
	  'type':"popup",
	  'focused':true
	  }, function(tab){
  console.log("Window opened");
  });
});