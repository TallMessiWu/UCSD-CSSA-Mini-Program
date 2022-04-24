// miniprogram/pages/collection/collection.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectionName: "",
        articles: []
    },

    onTap(event) {
        const content = event.currentTarget.dataset.article.content
        wx.navigateTo({
            url: `/pages/article/article?content=${content}&collectionName=${this.data.collectionName}`,
        })
    },

    _loadArticles(collectionName, start) {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.cloud.callFunction({
            name: "getArticles",
            data: {
                collectionName,
                start
            }
        }).then((res) => {
            this.setData({
                articles: this.data.articles.concat(res.result.data)
            })
            wx.stopPullDownRefresh()
            wx.hideLoading()
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            collectionName: options.name
        })
        this._loadArticles(this.data.collectionName, 0)
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
        this.setData({
            articles: []
        })
        this._loadArticles(this.data.collectionName, 0)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this._loadArticles(this.data.collectionName, this.data.articles.length)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})