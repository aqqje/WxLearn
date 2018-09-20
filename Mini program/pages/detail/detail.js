// pages/detail/detail.js
let datas = require('../../datas/list-data.js');

let appDatas = getApp();
console.log(appDatas.data.isPlay);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: [],
    index: null,
    isCollection: false,
    isMusicPlay: false
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
    };
    // 判断当前用户是收藏当前文章
    if (isDetailCollected[index]){
      this.setData({
        isCollection: isDetailCollected
      })
    };

    // 监听音乐播放与暂停
    wx.onBackgroundAudioPlay(() => {
      console.log("音乐播放！");
      this.setData({
        isMusicPlay: true
      });
      appDatas.data.isPlay = true;
      appDatas.data.pagaIndex = index;

    });

    // 判断音乐是否在播放
    if (appDatas.data.isPlay && appDatas.data.pagaIndex === index){
      this.setData({
        isMusicPlay: true
      });
    }

    wx.onBackgroundAudioPause(() => {
      console.log("音乐暂停！")
      this.setData({
        isMusicPlay: false
      });
      appDatas.data.isPlay = false;
    });

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
   * 控制音乐播放
   */
  handMusicPlay(){
    // console.log(this)
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    }); 
    if (isMusicPlay){
      // 播放音乐
      let { coverImgUrl, title, dataUrl} = this.data.dataObj.music
      wx.playBackgroundAudio({
        dataUrl,
        coverImgUrl,
        title
      });
    }else{
      // 暂停音乐
      wx.pauseBackgroundAudio({});
    }
    
  },
  handleShare(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到qq空间', '分享到微博']
    });
  }
})