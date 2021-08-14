// miniprogram/pages/class-chat/class-chat.js

import {
    classes,
    sidebarData,
    allClasses
} from "../../data/data.js"

import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        scrollTop: undefined,
        classes: [],
        sidebarData: [],
        validClasses: [],
        flag: true,
        input: ""
    },

    // 页面监听函数
    onPageScroll(res) {
        this.setData({
            scrollTop: res.scrollTop,
        })
    },

    onSearch(event) {
        let input = event.detail.value
        this.setData({
            input,
            flag: input === "",
        })
        input = input.replace(" ", "").toUpperCase()
        let validClasses = []
        for (let idx in allClasses) {
            if (allClasses[idx].indexOf(input) === -1) {
                continue
            } else {
                validClasses.push(allClasses[idx])
            }
        }
        this.setData({validClasses})
    },

    onSearchCancel(event) {
        this.setData({
            input: "",
            flag: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            classes,
            sidebarData
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
        wx.getImageInfo({
            src: "cloud://ucsdcssa-5gxqhwwc12d1b1bf.7563-ucsdcssa-5gxqhwwc12d1b1bf-1305742996/图片/课友群/小助手.jpg",
            success: (res) => {
                wx.stopPullDownRefresh()
            }
        })
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