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
    // if (name === "direct") {
    //   return null;
    // } else if (name === "system") {
    //   return null;
    // }

    var setting = JSON.parse(localStorage['setting']);
    return setting[name];
  }
};