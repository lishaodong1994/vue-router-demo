// import Mock from 'mockjs'


// //定义get,post请求 （向/users发送请求即向本地服务器发送请求，mock会将请求拦截并返还数据。）
// let { users } = Mock.mock({
//     'users|45': [
//         {
//             "id": '@increment(1)',
//             "username": "@ctitle",
//             "img_url": "@image('40x40','#dd83fa','#fcfcfc','lee')",
//         }
//     ]
// })
// //总数据分页接口
// Mock.mock(/\/users/, 'get', (option) => {
//     const pagenum = getmsg(option.url, 'pagenum') - 0
//     const pagesize = getmsg(option.url, 'pagesize') - 0
//     const start = (pagenum - 1) * pagesize
//     const end = pagenum * pagesize
//     const total = Math.ceil(users.length / pagesize)
//     const newusers = pagenum > total ? [] : users.slice(start, end)
//     return {
//         "data": {
//             "total": users.length,
//             "pagenum": pagenum,
//             "users": newusers
//         },
//         "meta": {
//             "msg": "获取成功",
//             "status": 200
//         }
//     }
// })
// //添加数据的接口
// Mock.mock(/\/users/, 'post', (option) => {
//     let { adduser } = Mock.mock({
//         'adduser':
//         {
//             "id": '@increment(1)',
//             "username": getmsg(option.body, 'username'),
//             "img_url": "@image('40x40','#dd83fa','#fcfcfc','lee')",
//         }
//     })
//     users.unshift(adduser)
//     return {
//         "meta": {
//             "msg": "用户创建成功",
//             "status": 201
//         }
//     }
// })
// //删除数据的接口
// Mock.mock(/\/users/, 'delete', (option) => {
//     const id = getmsg(option.url, 'id');
//     users = users.filter(item => item.id !== id - 0)
// })


// function getmsg(str1, key) {
//     const str = str1.split('?')[1];
//     let arr = str.split('&')
//     let obj = {}
//     for (let i = 0; i < arr.length; i++) {
//         let temp = arr[i].split('=')
//         obj[temp[0]] = temp[1]
//     }
//     return obj[key]
// }