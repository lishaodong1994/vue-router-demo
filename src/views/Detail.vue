<template>
  <!-- Error in render: "TypeError: Cannot read property 'name' of null" 
        初始值给null，异步请求的数据还没有回来之前会被解释为null.name 所以报错
        加上v-if="dataildata" 异步请求的数据还没有回来会不做渲染就解决了这个问题。
        这也有效的处理了该页面轮播组件初始化过早的问题-->
  <div v-if="dataildata" class="datail">
    <van-icon name="arrow-left" size="23" class="backicon" @click="handleClick" />
    <detail-header v-myscroll="50"> {{ dataildata.name }}</detail-header>
    <!--动态绑定背景图片  -->
    <div class="poster" :style="{ backgroundImage: `url(${dataildata.poster})` }"></div>
    <div class="content">
      <div class="title">
        <p>
          {{ dataildata.name }}<span>{{ dataildata.filmType.name }}</span>
        </p>
        <p>
          <i>{{ dataildata.grade }}</i>
        </p>
      </div>
      <p>{{ dataildata.category.split("|").join(" | ") }}</p>
      <p>{{ dataildata.premiereAt | timeFifter }} 上映</p>
      <p>{{ dataildata.nation }} | {{ dataildata.runtime }}分钟</p>
      <p
        :class="isshow ? 'message' : 'message2'"
        class="animate"
        :style="{ marginTop: '.14rem' }"
      >
        {{ dataildata.synopsis }}
      </p>
      <div class="icon">
        <van-icon
          @click="isshow = !isshow"
          :name="isshow ? 'arrow-down' : 'arrow-up'"
        />
      </div>
    </div>
    <div class="actorsSwiper">
      <p>演职人员</p>
      <detail-swiper :slidesPerView="3.9" swiperName="actor">
        <detail-swiper-item
          v-for="(item, index) in dataildata.actors"
          :key="index"
        >
          <div
            :style="{ backgroundImage: `url(${item.avatarAddress})` }"
            class="actionsImg"
          ></div>
          <div class="actorName">{{ item.name }}</div>
          <div class="actorRole" :style="{ 'max-height': '40px' }">
            {{ item.role }}
          </div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
    <!-- 当一个页面中需要存在两个swiper组件，必然会进行2次new Swiper(".swiper-container", {...});
    由于两个都已.swiper-container作为创建节点，所以第二次时发现之前有一个了，就重新又对他定义了一遍，配置成了后者的定义！
    多个轮播组件导致多次初始化的解决方式就是：new Swiper(".swiper-container", {...}) 的类名需要不同！这样就不是在一个
    swiper对象上进行操作了-->
    <div class="actorsSwiper">
      <p>剧照</p>
      <detail-swiper :slidesPerView="2.3" swiperName="photo">
        <detail-swiper-item
          v-for="(item, index) in dataildata.photos"
          :key="index"
        >
          <div
            :style="{ backgroundImage: `url(${item})`, height: '1rem' }"
            class="actionsImg"
            @click="showPic(dataildata.photos,index)"
          ></div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
    <div class="buy">选座购票</div>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
moment.locale("zh-cn"); //时间设置成中文
// import axios from "axios";
import http from "@/util/http";
import detailSwiper from "@/components/detail/DetailSwiper";
import detailSwiperItem from "@/components/detail/DetailSwiperItem";
import detailHeader from "@/components/detail/DetailHeader";
import { ImagePreview } from 'vant';
import mixin_showTabBar from '@/util/mixin_showTabBar'

//import { Toast } from 'vant';

