var proxy = {
  getSettingForUrl: function(url) {
    targetMap = JSON.parse(localStorage['targetMap']);

    for(var target in targetMap) {
      if (url.match(target)) {
        var name = targetMap[target];
        return this.getSettingForName(name);
      }
    }
    return null;
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