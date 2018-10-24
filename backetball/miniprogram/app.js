//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      defaultImage: 'https://res.viewlayer.cn/puzzle/components/1f58fbe741501917fdb1374d24da8b48.png',
      userinfo:{},
    }
  }
})
