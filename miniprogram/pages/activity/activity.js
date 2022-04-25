// pages/activity/activity.js
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"

const app = getApp()
const classesId = "8f9ff639611a410d00aaa7ba5e2491d6"
const db = wx.cloud.database()
const lotteryCollection = db.collection("lottery")
const _ = db.command


Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
    title: "活动抽奖",
    scrollTop: undefined,
    list: [{
        pagePath: "/pages/discovery/discovery",
        text: "主页",
        iconPath: "/images/icons/discovery.png",
        selectedIconPath: "/images/icons/discovery-activated.png"
      },
      {
        pagePath: "/pages/class-chat/class-chat",
        text: "UCSD CSSA",
        iconPath: "/images/icons/chat.png",
        selectedIconPath: "/images/icons/chat-activated.png"
      }, {
        pagePath: "/pages/cssa-card/cssa-card",
        text: "CSSA卡",
        iconPath: "/images/icons/card.png",
        selectedIconPath: "/images/icons/card-activated.png"
      },
      {
        pagePath: "/pages/activity/activity",
        text: "活动抽奖",
        iconPath: "/images/icons/activity.png",
        selectedIconPath: "/images/icons/activity-activated.png"
      }
    ],
    events: []
  },

  async setTabBar() {
    let classes_collection = wx.cloud.database().collection("class_chat")
    let classes = (await (await classes_collection.doc(classesId).get())).data
    this.setData({
      ["list[1].text"]: classes.title,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTabBar()
    this._getList(0, 10)
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

  async register(event) {
    const openid = app.globalData.openid
    const _id = event.currentTarget.dataset._id
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.getUserProfile({
      desc: '用于提供获奖信息',
      success: async (res) => {
        const userInfo = res.userInfo
        userInfo.openid = openid
        const info = (await lotteryCollection.doc(_id).get()).data        
        if (info.users == null) {
          await lotteryCollection.doc(_id).update({
            data: {
              users: [userInfo]
            }
          })
          wx.showToast({
            title: "报名成功！",
            icon: "success"
          })
          wx.hideLoading()
          return
        }
        console.log(info)
        const exists = (await lotteryCollection.where({
          _id,
          users: _.elemMatch({
            openid
          })
        }).get()).data.length == 1
        if (!exists) {
          await lotteryCollection.doc(_id).update({
            data: {
              users: info.users.concat([userInfo])
            }
          })
          wx.hideLoading()
          wx.showToast({
            title: "报名成功！",
            icon: "success"
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: "你已经报名过抽奖了哦！",
            icon: "none"
          })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({
          title: "参与抽奖需要授权登录哦",
          icon: "none"
        })
      }
    })
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
    this._getList(this.data.events.length, 10)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 页面监听函数
  onPageScroll(res) {
    this.setData({
      scrollTop: res.scrollTop,
    })
  }

})