Vue.directive("myscroll", {
  inserted(el, binding) {
    el.style.opacity = 0;
    el.style.visibility = "hidden";
    //el.style.display='none' //css3的transition对display和height:auto的变化是没有效果的！
    // 所以使用opacity+visibility 到达效果： visibility可以被transition检测，但没有渐渐消失的效果。
    //opacity渐渐消失，消失了但按钮仍可以点击触发。visibility彻底不可见（无法点击触发了）
    window.onscroll = () => {
      if (document.documentElement.scrollTop > binding.value) {
        el.style.opacity = 1;
        el.style.visibility = "visible";
        // el.style.display='block'
      } else {
        el.style.opacity = 0;
        el.style.visibility = "hidden";
        // el.style.display='none'
      }
    };
  },
  unbind() {
    window.onscroll = null;
  },
});
Vue.filter("timeFifter", (prv) => {
  // 下载moment第三方模块来处理时间。
  return moment(prv * 1000).format("YYYY-MM-DD");
});
export default {
  mixins:[mixin_showTabBar],
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader,
  },
  data() {
    return {
      isshow: true,
      dataildata: null, //请求回来不一定是数组的，对象时初始值应该给null
    };
  },
  methods:{
    handleClick() {
        this.$router.back();
      },
    showPic(picArr,index){
        ImagePreview({
          images:picArr,
          startPosition:index,
          closeable: true,
          closeIconPosition:'top-left'
        });
    }
  },
  created() {
    // console.log(window.location.href);
    // console.log(this);  //该组件实例
    //console.log(this.$route);  //记录该组件链接路由信息的对象
    // console.log(this.$router);  //总路由表导出的路由实例对象
    // console.log(this.$route.params.myid);
  },
  mounted() {
    // vant组件库的加载轻提示，但我们考虑到每个页面只要需要请求数据都应该存在这个‘加载中...’的提示，而不应该只有这个页面存在。
    //加载的时间越长 loading框的显示时间久应该越长，相对加载越快loading显示时间就应该越短。这就和ajax请求数据的时间息息相关。
    // 所以我们就把axios请求的封装,http这个对象进一步增加内容：【axios拦截器】
    // Toast.loading({ 
    //   message: "加载中...",
    //   forbidClick: true,
    //   duration:0 //设定为不消失,我们自己手动让他消失。
    // });

    //------------------
    // 带着id去请求数据，k是为了改变下连接，防止ajax缓存。保证每次都能取到新数据回来。
    // 我们发现我们多次使用axios发送请求，代码有很多重复。于是我们考虑对axios进行封装。
    // axios({
    //     url:`https://m.maizuo.com/gateway?filmId=${this.$route.params.myid}&k=486919`,
    //     headers:{
    //         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16332850131319517032546305","bc":"310100"}',
    //         'X-Host': 'mall.film-ticket.film.info'
    //     }
    // }).then(res=>{this.dataildata = res.data.data.film})
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=486919`,
      headers: { "X-Host": "mall.film-ticket.film.info" },
    }).then((res) => {
      console.log(res);
      this.dataildata = res.data.data.film;
    });
    // 顶部栏的显示和隐藏可以再mounted里监听滚动事件判断是否隐藏显示。记得在destroyed时销毁挂载的事件。
    // 但是vue中不建议这种丑陋的写法；可以把这个功能封装在自定义指令里。
    // window.onscroll=()=>{
    //   if(document.documentElement.scrollTop>50){
    //     console.log('显示');
    //   }else{
    //     console.log('隐藏');
    //   }
    // }
  },
  // destroyed(){
  //   window.onscroll=null
  // }
};
</script>
<style lang="scss" scoped>
.datail {
  background-color: #ededed;
  padding-bottom: 0.59rem;
}
.poster {
  width: 100%;
  height: 2.1rem;
  background-position: center center;
  // background-size：100% 100%;---按容器比例撑满，图片变形；
  //background-size：cover;---把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉。
  background-size: cover;
}
.content {
  background-color: #fff;
  padding: 0.12rem 0.15rem 0.15rem;
  margin-bottom: 0.1rem;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 0.18rem;
    font-weight: normal;
    span {
      display: inline-block;
      width: 0.2rem;
      height: 0.14rem;
      background-color: #d2d6dc;
      color: #fff;
      border-radius: 0.02rem;
      font-size: 0.12rem;
      text-align: center;
      line-height: 0.14rem;
      margin-left: 0.05rem;
      vertical-align: middle;
    }
  }
  > p {
    margin-top: 0.04rem;
  }
  .message {
    min-height: 0.34rem;
    max-height: 0.34rem;
    overflow: hidden;
  }
  .message2 {
    //注意！css3的过度不支持到某个数值到 height:auto的过度！
    //max-height 是一个实际内容不会达到的高度，那就相当于是 auto 了。
    max-height: 300px;
  }
  .animate {
    transition: max-height 0.5s ease;
    -webkit-transition: max-height 0.5s ease;
  }
}
.icon {
  text-align: center;
}
.actorsSwiper {
  background-color: #fff;
  color: #191a1b;
  font-size: 0.16rem;
  padding: 0.15rem 0 0.15rem 0.15rem;
}
.actorsSwiper p {
  padding-bottom: 0.15rem;
}
.actionsImg {
  width: 100%;
  height: 0.85rem;
  background-size: cover;
  background-position: center;
}
.actorName {
  height: 0.18rem;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.12rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 0.1rem;
  color: #191a1b;
}
.actorRole {
  height: 0.18rem;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.12rem;
  color: #797d82;
}
.backicon {
  position: fixed;
  top: .22rem;
  left: 1.5%;
  z-index: 200;
  width: .3rem;
  height: .3rem;
  line-height: .3rem;
  text-align: center;
  background-color: rgb(255,255,255,.5);
  color: #191a1b;
  border-radius: 50%;
  transform: translateY(-50%);
}
.buy{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: .49rem;
  line-height: .49rem;
  text-align: center;
  font-size: .16rem;
  background-color: #ff5f16;
  color:#fff;
  cursor: pointer;
}
</style>