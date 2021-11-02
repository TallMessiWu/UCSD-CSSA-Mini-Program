let classesId = "8f9ff639611a410d00aaa7ba5e2491d6"

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      }
    ],
    swiperImgUrls: [{
        url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      },
      {
        url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      },
      {
        url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      }
    ],
    collections: [{
        text: "精彩活动",
        src: "/images/icons/discovery/xuexiao.png"
      },
      {
        text: "干货攻略",
        src: "/images/icons/discovery/shuji.png"
      },
      {
        text: "社团介绍",
        src: "/images/icons/discovery/shetuanhuodong.png"
      },
      {
        text: "校园帮助",
        src: "/images/icons/discovery/diandeng.png"
      },
      {
        text: "活动报名",
        src: "/images/icons/discovery/baoming.png"
      },
      {
        text: "帮助说明",
        src: "/images/icons/discovery/baozhi.png"
      },
      {
        text: "旅游活动",
        src: "/images/icons/discovery/daba.png"
      },
      {
        text: "竞技比赛",
        src: "/images/icons/discovery/fenlei-dota.png"
      }
    ]
  },

  async setTabBar() {
    let classes_collection = wx.cloud.database().collection("class_chat")
    let classes = (await (await classes_collection.doc(classesId).get())).data
    this.setData({
      ["list[1].text"]: classes.title,
    })
  },

  onCollectionTap(event){
    let name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/collection/collection?name=' + name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTabBar()
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

  }
})