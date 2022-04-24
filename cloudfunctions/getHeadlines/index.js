// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const result = await cloud.database().collection("headlines").aggregate().lookup({
      from: "articles",
      localField: "article_id",
      foreignField: "_id",
      as: "articleInfo"
    }).sort({
      rank: 1
    }).end().then((res)=>{
      return res
    })
    return result
}