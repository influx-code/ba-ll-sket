// miniprogram/pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logged: false,
    userinfo: app.globalData.userinfo,
    defaultImage: app.globalData.defaultImage,
    team_lists: ['1','2'],
    is_myteam: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                userinfo: res.userInfo
              });
              app.globalData.userinfo = res.userInfo;
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        userinfo: e.detail.userInfo
      })
      app.globalData.userinfo =  e.detail.userInfo;
      app.globalData.DbHelper.addUser(e.detail.userInfo)
    }
  },

  onNewTeam: function(){
    this.setData({
        is_myteam: true,
    })
  }
  
})