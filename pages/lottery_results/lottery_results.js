// pages/activity/activity.js
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"

const app = getApp()
const classesId = "8f9ff639611a410d00aaa7ba5e2491d6"
const db = wx.cloud.database()
const lotteryCollection = db.collection("lottery")
const _ = db.command
var count = 0


Page({

  /**
   * 页面的初始数据
   */
  data: {
      _id: "",
      events: [],
      data_first: {
        avatarUrl: "",
        nickname: ""
      },
      data_second: [{
        avatarUrl: "",
        nickname: ""
    }],
    data_third: [{
        avatarUrl: "",
        nickname: ""
    }],
    data_luck: [{
        avatarUrl: "",
        nickname: ""
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      _id: options._id
  })
  this._getList(0, 10)
  setTimeout(function(){
    wx.hideLoading()

  }, 2000)
  },

  async _getList(start, count) {
    wx.cloud.callFunction({
      name: "getLottery",
      data: {
        start,
        count,
        $url: "list"
      }
    }).then((res) => {
      console.log(res.result)
      this.setData({
        events: this.data.events.concat(res.result)
      })
    })
  },
  async GUP(event) {
    const openid = app.globalData.openid
    const _id = event.currentTarget.dataset._id
    if (count == 0){
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    count = 1
    }
    const info = await lotteryCollection.doc(this.data._id).get()
    await this.setData({
        data_first: info.data.first,
        data_second: info.data.second,
        data_third: info.data.third,
        data_luck: info.data.luck
    })
    wx.hideLoading()
    return

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

  // 页面监听函数
  onPageScroll() {
  }

})