// pages/login/login.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    contact: '',
    schoolNumber:'',
    index:[40],
    questions:[],
    options:[],
    questionID:[],
    questionTitle:[],
    isSingle:[],
    optionID:[],
    optionRight:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //如果有本地数据，则直接显示
    //获取本地数据
    var name = wx.getStorageSync("name");
    var schoolNumber = wx.getStorageSync("schoolNumber");
    var contact = wx.getStorageSync("contact")

    if (name && schoolNumber && contact) {
      this.setData({
        name: name,
        schoolNumber: schoolNumber,
        contact:contact
      });
    }
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
  /**
   * 用户自定义事件处理函数
   */
  // 获取输入姓名
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 获取输学号
  schoolNumberInput: function (e) {
    this.setData({
      schoolNumber: e.detail.value
    })
  },
  // 获取输手机号
  contactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  objectArraySort: function (keyName) {
    return function (objectN, objectM) {
      var valueN = objectN[keyName]
      var valueM = objectM[keyName]
      if (valueN > valueM) return 1
      else if (valueN < valueM) return -1
      else return 0
    }
  },

  // 登录 
  loginSubmit: function (e) {
    var that = this;
    //console.log(e.detail.value);
    var formData = e.detail.value;
    wx.request({
      url: config.service.checkUrl,
      data:{
        studentNumber: formData.schoolNumber
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res){
        if(res.data === true){     //如果该用户没有做过，就继续，否则提示只能做一次
          //同步方式存储表单数据
          if (formData.name && formData.schoolNumber && formData.contact) {
            wx.setStorageSync("name", formData.name);
            wx.setStorageSync("schoolNumber", formData.schoolNumber);
            wx.setStorageSync("contact", formData.contact);

            //随机在题库中抽取40道题目
            wx.request({
              url: config.service.getTitleUrl,
              method: 'GET',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                if (res.data) {
                  var temp = res.data.questions;
                  var tempArray = [];
                  for (var i = 0; i < temp.length; i++) {
                    if (temp[i] !== null) {
                      tempArray.push(temp[i])
                    }
                  }
                  that.setData({
                    questions: tempArray,
                    index: res.data.index,
                  })
                  //获得随机题目的选项
                  wx.request({
                    url: config.service.getOptionsUrl,
                    data: {
                      index: that.data.index,
                    },
                    method: 'GET',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      that.setData({
                        options: res.data,
                      })
                      wx.setStorageSync("questions", that.data.questions.sort(that.objectArraySort('id')));
                      wx.setStorageSync("options", that.data.options);
                      wx.setStorageSync("currentIndex", 1);
                      wx.setStorageSync("totalCount", 0);
                      wx.setStorageSync("correctOnes", 0);
                      wx.redirectTo({
                        url: '../questionAndAnswer/questionAndAnswer'
                      })
                    }
                  })
                }
              }
            })
          }else {
            wx.showModal({
              title: "提示",
              content: "请填写完所有数据",
              duration: 2000
            })
          }
        }else{
          wx.showModal({
            title: "提示",
            content: "每个人只能答一次哟",
            duration: 2000
          })
        }
      }
    })
  }
})