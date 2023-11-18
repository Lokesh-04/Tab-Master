document.addEventListener('DOMContentLoaded', function() {
    // Function to display tabs in the popup
    function displayTabs(tabArray) {
      const tabList = document.getElementById('tabList');
      tabList.innerHTML = ''; // Clear previous content
  
      tabArray.forEach(function(tab) {
        const tabElement = document.createElement('div');
        tabElement.textContent = tab.title;
        tabElement.addEventListener('click', function() {
          chrome.tabs.update(tab.id, { active: true });
        });
        tabList.appendChild(tabElement);
      });
    }
  
    // Function to save the current session
    function saveSession() {
      chrome.tabs.query({}, function(tabs) {
        chrome.storage.local.set({ 'savedSession': tabs });
        displayTabs(tabs);
      });
    }
  
    // Function to load a saved session
    function loadSession() {
      chrome.storage.local.get('savedSession', function(result) {
        const savedTabs = result.savedSession || [];
        displayTabs(savedTabs);
      });
    }
  
    // Function to search tabs
    function searchTabs(query) {
      chrome.tabs.query({ title: query }, function(result) {
        displayTabs(result);
      });
    }
  
    // Event listeners
    document.getElementById('saveSession').addEventListener('click', saveSession);
    document.getElementById('loadSession').addEventListener('click', loadSession);
    document.getElementById('searchTabs').addEventListener('input', function(event) {
      searchTabs(event.target.value);
    });
  
    // Display currently open tabs on popup open
    chrome.tabs.query({}, function(result) {
      displayTabs(result);
    });
  });
  