// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

LIMIT_SIZE = 15

const articles = cloud.database().collection("articles")

// 云函数入口函数
exports.main = async (event, context) => {
    const result = await articles.where({
        title: cloud.database().RegExp({
            regexp: `.*${event.keyword}.*`,
            options: 'i'
        })
    }).skip(event.start).orderBy("_createTime", "desc").limit(LIMIT_SIZE).get()
    return result
}