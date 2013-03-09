(function(){
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details['parentFrameId'] != -1) { return ; }

    var pageUrl = details['url'];
    var proxySetting = proxy.getSettingForUrl(pageUrl);
    if (!proxySetting) { return; }

    chrome.proxy.settings.set({
      value: {
        "mode": "fixed_servers",
        "rules": {
          "singleProxy": {
            "host": proxySetting.host,
            "port": proxySetting.port
          }
        }
      },
      "scope": "regular"
    }, function() {
      console.log('applied');
    });

  });
})();