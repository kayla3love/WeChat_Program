// pages/login/login.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:"",
    currentTime:20,
    currentIndex:0,
    currentQuestion: "",
    items:[],
    disabled:false,
    selection:"",
    showView: true,
    questions: "",
    options: "",
    displayAll: false,
    message:"",
    next:"下一题",
    hiddenLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      questions: wx.getStorageSync("questions"),
      options: wx.getStorageSync("options"),
      currentIndex:wx.getStorageSync("currentIndex")
    })
   // console.log(this.data.questions)
    //console.log(this.data.options)
    var current = this.data.currentIndex - 1;
    var temp = this.isSingle(current);
    this.setData({
      currentQuestion: this.data.questions[current].title,
      items: temp,
      displayAll:true,
      hiddenLoading: true,
    })
    this.countDownetCode();
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

  isSingle:function(current){
    var currentItem = this.data.options[current];
    var temp = [{
      name: "A",
      value: currentItem [0].optionDetail,
    },
    {
      name: "B",
      value: currentItem [1].optionDetail,
    },
    {
      name: "C",
      value: currentItem [2].optionDetail,
    },
    {
      name: "D",
      value: currentItem [3].optionDetail,
    }]
    if (this.data.questions[current].isSingle.data[0] === 1) {
      this.setData({
        showView:true,
      })
    }
    else{
      this.setData({
        showView: false
      })
    }
    return temp;
  },
  //倒计时20s钟
  countDownetCode: function () {
    var that = this;
    var currentTime = this.data.currentTime;
    this.setData({
      time: currentTime + '秒'
    })
    var interval = setInterval(function () {
      that.setData({
        time: (currentTime - 1) +
        '秒'
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '0',
          currentTime: 60,
          disabled: true
        })
      }
    }, 1000);
    that.setData({
      interval: interval
    })
  },
  //判断题目是否回答正确
  isRight:function(){
    var array = this.data.selection;
    var currentItem = this.data.options[this.data.currentIndex - 1];
    var answerNum = 0;
    for(var i = 0 ; i < 4; i++){
      var temp = currentItem[i];
      if(temp.isRight.data[0]){
        answerNum++;
      }
      for(var j = 0; j < array.length; j++){
        if(temp.optionItem === array[j]){
          if (!temp.isRight.data[0]){
            return false;
          }
        }
      }
    }
    if(answerNum !== array.length){
      return false;
    }
    return true;
  },
  //单选框结果发生变化
  radioChange: function (e) {
    this.setData({
      selection: e.detail.value
    })
  },
  //多选框结果发生变化
  checkboxChange:function(e){
    console.log(e.detail.value)
    this.setData({
      selection: e.detail.value
    })
  },

  submit:function(e){
    wx.setStorageSync("currentIndex", this.data.currentIndex + 1);
    if (this.isRight()) {
      this.setData({
        message: "回答正确"
      })
      var countTemp = wx.getStorageSync("totalCount");
      var correctTemp = wx.getStorageSync("correctOnes");
      wx.setStorageSync("totalCount", countTemp + 10);
      wx.setStorageSync("correctOnes", correctTemp + 1);
    }
    else {
      this.setData({
        message: "回答错误"
      })
    }
    if (this.data.currentIndex < this.data.questions.length){
      this.setData({
        hiddenLoading: false
      })
      setTimeout(function () {
      wx.redirectTo({
        url: '../questionAndAnswer/questionAndAnswer'
      })},1000)
    }
    else{
      this.setData({
        next: "查看结果",
      })
      wx.redirectTo({
        url: '../showResult/showResult'
      })
    }
  }
})