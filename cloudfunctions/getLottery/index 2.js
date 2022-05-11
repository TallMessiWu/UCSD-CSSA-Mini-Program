// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const TcbRouter = require("tcb-router")

const db = cloud.database()
const lotteryCollection = db.collection("lottery")


// 云函数入口函数
exports.main = async (event, context) => {

    const app = new TcbRouter({
        event
    })

    app.router("list", async (ctx, next) => {
        ctx.body = await lotteryCollection.skip(event.start).limit(event.count).orderBy("deadline", "desc").get().then((res) => {
            return res.data
        })
    })

    app.router("detail", async (ctx, next) => {
        ctx.body = await lotteryCollection.where({
            _id: eventId
        }).get().then((res) => {
            return res.data
        })
    })



    return app.serve()
}