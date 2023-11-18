let tabData = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getTabs") {
    sendResponse({ tabs: tabData });
  } else if (request.action === "updateTabs") {
    tabData = request.tabs;
  }
});
