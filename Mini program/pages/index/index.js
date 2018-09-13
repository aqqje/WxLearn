// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "msg": "Aqqje",
    "userInfo" : {},
    "isShow": true,
  },

  // /**
  //  * bindxxx(冒泡事件) 与 catchxxx(非冒泡事件) 
  //  */
  // handlePrent(){
  //   console.log("Prent class");
  // },

  // // 绑定子类点击事件-->向上传递
  // handleChild(){
  //   console.log("Child class");
  // },
  

  goList(){
    /**
     * wx.navigateTo(Object object):
     *  保留当前页面，跳转到应用内的某个页面，
     *  但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面
     * wx.redirectTo(Object object):
     *  关闭当前页面，跳转到应用内的某个页面，但是不允许跳转到 tabbar 页面。
     */
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad-->页面加载>" )
    // console.log(this)
    this.getUserInfo();
  },

  getUserInfo(){
    // 判断用户是已经授权
    wx.getSetting({
      success: (data) => {
        console.log(data)
        if (data.authSetting["scope.userInfo"]) {
          // 已经授权
          this.setData({
            isShow: false
          });
        } else {
          // 未授权
          this.setData({
            isShow: true
          });
        }
      }
    })
    // 获取用户信息
    wx.getUserInfo({
      success: (data) => {
        // console.log(data);
        this.setData({
          // 将数据交给当前页面
          userInfo: data.userInfo
        })
      },
      fail() {
        console.log("用户信息获取失败！")
      }
    })
  },
  // 处理授权回调
  handleGetUserInfo(data){
    console.log(data)
    // 允许授权
    if (data.detail.rawData){
      this.getUserInfo();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady-->页面初次渲染>")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow-->页面显示>")
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