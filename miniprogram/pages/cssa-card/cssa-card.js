const app = getApp()
const openid = app.globalData.openid
const db = wx.cloud.database()
const classesId = "8f9ff639611a410d00aaa7ba5e2491d6"
const cardDesciptionId = "fa24ce1a618254d803ecbabc034ef293"
const userCollection = db.collection("user")
const cardCollection = db.collection("card_info")
const descCollection = db.collection("card_description")
const cardId = "cd045e756142fe8d0e6e827f32aeb3cb"
let input = ""
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
        scrollTop: undefined,
        loggedin: false,
        purchased: false,
        cardNumber: "xxxx xxxx xxxx xxxx",
        card_description: "",
        signed_merchants: ""
    },

    async setTabBar() {
        let classes_collection = wx.cloud.database().collection("class_chat")
        let classes = (await (await classes_collection.doc(classesId).get())).data
        this.setData({
            ["list[1].text"]: classes.title,
        })
    },

    onLogin() {
        wx.showLoading({
            title: "等待授权中",
            mask: true
        })
        wx.getUserProfile({
            desc: '用于获取CSSA卡持有状态',
            success: async (res) => {
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
                        }
                    })
                } else {
                    info = info.data[0]
                    // 更新用户昵称与头像
                    await userCollection.where({
                        _openid: openid
                    }).update({
                        data: {
                            nickName: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl
                        }
                    })
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
        const tmplId = app.globalData.tmplId
        wx.requestSubscribeMessage({
            tmplIds: [tmplId],
            success: (res) => {
                if (res[tmplId] == "accept") {
                    this.checkCode()
                } else {
                    wx.showToast({
                        title: "订阅激活通知失败，无法完成激活",
                        icon: "none"
                    })
                }
            }
        })
    },

    async checkCode() {
        wx.showLoading({
            title: "验证邀请码中",
            mask: true
        })
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
            // 推送订阅消息
            wx.cloud.callFunction({
                name: "subscribeMessage",
                data: {
                    cardNumber
                }
            })
            wx.hideLoading()
            // 更新页面显示
            this.setData({
                purchased: true,
                cardNumber: this.formatCardNumber(cardNumber)
            })
            wx.showToast({
                title: "激活成功",
                icon: "success",
                duration: 1500
            })
        }
    },

    onHow() {
        wx.navigateTo({
            url: '/pages/how-to-get-card/how-to-get-card'
        })
    },

    onImageTap() {
        wx.previewImage({
            urls: [this.data.signed_merchants]
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
        // 随机生成一个8位数
        const firstEight = Math.floor(Math.random() * (90000000) + 10000000).toString()
        const numZeros = 8 - count.toString().length
        const lastEight = `${"0".repeat(numZeros)}${count}`
        return parseInt(firstEight + lastEight)
    },

    copyCardNumber() {
        console.log(this.data.cardNumber.replace(/\s/g, ""))
        wx.setClipboardData({
            data: `${parseInt(this.data.cardNumber.replace(/\s/g, ""))}`,
            success: () => {
                wx.showToast({
                    title: "卡号已复制到剪切板",
                    icon: "none"
                })
            }
        })
    },

    loadDescription() {
        descCollection.where({
            _id: cardDesciptionId
        }).get().then((res) => {
            const card_description = res.data[0].card_description
            const signed_merchants = res.data[0].signed_merchants
            this.setData({
                card_description,
                signed_merchants
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setTabBar()
        this.loadDescription()
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