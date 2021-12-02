// 封装axios 
//方式1：(集中管理)
// function Ahttp(id) {
//     return axios({
//         url: `https://m.maizuo.com/gateway?filmId=${id}&k=486919`,
//         headers: {
//             'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16332850131319517032546305","bc":"310100"}',
//             'X-Host': 'mall.film-ticket.film.info'
//         }
//     })
// }
// export default http
// function Bhttp(){...}
// 外部则可以 http(id).then(...)
// 这种封装不实用。

//方式2:利用axios的Api进行封装
import axios from 'axios'
import { Toast } from 'vant';

export const mockHttp =axios.create({})

const http =axios.create({
    //baseURL:'https://m.maizuo.com',  //基准地址
    baseURL:'https://m.maizuo.com/mock',  //基准地址
    timeout:3000,                    //超时断开请求
    // 默认自带请求头信息
    headers:{"X-Client-Info":'{"a":"3000","ch":"1002","v":"5.0.4","e":"16332850131319517032546305","bc":"310100"}'}
})
//axios拦截 发请求之前拦截请求 
http.interceptors.request.use(function(config){
    Toast.loading({ //数据请求就展示加载中提示框，只要使用了这个axios对象去发请求就会触发展示提示框，一劳永逸。
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
    //console.log(config);//config对象包括了这个http axios对象的所有数据信息。
    return {
        ...config,
        //请求前拦截在config里新增信息（如添加新的请求头信息）。。。。
    }
 },function(error){
     return Promise.reject(error)
  })

//请求到之后拦截 
http.interceptors.response.use(function(response){
    Toast.clear() //请求完毕，清除轻提示框

    // 请求到数据后会优先于.then 被这里先拦截。response就是请求到的数据，这里可以先对数据进行一番处理(如追加或修改点数据)。
    //response.data.data.film.myname='lee'
    return{...response, myname:'lee'}
},function(error){
    Toast.clear()
    return Promise.reject(error)
})
export default http