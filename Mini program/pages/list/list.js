// pages/list/list.js
let datas=require("../../datas/list-data.js")
// console.log(datas , typeof datas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray: []
  },

  /**
   * go --> detail
   */
  goDetail(event){
    console.log(event);
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index
    })
  },

  /**
   * 轮播图跳转
   */
  carouselToDetail(event) {
    console.log(event);
    let index = event.target.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataArray: datas.list_data
    });
  },
})