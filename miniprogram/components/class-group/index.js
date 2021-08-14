// components/class-group/index.js

let app = getApp()

Component({

    externalClasses: ["f-class"],

    /**
     * 组件的属性列表
     */
    properties: {
        classesByLetter: {}
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
        onImageTap(event) {
            let url = event.currentTarget.dataset.url;
            wx.previewImage({
                urls: [url],
                current: url
            })
        }
    }
})