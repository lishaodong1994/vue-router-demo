var Mock = require('mockjs')
const USERS = Mock.mock({
  "users|20": [
    {
      "id": '@guid',
      "username": "@cname",
    }
  ]
})
const API = ()=>({users:USERS,msg:{msg:1111} })
module.exports=API