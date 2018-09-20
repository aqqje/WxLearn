// pages/movieDetail/movieDetail.js
let appdatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieItem: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      // 电影详情实体
      movieItem: appdatas.data.movieArr[options.index]
    })
  },
})