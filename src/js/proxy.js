var proxy = {
  setSetting: function(setting, callback) {
    chrome.proxy.settings.set(setting, function() {
      callback();
    });
  },
  getSettingNameForUrl: function(url) {
    targetMap = JSON.parse(localStorage['targetMap']);

    for(var target in targetMap) {
      if (url.match(target)) {
        return targetMap[target];
      }
    }

    return "system";
  },
  getSettingForName: function(name) {
    var setting = {
      scope: "regular"
    };

    if (name === "direct" || name === "system") {
      setting['value'] = { mode: name };
      return setting;
    }

    var proxySetting = JSON.parse(localStorage['setting'])[name];
    setting['value'] = {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          host: proxySetting.host,
          port: proxySetting.port
        }
      }
    };

    return setting;
  }
};