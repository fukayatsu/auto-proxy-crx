(function(){
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details['parentFrameId'] != -1) { return ; }

    var pageUrl = details['url'];
    var proxySetting = proxy.getSettingForUrl(pageUrl);
    if (!proxySetting) { return; }

    chrome.proxy.settings.set(proxySetting, function() {
      console.log('applied');
    });

  });
})();