const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultImage: app.globalData.defaultImage,
    max_team: 3,
    team_lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  ons: function(){
    this.setData({
        team_lists: ''
    })
  }

  
})