<template>
  <div>
    <!-- 添加key标识后由于数据回来后的key和之前不同使用组件被重新创建导致swiper会重新初始化，此时数据已经有了 -->
    <film-swiper :loop="true" v-if="datalist.length">
      <film-swiper-item v-for="item in datalist" :key="item.bannerId" >
          <img class="banner_img" :src="item.imgUrl" :alt="item.name" />
      </film-swiper-item>
    </film-swiper>
    <film-header></film-header>

    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import axios from "axios"; //npm i axios
import filmSwiper from "@/components/films/FilmSwiper";
import filmSwiperItem from "@/components/films/FilmSwiperItem";
import filmHeader from "@/components/films/FilmHeader";
export default {
  components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader,
  },
  data() {
    return {
      datalist: [],
    };
  },
  mounted() {
    //数据还没有回来 swiper的mounted周期里的初始化就走完了。等数据回来时初始化已经完了（swiper初始化过早问题）
    axios
      .get("https://m.maizuo.com/gateway?type=2&cityId="+this.$store.state.cityId+"&k=784004", {
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"16332850131319517032546305","bc":"310100"}',
          "X-Host": "mall.cfg.common-banner",
        },
      })
      .then((res) => {
        this.datalist = res.data.data;
      });
  },
};
</script>
<style lang="scss" scoped>
.banner_img {
  width: 100%;
}
section {
  padding-bottom: 0.49rem;
}
</style>