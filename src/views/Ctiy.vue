<template>
  <!-- 使用了vant库IndexBar 索引栏和Toast 轻提示 -->
  <div class="city">
    <div class="cityHeader">
      <van-nav-bar :title="`当前城市 ${$store.state.cityName}` " >
      <template #left>
       <van-icon name="cross" size="0.22rem" color="#aaa" @click="$router.push('/flims')"/>
      </template>
    </van-nav-bar>
    <div class="searchBox">
      <van-search v-model="value" placeholder="请输入搜索关键词" @input="handleInput" @click="show=true"/>
      <span v-if="show" @click="handleBtn">取消</span>
    </div>
  </div>
    
   <ul class="searchResult" v-if="searchResultShow">
      <li v-for="item in searchResult" :key=item.cityId 
      @click="handleClick(item.name, item.cityId)">
      {{item.name}}
      </li>
  </ul>
  <div class="nocity" v-if="!searchResultShow && !listShow">
     <img src="@/assets/nocity.png" alt="nocity">
     <p>没有找到匹配的城市</p>
  </div>

    <div class="GPS" v-show="listShow">
      <p>GPS定位你所在城市</p>
      <div><span>定位失败</span></div>
    </div>
    <div class="hotCity" v-show="listShow">
      <p>热门城市</p>
      <div>
        <span v-for="item in hotCity" :key="item.cityId" @click="handleClick(item.name, item.cityId)">{{item.name}}</span>
      </div>
    </div>
    <van-index-bar :sticky="false" :index-list="typeList" @change="change" v-show="listShow">
      <div v-for="item in list" :key="item.type">
        <van-index-anchor :index="item.type" />
        <van-cell
          v-for="i in item.msg"
          :key="i.cityId"
          :title="i.name"
          @click="handleClick(i.name, i.cityId)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from "@/util/http";
import { Toast } from "vant";
import mixin_showTabBar from "@/util/mixin_showTabBar";
export default {
  mixins: [mixin_showTabBar], //把公用的代码导入然后‘混入’
  data() {
    return {
      show:false,
      listShow:true,
      searchResultShow:false,
      value: '',
      list: [],
      typeList: [],
      allCityData:[],
    };
  },
  computed:{
    searchResult(){
      return this.allCityData.filter(item=>{
        return item.name.indexOf(this.value)!==-1 || item.pinyin.indexOf(this.value)!==-1
      })
    },
    hotCity(){ return this.allCityData.filter(item=>item.isHot) }
  },
  mounted() {
    http({
      url: "/gateway?k=7367327",
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      this.allCityData = res.data.data.cities
      this.list = this.formatData(res.data.data.cities);
      this.typeList = this.formatData(res.data.data.cities).map(
        (item) => item.type
      );
    });
  },
  methods: {
    formatData(data) {
      const arr = [];
      const res = [];
      for (let i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i));
      }
      arr.forEach((item) => {
        const temp = data.filter(
          (i) => i.pinyin.slice(0, 1).toUpperCase() === item
        );
        temp.length && res.push({ type: item, msg: temp });
      });
      return res;
    },
    change(current) {
      Toast({message:current,duration: 500 });
    },
    handleClick(current, id) {
      // 修改城市信息后其他页面也需要进行对应的改变
      //location.href='#/cinemas?cityname='+ item.name 可以利用传统方式带在url里面让另一个页面去获取
      //cookie, localStorage...也可以利用这些跨页面来获取存在里面的城市信息
      // 当然在这种单页面中也可以用 中间人模式父子传参 或 bus事件总线的$on和$emit 。
      // 考虑到实际城市这个‘状态’在多个地方都有用到！最好利用 vuex 进行共享状态进行管理。
      //console.log(current,id);
      // this.$store.state.cityName = current
      // this.$router.back()
      // 使用this.$store.state.xxx的确能够访问和修改vuex公共状态里的值。
      // 但这种操作是不可靠的！这会导致我们无法追踪是哪个组件修改了公共状态里数据，每个组件都会有修改数据的嫌疑...
      // 假设某个组件使用了里面的数据修改或破坏掉了这个数据。对其他用到该数据的组件也造成了影响。我们就无法知道是
      // 哪个组件所造成的。所以vuex给了一套规范的操作流程进数据进行相应的监控。
      this.$store.commit("changeCity", { current, id }); //使用.$store.commit方法去‘通知’vuex去修改状态。
      this.$router.push('/films');
    },
    handleInput(e){
      if(e){
        this.listShow =false
        this.searchResultShow= true
      }else{
        this.searchResultShow= false
      }
    },
    handleBtn(){
      this.show= false
      this.listShow= true
      this.searchResultShow= false
    }
  },
};
</script>
<style lang="scss" scoped>
.cityHeader{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
}
::v-deep .van-index-anchor {
  background: #f4f4f4;
  margin-right: 0.25rem;
}
::v-deep .van-index-bar__index {
  line-height: 0.18rem;
}
.searchBox{
  width: 100%;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  .van-search__content{
    background-color: #fff;
  }
  .van-search{
    flex: 1;
    background-color: #f4f4f4;
  }
  >span{
    padding: 0 .12rem 0 0;
    font-size: .14rem;
  }

}
.searchResult{
  padding: 1rem 0 0 .15rem;
  li{
    line-height: .44rem;
    font-size: .13rem;
    border-bottom: 1px #e4e1e1 solid;
    color:#191a1b
  }

}
.nocity{
  text-align: center;
  padding-top:1.5rem ;
  img{
    width: .9rem;
  }
  p{
    font-size: .14rem;
    color:#797d82
  }
}
.GPS{
  padding-top: 1.15rem;
}
.GPS,.hotCity{
  padding-left: .15rem;
  padding-right: .15rem;
  margin-bottom: .1rem;
  font-size: .14rem;
  color: #191a1b;
  p{
    font-size: .13rem;
    color: #797d82;
    margin-bottom: .1rem;
  }
  span{
    text-align: center;
    display: inline-block;
    //100vw 就是视口宽度  如iphone6是375px
    width: calc(33.33vw - 25px);
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    background-color: #f4f4f4;
    margin:5px ;
  }
}

</style>
//Toast(current)创建的提示框样式是临时创建在节点外面的。改他的样式比较困难。
//无法在用控制类名如：.city .van-toast--html, .city .van-toast--text 去局部的改掉样式。也无法利用scoped结合::v-deep去改
//所以最终改了全局的样式，虽然作用于全局但整体影响不大
<style>
.van-toast--html,
.van-toast--text {
  min-width: 0.15rem;
}
</style>