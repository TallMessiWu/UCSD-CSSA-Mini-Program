const app = getApp()
const openid = app.globalData.openid
const db = wx.cloud.database()
let classesId = "8f9ff639611a410d00aaa7ba5e2491d6"
const userCollection = db.collection("user")
const cardCollection = db.collection("card_info")
const cardId = "cd045e756142fe8d0e6e827f32aeb3cb"
let input = ""
Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: [{
            pagePath: "/pages/class-chat/class-chat",
            text: "UCSD CSSA",
            iconPath: "/images/icons/群黑.png",
            selectedIconPath: "/images/icons/群红.png"
        }, {
            pagePath: "/pages/cssa-card/cssa-card",
            text: "CSSA卡",
            iconPath: "/images/icons/卡黑.png",
            selectedIconPath: "/images/icons/卡红.png"
        }],
        scrollTop: undefined,
        loggedin: false,
        purchased: false,
        cardNumber: "xxxx xxxx xxxx xxxx",
    },

    async setTabBar() {
        let classes_collection = wx.cloud.database().collection("class_chat")
        let classes = (await (await classes_collection.doc(classesId).get())).data
        this.setData({
            ["list[0].text"]: classes.title,
        })
    },

    onLogin() {
        wx.getUserProfile({
            desc: '用于获取CSSA卡持有状态',
            success: async (res) => {
                wx.showLoading()
                this.setData({
                    loggedin: true
                })
                const userInfo = res.userInfo
                let info = await userCollection.where({
                    _openid: openid
                }).get()
                // 用户第一次授权登录
                if (info.data.length == 0) {
                    await userCollection.add({
                        data: {
                            nickName: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl,
                            purchased: false,
                            cardNumber: ""
                        }
                    })
                } else {
                    info = info.data[0]
                    // 用户已经购买
                    if (info.purchased) {
                        this.setData({
                            purchased: true,
                            cardNumber: this.formatCardNumber(info.cardNumber)
                        })
                    }
                }
                wx.hideLoading()
            },
            fail: (err) => {
                wx.hideLoading()
                wx.showToast({
                    title: "获取CSSA卡需要授权登录哦",
                    icon: "none"
                })
            }
        })
    },

    formatCardNumber(num) {
        let numStr = num.toString()
        return `${numStr.substr(0,4)} ${numStr.substr(4,4)} ${numStr.substr(8,4)} ${numStr.substr(12, 4)}`
    },

    onInput(event) {
        input = event.detail.value
    },

    async onConfirm() {
        wx.showLoading()
        let card_info = (await cardCollection.doc(cardId).get()).data
        let code = card_info.code
        let count = card_info.count
        const validInput = code.indexOf(input)
        // 输入的邀请码不正确
        if (validInput == -1) {
            wx.hideLoading()
            wx.showToast({
                title: "输入的邀请码不正确哦",
                icon: "none"
            })
            return
        } else {
            // 这个状况其实不应该出现 出现的原因是所有的邀请码已经用完了 需要再向数据库中添加
            if (code.length == 0) {
                wx.hideLoading()
                wx.showToast({
                    title: "邀请码库存已空，快去联系客服人员更新",
                    icon: "none"
                })
                return
            }
            // 邀请码只能用一次 因此要删除邀请码
            code.splice(validInput, 1)
            // count加1
            count += 1
            // card集合更新
            cardCollection.doc(cardId).update({
                data: {
                    count: count,
                    code: code
                }
            })
            const cardNumber = this.generateCardNumber(count)
            // user集合更新
            userCollection.where({
                _openid: openid
            }).update({
                data: {
                    cardNumber,
                    purchased: true
                }
            })
            wx.hideLoading()
            // 更新页面显示
            this.setData({
                purchased: true,
                cardNumber: this.formatCardNumber(cardNumber)
            })
        }
    },

    onHow(){
        wx.navigateTo({
          url: '/pages/how-to-get-card/how-to-get-card'
        })
    },

    /**
     * 卡号的前八位是随机数字，后八位是补零后的第几张卡的数字
     * 例如：第一张购买的人的卡的卡号为：8个随机数字 + 00000001
     * 
     * @param {*} count 当前数据库记录的CSSA卡数量
     */
    generateCardNumber(count) {
        if (0 > count || count > 99999999) {
            throw "Illegal Arugment"
        }
        const firstEight = Math.ceil(Math.random() * 100000000).toString()
        const numZeros = 8 - count.toString().length
        const lastEight = `${"0".repeat(numZeros)}${count}`
        return firstEight + lastEight
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

    },

    // 页面监听函数
    onPageScroll(res) {
        this.setData({
            scrollTop: res.scrollTop,
        })
    }

})