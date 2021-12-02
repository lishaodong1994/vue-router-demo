import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
// 使用vuex-persistedState 对数据进行持久化
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
// vuex的应用：
//1.非父子通信，多组件共享数据，
//2.后端数据的缓存快照(几个页面用的都是同一个数据请求内容)，减少重复的数据请求。减少服务器的压力，提高用户体验。
//3.后端某些时候把多个接口的数据的所有数据放在一个接口里面，这时就不应该去多次请求接口。用vuex存下来共用这些数据。

export default new Vuex.Store({
  // 添加插件vuex-persistedstate进行持久化
  plugins: [createPersistedState({
    reducer:(state)=>{ //仅持久化 cityId 和 cityName
      return{
        cityId:state.cityId,
        cityName:state.cityName
      }
    }
  })],

  // state公共状态
  state: {
    cityId: '310100',
    cityName: '上海',
    cinemasData: [],
    tabBarShow:true
  },
  // 其他组价使用this.$store.commit('changeCityName',传参)去调用mutations里的方法。 
  // 突变，同步。 mutations里的方法默认第一个参数就是state对象。第二个参数就是传的形参。
  // 由mutations里的 changeCityName 方法去修改 state 里的公共数据这才是合理的流程。
  // vuex默认是管理在内存，一刷新页面公共状态就丢失了 ———— vuex持久化
  mutations: {//只能支持同步！提交mutation应当作为更改状态的唯一方法！
    changeCity(state, city) {
      state.cityId = city.id
      state.cityName = city.current
    },
    clearCinemasList(state){
      state.cinemasData = []
    },
    setCinemasData(state, msg) {
      state.cinemasData = msg
    },
    tabBarShow_true(state){
      state.tabBarShow = true
    },
    tabBarShow_false(state){
      state.tabBarShow = false      
    }
  },
  actions: {//支持异步和同步。异步逻辑都应该封装到action里面
    getCinemasData(store) {
      // 将数据请求放在了vuex的actions里面
      // 返回值 的目的就是继续操作(.then必然会返回一个promise对象) 如：处理第一次的betterScroll。
     return http({
        url: `/gateway?cityId=${store.state.cityId}&ticketFlag=1&k=7739816`,
        headers: { "X-Host": "mall.film-ticket.cinema.list" },
      }).then((res) => {//最终还是要经过mutations来进行同步操作
        store.commit('setCinemasData', res.data.data.cinemas)
      });
    }
  },
  modules: {
     
  }
})
