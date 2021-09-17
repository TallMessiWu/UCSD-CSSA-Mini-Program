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
        imgSuffix: ".jpg"
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async onImageTap(event) {
            let url = event.currentTarget.dataset.url;
            // 后面的random用于保证图片不是之前缓存过的过期二维码
            url = (await wx.cloud.getTempFileURL({fileList:[url]})).fileList[0].tempFileURL + "?v=" + Math.random()
            wx.previewImage({
                urls: [url]
            })
        },

        async onButtonTap(event) {
            let url1 = this.data.url + "小助手1" + this.data.imgSuffix;
            let url2 = this.data.url + "小助手2" + this.data.imgSuffix;
            wx.previewImage({
                urls: [url1, url2]
            })
        },

    }
})