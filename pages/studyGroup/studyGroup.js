// pages/studyGroup/studyGroup.js
Page({

  data: {
    // 数据源
    classes: [
      "技术部",
      "ECON 100A",
      "ECON 100B",
      "ECON 100C",
      "MATH 20A",
      "MATH 20B",
      "MATH 20C",
      "MATH 183",
      "MATH 189",
      "DSC 10",
      "DSC 20",
      "DSC 30",
      "DSC 40A",
      "DSC 40B",
      "DSC 80",
      "DSC 100",
      "DSC 120",
    ],
    modalHidden: true,
    class: "",
    qr_path: "",
    assistant_qr: "",
    confirm_text: "获取小助手二维码",
    confirm_type: 0,
    qr_title: "课友群二维码",
    cloud_filepath: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/课友群/",
    assistant_qr: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/课友群/小助手.jpg"
  },

  mytap: function (res) {
    const class_name = res.currentTarget.dataset.item
    this.setData({
      modalHidden: false,
      qr_path: this.data.cloud_filepath + class_name + ".png",
      class: class_name,
      confirm_type: 0,
      confirm_text: "获取小助手二维码"
    })
  },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    if (this.data.confirm_type == 0) {
      this.setData({
        confirm_text: "获取课友群二维码",
        confirm_type: 1,
        qr_title: "小助手二维码",
        qr_path: this.data.assistant_qr
      });
    } else {
      this.setData({
        confirm_text: "获取小助手二维码",
        confirm_type: 0,
        qr_title: "课友群二维码",
        qr_path: this.data.cloud_filepath + this.data.class + ".png"
      });
    };
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {},

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {},

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {}
})