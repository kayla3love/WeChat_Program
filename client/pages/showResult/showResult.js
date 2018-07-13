// pages/login/login.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount:0,
    correctOnes:0,
    totalNum:wx.getStorageSync("questions").length,
    display:false,
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      totalCount: wx.getStorageSync("totalCount"),
      correctOnes: wx.getStorageSync("correctOnes")
    })
   this.judgeResult();
   this.updatePersonalInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    wx.redirectTo({
      url: '../login/login'
    })
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

  },
  judgeResult:function(){
    if (this.data.totalCount === 100) {
      this.setData({
        result: "根正苗红好青年"
      })
    }
    else if (this.data.totalCount >= 70 && this.data.totalCount <= 90) {
      this.setData({
        result: "社会主义小红花"
      })
    }
    else if (this.data.totalCount >= 40 && this.data.totalCount <= 60) {
      this.setData({
        result: "多读几遍十九大报告 吧！"
      })
    }
    else if (this.data.totalCount < 40) {
      this.setData({
        result: "还需要好好学'习'哟！"
      })
    }
  },
  updatePersonalInfo:function(){
    var temp ="";
    var that = this;
    wx.request({
      url: config.service.loginUrl,
      data: {
        name: wx.getStorageSync("name"),
        schoolNumber: wx.getStorageSync("schoolNumber"),
        contact: wx.getStorageSync("contact"),
        totalCount: wx.getStorageSync("totalCount")
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          hidden: true,
          display: true
        })
      }
    })
  },
  finish:function(){
    wx.navigateBack({
      delta: -1
    });
  }
})