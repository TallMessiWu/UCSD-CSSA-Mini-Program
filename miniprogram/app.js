//app.js
App({
  onLaunch: function () {
    this.checkUpdate()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "ucsdcssa-5gxqhwwc12d1b1bf",
        traceUser: true,
      })
    }
    this.globalData = {
      gChatBaseUrl: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/课友群/",
      gCardBaseUrl: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/CSSA卡/",
      openid: -1,
      tmplId: "7qV7hnOBhRQbxp2NvPPXWAjaLzucqyu0uK03jOSiFkc"
    }
    this.getOpenid()
  },

  checkUpdate() {
    const updateManager = wx.getUpdateManager()
    // 检测版本更新
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用",
            success: (res) => {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  },

  getOpenid() {
    wx.cloud.callFunction({
      name: "login"
    }).then((res) => {
      const openid = res.result.openid
      this.globalData.openid = openid
    })
  }
})