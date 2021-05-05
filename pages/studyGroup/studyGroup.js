// pages/studyGroup/studyGroup.js
Page({

  staticData: {
    inputValue: ""
  },
  data: {
    // 数据源
    classes: ['BILD 1', 'BILD 2', 'BILD 3', 'BILD 4', 'BICD 110', 'CHEM 6A', 'CHEM 6B', 'CHEM 6C', 'CHEM 7L', 'COGS 9',
      'COGS 101A', 'CSE 8A', 'CSE 8B', 'CSE 11', 'CSE 12', 'CSE 20', 'CSE 30', 'CSE 105', 'DSC 10', 'DSC 20', 'DSC 30',
      'DSC 40A', 'DSC 40B', 'DSC 80', 'ECON 1', 'ECON 3', 'ECON 100A', 'ECON 100B', 'ECON 100C', 'ECON 110A',
      'ECON 110B', 'ECON 120A', 'ECON 120B', 'ECON 120C', 'MATH 10A', 'MATH 10B', 'MATH 10C', 'MATH 18', 'MATH 20A',
      'MATH 20B', 'MATH 20C', 'MATH 20D', 'MATH 20E', 'MATH 102',
      'MATH 109', 'MATH 170B', 'MATH 180A', 'MATH 183',
      'PHYS 2C', 'PSYC 1', 'PSYC 2', 'PSYC 3', 'PSYC 4'
    ],
    filtered: [],
    modalHidden: true,
    class: "",
    qr_path: "",
    confirm_text: "获取小助手二维码",
    confirm_type: 0,
    qr_title: "课友群二维码",
    cloud_filepath: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/课友群/",
    assistant_qr: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/课友群/小助手.jpg"
  },

  mytap: function (res) {
    const class_name = res.currentTarget.dataset.item
    this.setData({
      modalHidden: false,
      qr_path: this.data.cloud_filepath + class_name + ".jpg",
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
        qr_path: this.data.cloud_filepath + this.data.class + ".jpg"
      });
    };
  },

  handleString: function (string) {
    string = string.toUpperCase()
    var result = ""
    for (var i = 0; i < string.length; i++) {
      if (string[i] == " ") {
        continue
      }
      result += string[i]
    }
    return result
  },

  handleInputChange: function (keyword) {
    this.staticData.inputValue = keyword.detail.value
    keyword = this.handleString(this.staticData.inputValue)
    if (keyword == "") {
      this.setData({
        filtered: this.data.classes
      })
    } else {
      this.setData({
        filtered: []
      })
      for (var i = 0; i < this.data.classes.length; i++) {
        var temp = this.handleString(this.data.classes[i]).substring(0, keyword.length)
        if (keyword == temp) {
          this.setData({
            filtered: this.data.filtered.concat(this.data.classes[i])
          })
        }
      }
    }
  },

  handleSearch: function () {
    var class_name = this.handleString(this.staticData.inputValue)
    var result = []
    for (var i = 0; i < this.data.classes.length; i++) {
      var temp = this.handleString(this.data.classes[i]).substring(0, class_name.length)
      if (class_name == temp) {
        result.push(this.data.classes[i])
      }
    }
    if (result.length == 1) {
      this.setData({
        modalHidden: false,
        qr_path: this.data.cloud_filepath + result[0] + ".jpg",
        class: result[0],
        confirm_type: 0,
        confirm_text: "获取小助手二维码"
      })

    } else if (result.length != 0) {
      wx.showToast({
        title: '您输入的关键字仍有多个匹配',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '没有匹配',
        icon: 'none',
        duration: 2000
      })
    }
  },

  imageTap: function (e){
    let url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
      current: url
    })
  },

  // saveImg(e){
  //   let url = e.currentTarget.dataset.url;
  //   //用户需要授权
  //   wx.getSetting({
  //    success: (res) => {
  //     if (!res.authSetting['scope.writePhotosAlbum']) {
  //      wx.authorize({
  //       scope: 'scope.writePhotosAlbum',
  //       success:()=> {
  //        // 同意授权
  //        this.saveImg1(url);
  //       },
  //       fail: (res) =>{
  //        console.log(res);
  //       }
  //      })
  //     }else{
  //      // 已经授权了
  //      this.saveImg1(url);
  //     }
  //    },
  //    fail: (res) =>{
  //     console.log(res);
  //    }
  //   })  
  //  },
  //  saveImg1(url){
  //   wx.getImageInfo({
  //    src: url,
  //    success:(res)=> {
  //     let path = res.path;
  //     wx.saveImageToPhotosAlbum({
  //      filePath:path,
  //      success:(res)=> { 
  //       console.log(res);
  //      },
  //      fail:(res)=>{
  //       console.log(res);
  //      }
  //     })
  //    },
  //    fail:(res)=> {
  //     console.log(res);
  //    }
  //   })
  //  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    ;
    this.setData({
      filtered: this.data.classes
    })
  },

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