const classesId = "8f9ff639611a410d00aaa7ba5e2491d6"

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
      },
      {
        pagePath: "/pages/activity/activity",
        text: "活动抽奖",
        iconPath: "/images/icons/activity.png",
        selectedIconPath: "/images/icons/activity-activated.png"
      }
    ],
    collections: [{
        text: "CSSA简介",
        src: "/images/cssa-logo.jpg"
      },
      {
        text: "TritonTalk",
        src: "/images/icons/discovery/baozhi.png"
      },
      {
        text: "干货攻略",
        src: "/images/icons/discovery/ganhuogonglue.png"
      },
      {
        text: "联系我们",
        src: "/images/icons/discovery/lianxiwomen.png"
      },
      {
        text: "CSSA原创",
        src: "/images/icons/discovery/diandeng.png"
      },
      {
        text: "活动预告",
        src: "/images/icons/discovery/huodongyugao.png"
      },
      {
        text: "往期活动",
        src: "/images/icons/discovery/wangqihuodong.png"
      },
      {
        text: "新生指南",
        src: "/images/icons/discovery/xinshengzhinan.png"
      }
    ],
    headlines: [],
    starredArticles: [],
    isSearching: false,
    searchResult: [],
    keyword: "",
    service: false,
    searchTitle: "请输入你要搜索的课程名称...",
  },

  async setTabBar() {
    let classes_collection = wx.cloud.database().collection("class_chat")
    let classes = (await (await classes_collection.doc(classesId).get())).data
    this.setData({
      ["list[1].text"]: classes.title,
    })
  },

  onCollectionTap(event) {
    if (this.data.service) {
      wx.navigateTo({
        url: '/pages/collection/collection?name=课程信息'
      })
      return
    }
    let name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/collection/collection?name=' + name
    })
  },

  onArticleTap(event) {
    const content = event.currentTarget.dataset.article.content
    wx.navigateTo({
      url: `/pages/article/article?content=${content}&collectionName=精选推荐`,
    })
  },

  onHeadlineTap(event) {
    const content = event.currentTarget.dataset.article.articleInfo[0].content
    wx.navigateTo({
      url: `/pages/article/article?content=${content}&collectionName=头条`,
    })
  },

  onSearchTap(event) {
    const content = event.currentTarget.dataset.article.content
    wx.navigateTo({
      url: `/pages/article/article?content=${content}&collectionName=搜索`,
    })
  },

  loadHeadlines() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "getHeadlines"
    }).then((res) => {
      this.setData({
        headlines: res.result.list
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  loadStarredArticles() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "getArticles",
      data: {
        collectionName: "精选推荐",
        start: 0
      }
    }).then((res) => {
      this.setData({
        starredArticles: res.result.data.slice(0, 2)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },

  onSearch(event) {
    const keyword = event.detail.value.trim()
    if (keyword == "") {
      this.onSearchCancel()
      return
    }
    this.setData({
      keyword,
      isSearching: true
    })

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if (this.data.service) {
      this.setData({
        searchResult: []
      })
      wx.hideLoading()
      return
    }
    wx.cloud.callFunction({
      name: "searchArticles",
      data: {
        keyword,
        start: this.data.searchResult.length
      }
    }).then((res) => {
      this.setData({
        searchResult: res.result.data
      })
      wx.hideLoading()
    })
  },

  onSearchCancel() {
    this.setData({
      isSearching: false,
      searchResult: []
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setTabBar()
    wx.cloud.database().collection("card_info").doc("cd045e756142fe8d0e6e827f32aeb3cb").get().then((res) => {
      this.setData({
        service: res.data.service
      })
      if (!this.data.service) {
        this.setData({
          searchTitle: "请输入你要搜索的文章标题..."
        })
        this.loadHeadlines()
        this.loadStarredArticles()
      } else {
        this.setData({
          headlines: [{
            poster: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg",
            articleInfo: [{
              collection: "CSSA简介 TritonTalk 干货攻略 联系我们 CSSA原创 活动预告 往期活动 新生指南",
              content: ["cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg"],
              title: "课程信息1",
              summary: "课程简介",
              thumbnail: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg"
            }]
          }],
          starredArticles: [{
              collection: "CSSA简介 TritonTalk 干货攻略 联系我们 CSSA原创 活动预告 往期活动 新生指南",
              content: ["cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg"],
              title: "课程信息1",
              summary: "课程简介",
              thumbnail: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg"
            },
            {
              collection: "CSSA简介 TritonTalk 干货攻略 联系我们 CSSA原创 活动预告 往期活动 新生指南",
              content: ["cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class2.jpg"],
              title: "课程信息2",
              summary: "课程简介",
              thumbnail: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class2.jpg"
            }
          ]
        })
        wx.hideLoading()
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
    if (!this.data.service) {
      if (this.data.isSearching) {
        this.data.searchResult = []
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        wx.cloud.callFunction({
          name: "searchArticles",
          data: {
            keyword: this.data.keyword,
            start: this.data.searchResult.length
          }
        }).then((res) => {
          this.setData({
            searchResult: this.data.searchResult.concat(res.result.data)
          })
          wx.hideLoading()
          wx.stopPullDownRefresh()
        })
      } else {
        this.data.headlines = []
        this.data.starredArticles = []
        this.loadHeadlines()
        this.loadStarredArticles()
      }
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.setData({
        headlines: [{
          poster: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg",
          articleInfo: [{
            collection: "CSSA简介 TritonTalk 干货攻略 联系我们 CSSA原创 活动预告 往期活动 新生指南",
            content: ["cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg"],
            title: "课程信息1",
            summary: "课程简介",
            thumbnail: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg"
          }]
        }],
        starredArticles: [{
            collection: "CSSA简介 TritonTalk 干货攻略 联系我们 CSSA原创 活动预告 往期活动 新生指南",
            content: ["cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg"],
            title: "课程信息1",
            summary: "课程简介",
            thumbnail: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class1.jpg"
          },
          {
            collection: "CSSA简介 TritonTalk 干货攻略 联系我们 CSSA原创 活动预告 往期活动 新生指南",
            content: ["cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class2.jpg"],
            title: "课程信息2",
            summary: "课程简介",
            thumbnail: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/主页/class2.jpg"
          }
        ]
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if (!this.data.service) {
      if (this.data.isSearching) {
        wx.cloud.callFunction({
          name: "searchArticles",
          data: {
            keyword: this.data.keyword,
            start: this.data.searchResult.length
          }
        }).then((res) => {
          this.setData({
            searchResult: this.data.searchResult.concat(res.result.data)
          })
        })
      }
    } else {
      this.setData({
        searchResult: []
      })
    }
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})