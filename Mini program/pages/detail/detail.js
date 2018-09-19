// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: [],
    index: null,
    isCollection: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let index = options.index
    this.setData({
      dataObj: datas.list_data[index],
      index
    });
    
    let isDetailCollected =  wx.getStorageSync("isCollected");
    // 对缓存对象进行 init
    if (!isDetailCollected){
      wx.setStorageSync("isCollected", {})
    }
    // 判断当前用户是收藏当前文章
    if (isDetailCollected[index]){
      this.setData({
        isCollection: isDetailCollected
      })
    }

  },
  // 是否显示收藏
  handleCollection() {
    let isCollection = !this.data.isCollection;
    this.setData({
      isCollection: isCollection
    })
    let title = isCollection ? "收藏成功" :"取消收藏"
    wx.showToast({
      title: title,
      icon: "success"
    });
    // 获取本地缓存数据
    wx.getStorage({
      key: "isCollected",
      success: (datas) => {
        // console.log(datas, typeof datas);
        // 设置本地缓存数据
        let { index } = this.data;
        let obj = datas.data;
        obj[index] = isCollection;
        wx.setStorage({
          key: "isCollected",
          data: obj,
          success: () => {
            console.log("缓存成功！")
          }
        });
      }
    })



  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})