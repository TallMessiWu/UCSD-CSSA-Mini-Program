// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const articles = cloud.database().collection("articles")

// 云函数入口函数
exports.main = async (event, context) => {
    const result = await articles.where({
        collection: event.collectionName
    }).skip(event.start).orderBy("_createTime", "desc").limit(15).get().then((res) => {
        return res
    })
    return result
}