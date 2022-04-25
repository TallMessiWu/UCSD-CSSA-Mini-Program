const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        useCodeSrc: app.globalData.gCardBaseUrl + "useCodeExample.png",
        cardActivatedSrc: app.globalData.gCardBaseUrl + "cardActivated.png"
    },

    onImageTap(event) {
        const src = event.target.dataset.src
        wx.previewImage({
            current: src,
            urls: this.data.imgSrcs
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let imgSrcs = []
        if (Math.random() < 0.5) {
            imgSrcs = [app.globalData.gCardBaseUrl + "qrcode1.jpg", app.globalData.gCardBaseUrl + "qrcode2.jpg"]
        } else {
            imgSrcs = [app.globalData.gCardBaseUrl + "qrcode2.jpg", app.globalData.gCardBaseUrl + "qrcode1.jpg"]
        }
        this.setData({
            imgSrcs
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})