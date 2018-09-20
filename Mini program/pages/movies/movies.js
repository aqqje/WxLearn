// pages/movies/movies.js
const MOVIE_URL = 'http://t.yushu.im/v2/movie/top250';

let appdatas = getApp();
console.log(appdatas, typeof appdatas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送请求获取电影详情
   
    wx.request({
      url: MOVIE_URL,
      success: (data) => {
        console.log(data);
        this.setData({
          movieArr: data.data.subjects
        });
        appdatas.data.movieArr = data.data.subjects;
      }
      
    })
  },

})