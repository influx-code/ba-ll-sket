const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultImage: app.globalData.defaultImage,
    transition: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  onChooseMember: function(){
      console.log(1)
      this.setData({
        transition: '1'
      })
  }
  
})