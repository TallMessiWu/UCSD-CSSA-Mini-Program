// components/article-preview/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        content: String,
        picUrl: String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event){
            this.triggerEvent(
                "hello",
                {
                data: event.currentTarget.dataset.name
            })
            console.log("lol")
        }
    }
})
