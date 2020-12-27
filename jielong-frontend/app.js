//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options) {
    console.log("onLaunch");
  },
  onShow: function(options) {
    console.log("onShow");
  },
  onHide: function() {
    console.log("onHide");
  },
  onError: function(msg) {
    console.log("onError");
    console.log(msg);
  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {
    console.log("onPageNotFound");
  },
  globalData: {
    ngrokAdd:"cc8b5d4e9aa5"
  }
});
  