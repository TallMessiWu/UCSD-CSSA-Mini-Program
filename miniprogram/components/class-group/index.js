// components/class-group/index.js

let app = getApp()

Component({

    externalClasses: ["f-class"],

    /**
     * 组件的属性列表
     */
    properties: {
        classesByLetter: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        url: app.globalData.gChatBaseUrl,
        imgSuffix: ".jpg",
        srcs: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async onImageTap(event) {
            let url = event.currentTarget.dataset.url;
            // 后面的random用于保证图片不是之前缓存过的过期二维码
            // url = (await wx.cloud.getTempFileURL({fileList:[url]})).fileList[0].tempFileURL + "?v=" + Math.random()
            wx.previewImage({
                urls: [url]
            })
        },

        async onButtonTap(event) {
            let url1 = this.data.url + "小助手1" + this.data.imgSuffix;
            let url2 = this.data.url + "小助手2" + this.data.imgSuffix;
            let l = []
            // 给两个小助手平摊工作
            if (Math.random() < 0.5) {
                l = [url1, url2]
            } else {
                l = [url2, url1]
            }
            wx.previewImage({
                urls: l
            })
        },

    },
    lifetimes: {
        async attached() {
            let classesByLetter = this.properties.classesByLetter
            let srcs = {}
            for (let i = 0; i < classesByLetter.length; i++) {
                // 后面的random用于保证图片不是之前缓存过的过期二维码
                srcs[classesByLetter[i]] = (await wx.cloud.getTempFileURL({
                    fileList: [
                        this.data.url + classesByLetter[i] + this.data.imgSuffix
                    ]
                })).fileList[0].tempFileURL + "?v=" + Math.random()
            }
            this.setData({
                srcs
            })
        }
    }
})