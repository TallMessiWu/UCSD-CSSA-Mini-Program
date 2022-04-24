// miniprogram/pages/class-chat/class-chat.js

import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"

let classesId = "8f9ff639611a410d00aaa7ba5e2491d6"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        title: "UCSD CSSA",
        scrollTop: undefined,
        classes: [],
        sidebarData: [],
        allClasses: [],
        validClasses: [],
        flag: true,
        input: "",
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
    },

    // set classes and sidebarData and allClasses
    async setClasses() {
        let classes_collection = wx.cloud.database().collection("class_chat")
        let classes = (await (await classes_collection.doc(classesId).get())).data
        this.setData({
            title: classes.title,
            ["list[1].text"]: classes.title,
            classes: classes.classes,
            sidebarData: this.getSidebarData(classes.classes),
            _allClasses: this.getAllClasses(classes.classes)
        })
    },

    // process classes data and transform it into a list of Capital Letters
    getSidebarData(classes) {
        let sidebarData = []
        for (let idx in classes) {
            sidebarData.push(classes[idx].firstLetter)
        }
        return sidebarData
    },

    // put all classes into a list
    getAllClasses(classes) {
        let allClasses = []
        for (let idx in classes) {
            allClasses = allClasses.concat(classes[idx].classesByLetter)
        }
        return allClasses
    },

    // 页面监听函数
    onPageScroll(res) {
        this.setData({
            scrollTop: res.scrollTop,
        })
    },

    onSearch(event) {
        let allClasses = this.data._allClasses
        let input = event.detail.value
        this.setData({
            input,
            flag: input === "",
        })
        input = input.replace(" ", "").toUpperCase()
        let validClasses = []
        for (let idx in allClasses) {
            if (allClasses[idx].replace(" ", "").indexOf(input) === -1) {
                continue
            } else {
                validClasses.push(allClasses[idx])
            }
        }
        this.setData({
            validClasses
        })
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
        this.setClasses()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

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