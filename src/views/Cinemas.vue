<template>
  <div>
    <van-nav-bar
      title="影院"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      ref="cinemasHeader"
    >
      <template #left>
        <!--通过this.$store.state.xxx可以获取vuex公共状态里的数据 -->
        <span style="fontsize: 13px"
          >{{ $store.state.cityName }}
          <van-icon name="arrow-down" size="1" color="#000"
        /></span>
      </template>
      <template #right>
        <van-icon name="search" size="24" color="black" />
      </template>
    </van-nav-bar>
    <div class="betterScrollBox" :style="{ height: betterScrollHeight }">
      <!-- 列表有300多条数据为了滚动更加流畅提高体验。有些浏览器自带的滚动体验并不理想
            所以使用了第三方插件 betterScroll; npm install better-scroll -S  安装第三方模块
            better-scroll在使用的时候，滚动只作用于第一个子元素，其它的元素都会被忽略。所以写在ul外面那层
            我们的目的就是不使用浏览器的滚动条和滚动效果。为了不让浏览器出滚动条所以betterScrollBox的高度需要
            严格控制 如：设置固定高度给点溢出隐藏。
            -->
      <ul class="box">
        <!-- <li v-for="item in $store.state.cinemasData" :key="item.cinemaId"> 
          以下是vuex的新写法：利用mapState把公共状态映射过来结合computed:{...mapState(['cinemasData'])}直接用-->
          <li v-for="item in cinemasData" :key="item.cinemaId">
          <div class="content">
            <p class="address1">{{ item.name }}</p>
            <p class="address2">{{ item.address }}</p>
          </div>
          <div class="tip">
            <b class="price"
              >￥<span>{{ item.lowPrice / 100 }}</span
              >起</b
            >
            <span>{{ "距离未知" }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BetterScroll from "better-scroll";
import {mapState}  from 'vuex'
export default {
  data() {
    return {
      betterScrollHeight: "0px",
    };
  },
  mounted() {
    //betterScroll基准盒子的高度不应该是固定的,不然只能适配一个手机类型。这个值应该由计算所得
    //console.log(document.documentElement.clientHeight);//该移动端的高度
    //在vue中可以去访问真实dom节点，但是不建议去修改操作dom节点，又受状态影响又被dom操作控制，这样会造成状态混乱！
    this.tabBarHeight =
      document.getElementsByClassName("navbox")[0].clientHeight; //可以直接去获取底部选项卡的高度（也可在TabBar中取到高度，组件传参获得）
    this.betterScrollHeight =
      document.documentElement.clientHeight -
      this.tabBarHeight -
      this.$refs.cinemasHeader.$el.clientHeight +
      "px";

    //考虑到影院这个列表的数据多个地方都会有请求，且它本身不像电影列表一样实时会变化。所以考虑把这个请求结合vuex来使他请求的
    // 数据在多个地方能共用且无需多次请求直接拿来使用（缓存）。
    // http({
    //   url: "/gateway?cityId="+this.$store.state.cityId+"&ticketFlag=1&k=7739816",
    //   headers: { "X-Host": "mall.film-ticket.cinema.list" },
    // }).then((res) => {
    //   this.list = res.data.data.cinemas;
    //   // list虽然确实被赋值了，但是dom挂载是异步进行的，我们不知道什么时候ul被挂载了数据。
    //   //所以此时立即打印li的个数会为 0 ,可以使用$nextTick()的方案来获取到真正被挂载后的数据。
    //   // new BetterScroll的时机应该是节点被挂载完后ul有具体高度时。
    //   //console.log(document.getElementsByTagName('li').length); //0
    //   this.$nextTick(() => {
    //     new BetterScroll(".betterScrollBox", { scrollbar: {fade: true } });
    //   });
    // });

    //只要影院列表长度不为0就不会再去放请求数据(数据直接从vuex存下来的拿)；直接做BetterScroll处理。
    if (this.$store.state.cinemasData.length === 0) {
      //将请求放在了vuex中操作,dispatch用来触发actions里的函数(之后巧妙的利用axios的返回值是promise的特性来继续操作)
      this.$store.dispatch("getCinemasData").then((_) => {
        this.$nextTick(() => {
          new BetterScroll(".betterScrollBox", { scrollbar: { fade: true } });
        });
      });
    } else {
      this.$nextTick(() => {
        new BetterScroll(".betterScrollBox", { scrollbar: { fade: true } });
      });
    }
  },

  methods: {
    onClickLeft() {
      this.$store.commit("clearCinemasList");
      this.$router.push("/ctiy");
    },
    onClickRight() {
      this.$router.push('/cinemas/search')
    },
  },
  computed:{
    ...mapState(['cinemasData'])
  }
};
</script>
<style lang="scss" scoped>
.betterScrollBox {
  height: 5.88rem; //最终应该由计算所得。
  overflow: hidden;
  position: relative; //加这个相对定位是因为betterScroll滚动条和实际不对应的bug(修正滚动条的位置)
}
li {
  padding: 0.15rem;
  display: flex;
  font-size: 0.12rem;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
  .content {
    width: 2.2rem;
    .address1 {
      width: 100%;
      font-size: 0.15rem;
      height: 0.22rem;
      line-height: 0.22rem;
      margin-bottom: 0.05rem;
      color: #191a1b;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .address2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tip {
    width: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .price {
      height: 0.22rem;
      line-height: 0.22rem;
      margin-bottom: 0.05rem;
      color: #ff5f16;
      font-weight: normal;
      span {
        font-size: 0.15rem;
      }
    }
  }
}
</style>