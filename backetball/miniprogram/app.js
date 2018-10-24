//app.js

App({
  onLaunch: function () {
      //   console.log(db)
      if (!wx.cloud) {
          console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
            var db = require('./db/index');

            wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  console.log('[云函数] [login] user openid: ', res.result.openid)
                  this.globalData.openid = res.result.openid
                },
                fail: err => {
                  console.error('[云函数] [login] 调用失败', err)
                }
              })
           
        }
        
    // let DbHelper = new db();
    this.globalData = {
      openid: '',
      defaultImage: 'https://res.viewlayer.cn/puzzle/components/1f58fbe741501917fdb1374d24da8b48.png',
      userinfo:{},
      DbHelper: new db(),
    }
  }
})
