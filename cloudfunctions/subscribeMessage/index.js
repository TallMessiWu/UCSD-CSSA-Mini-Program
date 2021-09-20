// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const wxContext = cloud.getWXContext()
        cloud.openapi.subscribeMessage.send({
            touser: wxContext.OPENID,
            templateId: "7qV7hnOBhRQbxp2NvPPXWAjaLzucqyu0uK03jOSiFkc",
            page: `/pages/cssa-card/cssa-card`,
            data: {
                // 卡券名称
                thing1: {
                    value: `卡号${event.cardNumber}`
                },
                // 温馨提示
                thing7: {
                    value: "本卡仅限购买者本人使用，不可转赠他人"
                },
                // 适用门店
                thing3: {
                    value: "支持实体CSSA卡的门店全部支持电子卡"
                },
                // 使用说明
                thing5: {
                    value: "付款时由向商家在小程序内展示电子卡即可"
                }
            },
            miniprogramState: "formal"
        })
    } catch (err) {
        console.log(err)
    }
}