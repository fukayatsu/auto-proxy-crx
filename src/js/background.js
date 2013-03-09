(function(){
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details['parentFrameId'] != -1) { return ; }

    var pageUrl = details['url'];
    var proxyName    = proxy.getSettingNameForUrl(pageUrl);
    var proxySetting = proxy.getSettingForName(proxyName);

    proxy.setSetting(proxySetting, function() {
      proxy.setBadgeForUrl(pageUrl);
    });
  });

  chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function(tab) {
      proxy.setBadgeForUrl(tab.url);
    });
  });
})();