(function(){
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details['parentFrameId'] != -1) { return ; }

    var pageUrl = details['url'];
    var proxyName    = proxy.getSettingNameForUrl(pageUrl);
    var proxySetting = proxy.getSettingForName(proxyName);

    proxy.setSetting(proxySetting, function() {
      var label = proxyName;
      if (label == "system") label = "";

      chrome.browserAction.setBadgeBackgroundColor({color:[50, 110, 70, 255]});
      chrome.browserAction.setBadgeText({text:label.slice(0, 4)});
    });
  });
})();